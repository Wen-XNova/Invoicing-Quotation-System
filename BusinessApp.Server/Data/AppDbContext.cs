using Microsoft.EntityFrameworkCore;
using BusinessApp.Models;

namespace BusinessApp.Data 
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Quotation> Quotations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>().ToTable("Invoices");
            modelBuilder.Entity<Quotation>().ToTable("Quotations");

            modelBuilder.Entity<Invoice>()
                .Property(i => i.Total)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Invoice>()
                .Property(i => i.VAT)
                .HasColumnType("decimal(18,2)");
        }
    }
}