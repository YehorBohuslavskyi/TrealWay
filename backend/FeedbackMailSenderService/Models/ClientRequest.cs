using FeedbackMailSenderService.Misc;
using System.ComponentModel.DataAnnotations;

namespace FeedbackMailSenderService.Models
{
    public record ClientRequest
    {
        [Required]
        [MinLength(2, ErrorMessage = "Name must contain at least 2 characters")]
        [MaxLength(128, ErrorMessage = "Name must contain at most 128 characters")]
        [RegularExpression(RegexPatterns.Name, ErrorMessage = "Name must contain only letters, hieroglyphs, apostrophes, hyphens and whitespaces")]
        public string Name { get; init; } = null!;

        [Required]
        [MinLength(6, ErrorMessage = "Email must contain at least 6 characters")]
        [MaxLength(256, ErrorMessage = "Email must contain at most 256 characters")]
        [EmailAddress(ErrorMessage = "Email is invalid")]
        public string Email { get; init; } = null!;

        [MinLength(1, ErrorMessage = "Description must be null or contain at least 1 character")]
        [MaxLength(512, ErrorMessage = "Description must contain at most 512 characters")]
        [RegularExpression(RegexPatterns.OtherText, ErrorMessage = "Description contains forbidden characters")]
        public string? QuestionText { get; init; }
    }
}
