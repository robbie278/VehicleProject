using Microsoft.EntityFrameworkCore;
using VehicleServer;
using VehicleServer.Entities;
using VehicleServer.Profiles;
using VehicleServer.Repository;
using VehicleServer.Services;
using VehicleServer.Services.StockTransactionDetailServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped<ItemRepo>();
builder.Services.AddScoped<CategoryRepo>();
builder.Services.AddScoped<StockRepo>();
builder.Services.AddScoped<TransactionRepo>();
builder.Services.AddScoped<StoreRepo>();
builder.Services.AddScoped<StoreKeeperRepo>();
builder.Services.AddScoped<UserRepo>();
builder.Services.AddScoped<StockService>();
builder.Services.AddScoped<IStockTransactionDetailService, StockTransactionDetailService>();


builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
        )
);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
