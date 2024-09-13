using Microsoft.EntityFrameworkCore;
using OnlineStoreApi.Data;
using OnlineStoreApi.Models; 
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using OnlineStoreApi.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuración de Serilog
builder.Host.UseSerilog((context, services, configuration) => 
    configuration.ReadFrom.Configuration(context.Configuration)
                 .Enrich.FromLogContext()
                 .WriteTo.Console());

// Configuración de la cadena de conexión con variables de entorno
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    .Replace("{DB_USER}", dbUser)
    .Replace("{DB_PASSWORD}", dbPassword);

// Registrar StoreDbContext como un servicio
builder.Services.AddDbContext<StoreDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IRepository<Product>, Repository<Product>>(); // Mueve esta línea antes de 'app = builder.Build()'

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Un ejemplo simple de endpoint para devolver un pronóstico del clima
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

// Definición del record para el pronóstico del clima
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
