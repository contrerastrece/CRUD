using System;
using System.Collections.Generic;

namespace api.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public decimal Precio { get; set; }
}
