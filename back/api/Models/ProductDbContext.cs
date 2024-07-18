using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace api.Models;

public partial class ProductDbContext : DbContext
{
    public ProductDbContext()
    {
    }

    public ProductDbContext(DbContextOptions<ProductDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Product> Products { get; set; }

 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin1_swedish_ci")
            .HasCharSet("latin1");

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product");

            entity.Property(e => e.Id)
                .HasColumnType("int(10) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasPrecision(10, 2)
                .HasColumnName("precio");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
