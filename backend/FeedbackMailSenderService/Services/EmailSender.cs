using FeedbackMailSenderService.Options;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace FeedbackMailSenderService.Services
{
    public class EmailSender : IEmailSender, IDisposable
    {
        private readonly ILogger _logger = null!;

        private readonly int _timeout;
        private readonly SmtpClient _smtpClient = null!;

        public EmailSender(ILogger<IEmailSender> logger, IConfiguration configuration, IOptions<EmailOptions> options) 
        { 
            _logger = logger;

            var emailOptions = options.Value;
            _timeout = emailOptions.Timeout;

            var credentials = new NetworkCredential(emailOptions.Smtp.Login, emailOptions.Smtp.Password);

            try
            {
                _smtpClient = new SmtpClient(emailOptions.Smtp.Host, emailOptions.Smtp.Port)
                {
                    Credentials = credentials,
                    EnableSsl = emailOptions.Smtp.EnableSsl
                };
            }
            catch
            {
                _logger.LogCritical("Unable to configure SMTP client");
                throw;
            }
        }

        public void Dispose()
        {
            _smtpClient.Dispose();
        }

        public async Task SendEmailAsync(MailMessage message, CancellationToken cancellationToken = default)
        {
            var emailTask = _smtpClient.SendMailAsync(message, cancellationToken);
            var waitOrCancelTask = Task.Delay(_timeout, cancellationToken);
            var firstCompleted = await Task.WhenAny(emailTask, waitOrCancelTask);
            await firstCompleted;            
        }
    }
}
