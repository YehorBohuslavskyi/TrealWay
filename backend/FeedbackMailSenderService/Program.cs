using FeedbackMailSenderService.Models;
using FeedbackMailSenderService.Options;
using FeedbackMailSenderService.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MiniValidation;
using System.Net.Mail;

namespace FeedbackMailSenderService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(corsOptions => corsOptions.AddPolicy("AllowAll", corsOptionsBuilder =>
            {
                corsOptionsBuilder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin();
            }));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddOptions<EmailOptions>().Bind(builder.Configuration.GetSection("Email")).ValidateOnStart();
            builder.Services.AddSingleton<IValidateOptions<EmailOptions>, EmailOptionsValidator>();

            builder.Services.AddScoped<IEmailSender, EmailSender>();

            var app = builder.Build();
            
            app.UseCors("AllowAll");

            if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (app.Environment.IsProduction())
            {
                app.UseExceptionHandler(exceptionHandlerApp =>
                {
                    exceptionHandlerApp.Run(async (context) =>
                    {
                        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                        await context.Response.WriteAsJsonAsync(new ProblemDetails
                        {
                            Title = "Internal Server Error",
                            Status = context.Response.StatusCode,
                            Detail = "Unexpected server error occured. Please, try again later"
                        });
                    });
                });
            }

            app.MapPost("/client", async
                (HttpContext context,
                CancellationToken cancellationToken, 
                [FromServices] IOptions<EmailOptions> options,
                [FromServices] IEmailSender sender,
                [FromServices] ILogger<Program> logger) =>
            {
                ClientRequest clientRequest = null!;
                try
                {
                    clientRequest = await context.Request.ReadFromJsonAsync<ClientRequest>() ?? throw new Exception("Client request is null");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, $"Deserialization failed");
                    return Results.Problem(new ProblemDetails()
                    {
                        Title = "Bad Request",
                        Status = StatusCodes.Status400BadRequest,
                        Detail = "Failed to deserialize provided json"
                    });
                }

                if (!MiniValidator.TryValidate<ClientRequest>(clientRequest, out var errors))
                    return Results.ValidationProblem(errors, statusCode: StatusCodes.Status422UnprocessableEntity);

                var emailOptions = options.Value;

                string senderEmail = emailOptions.SenderEmail;
                string recipientEmail = emailOptions.RecipientEmail;

                string messageBody = $"""
                    Name: {clientRequest.Name}
                    Email: {clientRequest.Email}
                    {(clientRequest.QuestionText is not null ? $"Question: {clientRequest.QuestionText}" : "")}
                """;

                MailMessage message = null!;
                message = new MailMessage(
                    from: senderEmail,
                    to: recipientEmail,
                    subject: $"Question from {clientRequest.Name}, {clientRequest.Email}",
                    body: messageBody);

                try
                {
                    await sender.SendEmailAsync(message, cancellationToken);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Failed to send the message");
                    return Results.Problem(new ProblemDetails
                    {
                        Title = "Failed to send",
                        Status = StatusCodes.Status500InternalServerError,
                        Detail = "Data was accepted, but an error occured while sending a feedback"
                    });
                }

                logger.LogInformation("Successfully sent");
                return Results.Ok();
            })
            .WithSummary("Info about customer")
            .WithTags("General")
            .WithDescription("Info about customer that will be sent by service using mail")
            .Accepts(typeof(ClientRequest), "application/json")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status422UnprocessableEntity)
            .ProducesProblem(StatusCodes.Status500InternalServerError);

            app.Run();
        }
    }
}
