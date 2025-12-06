using FeedbackMailSenderService.Options;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace FeedbackMailSenderService.Services
{
    public class EmailOptionsValidator : IValidateOptions<EmailOptions> 
    {
        public ValidateOptionsResult Validate(string? name, EmailOptions options)
        {
            if (string.IsNullOrWhiteSpace(options.SenderEmail))
                return ValidateOptionsResult.Fail("Sender email is empty");
            try
            {
                new MailAddress(options.SenderEmail);
            }
            catch
            {
                return ValidateOptionsResult.Fail("Sender email is invalid");
            }

            if (string.IsNullOrWhiteSpace(options.RecipientEmail))
                return ValidateOptionsResult.Fail("Recipient email is empty");
            try
            {
                new MailAddress(options.RecipientEmail);
            }
            catch
            {
                return ValidateOptionsResult.Fail("Recipient email is invalid");
            }

            if (options.Timeout < 0)
                return ValidateOptionsResult.Fail("Timeout is invalid");

            var smtpOptions = options.Smtp;

            if (string.IsNullOrWhiteSpace(smtpOptions.Host))
                return ValidateOptionsResult.Fail("Smtp:Host is empty");

            if (smtpOptions.Port <= 0 || smtpOptions.Port > 65535)
                return ValidateOptionsResult.Fail("Smtp:Port is invalid");

            if (string.IsNullOrWhiteSpace(smtpOptions.Login))
                return ValidateOptionsResult.Fail("Smtp:Login is empty");

            if (string.IsNullOrWhiteSpace(smtpOptions.Password))
                return ValidateOptionsResult.Fail("Smtp:Password is empty");

            return ValidateOptionsResult.Success;
        }
    }
}
