using System.ComponentModel.DataAnnotations;

namespace FeedbackMailSenderService.Models
{
    public class ClientRequest
    {
        [Required(ErrorMessage = "Name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        public List<string>? ContactReasons { get; set; }

        [Range(1000, 50000, ErrorMessage = "Budget minimum must be between 1000 and 50000")]
        public int? BudgetMin { get; set; }

        [Range(1000, 50000, ErrorMessage = "Budget maximum must be between 1000 and 50000")]
        public int? BudgetMax { get; set; }

        [StringLength(2000, ErrorMessage = "Question cannot exceed 2000 characters")]
        public string? Question { get; set; }
    }
}