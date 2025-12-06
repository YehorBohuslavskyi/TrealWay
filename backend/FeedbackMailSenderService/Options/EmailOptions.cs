namespace FeedbackMailSenderService.Options
{
    public class EmailOptions
    {
        public SmtpOptions Smtp { get; set; } = null!;
        public string SenderEmail { get; set; } = null!;
        public string RecipientEmail { get; set; } = null!;
        public int Timeout { get; set; }
    }

    public class SmtpOptions
    {
        public string Host { get; set; } = null!;
        public int Port { get; set; } 
        public bool EnableSsl { get; set; }
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
