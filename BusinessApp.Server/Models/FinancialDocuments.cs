using System.ComponentModel.DataAnnotations;

namespace BusinessApp.Models
{
    public abstract class FinancialDocument
    {
        [Key]
        public int DocumentId { get; set; }
        public required string ClientName { get; set; }
        public DateTime? IssueDate { get; set; } = DateTime.UtcNow;

        [MaxLength(1000)]
        public string? Notes { get; set; }
    }

    public class Invoice : FinancialDocument
    {
        public decimal VAT { get; set; }
        public required string PayTerms { get; set; }
        public decimal Total { get; set; }
    }

    public class Quotation : FinancialDocument
    {
        public DateTime? ExpiryDate { get; set; } = DateTime.UtcNow.AddDays(30);
        public required string Discount { get; set; }
        public required string Disclaimer { get; set; }
    }
}