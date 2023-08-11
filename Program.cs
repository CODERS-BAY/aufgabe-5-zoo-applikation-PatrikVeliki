using ZooAPI.Controller;

namespace ZooAPI;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using ZooAPI.Model;
using ZooAPI.Service;
using System.IO;
using Microsoft.OpenApi.Models;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Dienste konfigurieren
        ConfigureServices(builder);

        // Anwendung erstellen
        var app = builder.Build();

        // Anwendung konfigurieren
        Configure(app);

        app.Run();
    }

    private static void ConfigureServices(WebApplicationBuilder builder)
    {
        // Dienste für API-Erkundung und Swagger hinzufügen
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(option =>
        {
            option.SwaggerDoc("v1", new OpenApiInfo { Title = "Zoo API", Version = "v1" });
        });

        // Datenbankverbindung
        string connectionString = builder.Configuration.GetConnectionString("ZooDb") ?? string.Empty;

        // Dienste registrieren
        builder.Services.AddScoped(_ => new DBConnection(connectionString, builder.Configuration));
        builder.Services.AddScoped<ZoobesucherService>();
        builder.Services.AddScoped<KassiererService>();
        builder.Services.AddScoped<TierpflegerService>();

        // Controller registrieren
        builder.Services.AddScoped<ZoobesucherController>();
        builder.Services.AddScoped<KassiererController>();
        builder.Services.AddScoped<TierpflegerController>();
    }

    private static void Configure(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var kassiererService = scope.ServiceProvider.GetRequiredService<KassiererService>();
        var zoobesucherService = scope.ServiceProvider.GetRequiredService<ZoobesucherService>();
        var tierpflegerService = scope.ServiceProvider.GetRequiredService<TierpflegerService>();

        // Swagger einrichten
        app.UseSwagger();
        app.UseSwaggerUI(option =>
        {
            option.SwaggerEndpoint("/swagger/v1/swagger.json", "zoo");
            option.RoutePrefix = string.Empty;
        });

        // Routen definieren
        app.MapPost("/api/buy", async (HttpRequest request) =>
        {
            using var reader = new StreamReader(request.Body);
            var body = await reader.ReadToEndAsync();

            var totalPrice = await kassiererService.GetAllSoldTicketsAsync();
            return totalPrice;
        });

        app.MapGet("/api/kassierer/tickets/date/{date}", async (DateTime date) =>
        {
            var tickets = await kassiererService.GetTicketsByDate(date);
            return tickets;
        });

        app.MapGet("/api/zoobesucher/tiere/{gattung}", async (string animal) =>
        {
            var animals = await zoobesucherService.GetTierByGattung(animal);
            return animals;
        });

        app.MapGet("/api/tierpfleger/{pflegerId}/tiere", async (string id) =>
        {
            var animals = await tierpflegerService.GetTiereByPflegerIdAsync(int.Parse(id));
            return animals;
        });

        app.MapPut("/api/tierpfleger/updateAnimal/{id}", async (int id, Tier column) =>
        {
            await tierpflegerService.UpdateTierAsync(id, column);
            return Results.Ok();
        });
    }
}
