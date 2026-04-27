using Microsoft.AspNetCore.Mvc;
using BusinessApp.Models;
using BusinessApp.Services;
using BusinessApp.DTOs;
using BusinessApp.Security;
using FluentValidation;

namespace BusinessApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _service;
        private readonly IValidator<InvoiceDto> _invoiceValidator;
        private readonly IValidator<QuotationDto> _quotationValidator;

        public DocumentController(IDocumentService service, IValidator<InvoiceDto> invoiceValidator, IValidator<QuotationDto> quotationValidator)
        {
            _service = service;
            _invoiceValidator = invoiceValidator;
            _quotationValidator = quotationValidator;
        }

        [HttpGet("invoice")]
        public async Task<IActionResult> GetInvoice()
        {
            var invoice = await _service.GetInvoiceAsync();
            return Ok(invoice ?? new Invoice { ClientName = "", PayTerms = "" });
        }

        [HttpGet("invoice/all")]
        public async Task<IActionResult> GetAllInvoices() => Ok(await _service.GetAllInvoicesAsync());

        [HttpGet("invoice/{id:int}")]
        public async Task<IActionResult> GetInvoiceById(int id)
        {
            var invoice = await _service.GetInvoiceAsync(id: id);
            return invoice == null ? NotFound() : Ok(invoice);
        }

        [ApiKey] 
        [HttpPost("invoice")]
        public async Task<IActionResult> SaveInvoice([FromBody] InvoiceDto dto)
        {
            var validationResult = await _invoiceValidator.ValidateAsync(dto);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var invoice = new Invoice
            {
                DocumentId = dto.DocumentId,
                ClientName = dto.ClientName,
                IssueDate = dto.IssueDate,
                Notes = dto.Notes ?? "",
                VAT = dto.VAT,
                PayTerms = dto.PayTerms ?? "",
                Total = dto.Total
            };

            return Ok(await _service.SaveInvoiceAsync(invoice));
        }

        [ApiKey] 
        [HttpDelete("invoice/{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            return await _service.DeleteInvoiceAsync(id) ? NoContent() : NotFound();
        }

        [HttpGet("quotation")]
        public async Task<IActionResult> GetQuotation()
        {
            var quotation = await _service.GetQuotationAsync();
            return Ok(quotation ?? new Quotation { ClientName = "", Discount = "", Disclaimer = "" });
        }

        [HttpGet("quotation/all")]
        public async Task<IActionResult> GetAllQuotations() => Ok(await _service.GetAllQuotationsAsync());

        [HttpGet("quotation/{id:int}")]
        public async Task<IActionResult> GetQuotationById(int id)
        {
            var quotation = await _service.GetQuotationAsync(id: id);
            return quotation == null ? NotFound() : Ok(quotation);
        }

        [ApiKey] 
        [HttpPost("quotation")]
        public async Task<IActionResult> SaveQuotation([FromBody] QuotationDto dto)
        {
            var validationResult = await _quotationValidator.ValidateAsync(dto);
            if (!validationResult.IsValid) return BadRequest(validationResult.Errors);

            var quotation = new Quotation
            {
                DocumentId = dto.DocumentId,
                ClientName = dto.ClientName,
                ExpiryDate = dto.ExpiryDate,
                Discount = dto.Discount ?? "",
                Disclaimer = dto.Disclaimer ?? "",
                Notes = dto.Notes
            };

            return Ok(await _service.SaveQuotationAsync(quotation));
        }

        [ApiKey] 
        [HttpDelete("quotation/{id}")]
        public async Task<IActionResult> DeleteQuotation(int id)
        {
            return await _service.DeleteQuotationAsync(id) ? NoContent() : NotFound();
        }
    }
}