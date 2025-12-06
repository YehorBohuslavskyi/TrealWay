namespace FeedbackMailSenderService.Misc
{
    public static class RegexPatterns
    {
        public const string Name = "^[\\p{L}'\\-\\s]+$";

        public const string OtherText = "^[\\p{L}\\p{N}\\p{P}\\p{Zs}]+$";
    }
}
