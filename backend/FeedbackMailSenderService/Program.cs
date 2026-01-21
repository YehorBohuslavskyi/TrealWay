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

                if (clientRequest.BudgetMin.HasValue && clientRequest.BudgetMax.HasValue)
                {
                    if (clientRequest.BudgetMin > clientRequest.BudgetMax)
                    {
                        return Results.ValidationProblem(
                            new Dictionary<string, string[]>
                            {
                                { "BudgetMin", new[] { "Budget minimum cannot be greater than maximum" } }
                            },
                            statusCode: StatusCodes.Status422UnprocessableEntity);
                    }
                }

                var emailOptions = options.Value;

                string senderEmail = emailOptions.SenderEmail;
                string recipientEmail = emailOptions.RecipientEmail;

                var messageBodyBuilder = new System.Text.StringBuilder();
                messageBodyBuilder.AppendLine($"Name: {clientRequest.Name}");
                messageBodyBuilder.AppendLine($"Email: {clientRequest.Email}");
                messageBodyBuilder.AppendLine();

                if (clientRequest.ContactReasons != null && clientRequest.ContactReasons.Any())
                {
                    messageBodyBuilder.AppendLine("Contact Reasons:");
                    foreach (var reason in clientRequest.ContactReasons)
                    {
                        messageBodyBuilder.AppendLine($"  • {reason}");
                    }
                    messageBodyBuilder.AppendLine();
                }

                if (clientRequest.BudgetMin.HasValue && clientRequest.BudgetMax.HasValue)
                {
                    messageBodyBuilder.AppendLine($"Budget Range: ${clientRequest.BudgetMin:N0} - ${clientRequest.BudgetMax:N0}");
                    messageBodyBuilder.AppendLine();
                }

                if (!string.IsNullOrWhiteSpace(clientRequest.Question))
                {
                    messageBodyBuilder.AppendLine("Question:");
                    messageBodyBuilder.AppendLine(clientRequest.Question);
                }

                string messageBody = messageBodyBuilder.ToString();

                MailMessage message = new MailMessage(
                    from: senderEmail,
                    to: recipientEmail,
                    subject: $"New Client Request from {clientRequest.Name}",
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

                logger.LogInformation("Successfully sent email from {Email}", clientRequest.Email);
                return Results.Ok(new { message = "Your request has been sent successfully" });
            })
            .WithSummary("Submit client contact form")
            .WithTags("General")
            .WithDescription("Accepts client contact information including name, email, contact reasons, budget range, and question")
            .Accepts(typeof(ClientRequest), "application/json")
            .Produces(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status422UnprocessableEntity)
            .ProducesProblem(StatusCodes.Status500InternalServerError);

            app.Run();
        }
    }
}