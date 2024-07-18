using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductDbContext _dbContext;

        public ProductController(ProductDbContext context)
        {
            _dbContext = context;
        }

        // OBTENER LISTA DE PRODUCTOS
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            try
            {
                List<Product> lista = await _dbContext.Products.OrderByDescending(p => p.Id).ToListAsync();
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error al obtener la lista de productos: {ex.Message}" });
            }
        }

        // GUARDAR PRODUCTO
        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Product request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _dbContext.Products.AddAsync(request);
                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Producto guardado exitosamente", product = request });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error al guardar el producto: {ex.Message}" });
            }
        }

        // ACTUALIZAR PRODUCTO
        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] Product request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _dbContext.Products.Update(request);
                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Producto actualizado exitosamente", product = request });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error al actualizar el producto: {ex.Message}" });
            }
        }

        // ELIMINAR PRODUCTO
        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            try
            {
                Product product = await _dbContext.Products.FindAsync(id);
                if (product == null)
                {
                    return NotFound(new { message = "Producto no encontrado" });
                }

                _dbContext.Products.Remove(product);
                await _dbContext.SaveChangesAsync();
                return Ok(new { message = "Producto eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Error al eliminar el producto: {ex.Message}" });
            }
        }
    }
}
