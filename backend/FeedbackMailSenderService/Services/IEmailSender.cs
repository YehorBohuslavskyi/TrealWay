using System.Net.Mail;

namespace FeedbackMailSenderService.Services
{
    public interface IEmailSender
    {
        public Task SendEmailAsync(MailMessage message, CancellationToken cancellationToken = default);
    }
}
