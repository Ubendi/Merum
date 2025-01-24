using Merum_BE.BL;
using Merum_BE.Data;
using Merum_BE.Data.Context;
using Microsoft.AspNetCore.Authentication.Certificate;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

var builder = WebApplication.CreateBuilder(args);

//var certPath = Path.Combine(AppContext.BaseDirectory, "Certificates");
//var cert = new X509Certificate2("A:/Programming/Merum/Merum-BE/Certificates/localCert.cer");

// Add services to the container.
builder.Services.AddDbContext<MerumDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.WebHost.ConfigureKestrel(options =>
//{
//    options.ListenAnyIP(5001, listenOptions =>
//    {
//        listenOptions.UseHttps(cert);
//    });
//});

builder.Services.AddControllers();

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<UnitOfWork> ();
builder.Services.AddScoped<WinesService> ();
builder.Services.AddScoped<LocationsService>();
builder.Services.AddAuthentication(CertificateAuthenticationDefaults.AuthenticationScheme)
    .AddCertificate();

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder => builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

// Add Swagger services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowAllOrigins");
app.UseSwagger();
app.UseSwaggerUI();
app.UseAuthorization();
app.MapControllers();

app.Run();
