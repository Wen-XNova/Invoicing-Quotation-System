using BusinessApp.Data;
using BusinessApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessApp.Services
{
    public interface IDocumentService
    {
        Task<Invoice?> GetInvoiceAsync(int? id = null, string? clientName = null);
        Task<IEnumerable<object>> GetAllInvoicesAsync();
        Task<Invoice> SaveInvoiceAsync(Invoice invoice);
        Task<bool> DeleteInvoiceAsync(int id);

        Task<Quotation?> GetQuotationAsync(int? id = null, string? clientName = null);
        Task<IEnumerable<object>> GetAllQuotationsAsync();
        Task<Quotation> SaveQuotationAsync(Quotation quotation);
        Task<bool> DeleteQuotationAsync(int id);
    }

    public class DocumentService : IDocumentService
    {
        private readonly AppDbContext _context;

        public DocumentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Invoice?> GetInvoiceAsync(int? id = null, string? clientName = null)
        {
            if (id.HasValue) return await _context.Invoices.FindAsync(id.Value);

            var query = _context.Invoices.AsQueryable();
            if (!string.IsNullOrEmpty(clientName))
                query = query.Where(i => i.ClientName.ToLower() == clientName.ToLower());

            return await query.OrderByDescending(i => i.DocumentId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<object>> GetAllInvoicesAsync() =>
            await _context.Invoices.Select(i => new { i.DocumentId, i.ClientName }).OrderByDescending(i => i.DocumentId).ToListAsync();

        public async Task<Invoice> SaveInvoiceAsync(Invoice invoice)
        {
            if (invoice.DocumentId > 0) _context.Invoices.Update(invoice);
            else _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            return invoice;
        }

        public async Task<bool> DeleteInvoiceAsync(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null) return false;
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Quotation?> GetQuotationAsync(int? id = null, string? clientName = null)
        {
            if (id.HasValue) return await _context.Quotations.FindAsync(id.Value);
            var query = _context.Quotations.AsQueryable();
            if (!string.IsNullOrEmpty(clientName)) query = query.Where(q => q.ClientName.ToLower() == clientName.ToLower());
            return await query.OrderByDescending(q => q.DocumentId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<object>> GetAllQuotationsAsync() =>
            await _context.Quotations.Select(q => new { q.DocumentId, q.ClientName }).OrderByDescending(q => q.DocumentId).ToListAsync();

        public async Task<Quotation> SaveQuotationAsync(Quotation quotation)
        {
            if (quotation.DocumentId > 0) _context.Quotations.Update(quotation);
            else _context.Quotations.Add(quotation);
            await _context.SaveChangesAsync();
            return quotation;
        }

        public async Task<bool> DeleteQuotationAsync(int id)
        {
            var quotation = await _context.Quotations.FindAsync(id);
            if (quotation == null) return false;
            _context.Quotations.Remove(quotation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}