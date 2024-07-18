using System.ComponentModel.DataAnnotations;

namespace api.Model
{
    internal class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "El precio debe ser mayor a 0")]
        public decimal Precio { get; set; }

    }
}
