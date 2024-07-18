using api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
//hacemos referencia a nustro ProductDBContext
//builder.Services.AddDbContext<ProductDbContext>();
builder.Services.AddDbContext<ProductDbContext>(options =>
{
    string connectionString = builder.Configuration.GetConnectionString("conection");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
}
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();

app.MapControllers();

app.Run();
