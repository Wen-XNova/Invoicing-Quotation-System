using FluentValidation;

namespace BusinessApp.DTOs
{
    public class InvoiceDto
    {
        public int DocumentId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public DateTime? IssueDate { get; set; }
        public string? Notes { get; set; }
        public decimal VAT { get; set; }
        public string PayTerms { get; set; } = string.Empty;
        public decimal Total { get; set; }
    }

    public class QuotationDto
    {
        public int DocumentId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public DateTime? ExpiryDate { get; set; }
        public string? Discount { get; set; }
        public string? Disclaimer { get; set; }
        public string? Notes { get; set; }
    }

    public class InvoiceDtoValidator : AbstractValidator<InvoiceDto>
    {
        public InvoiceDtoValidator()
        {
            RuleFor(x => x.ClientName).NotEmpty().WithMessage("Client Name is required.");
            RuleFor(x => x.PayTerms).MaximumLength(500);
            RuleFor(x => x.Total).GreaterThanOrEqualTo(0).WithMessage("Total cannot be negative.");
        }
    }

    public class QuotationDtoValidator : AbstractValidator<QuotationDto>
    {
        public QuotationDtoValidator()
        {
            RuleFor(x => x.ClientName).NotEmpty().WithMessage("Client Name is required.");
        }
    }
}