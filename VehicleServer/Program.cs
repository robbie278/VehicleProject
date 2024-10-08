using Microsoft.EntityFrameworkCore;
using VehicleServer;
using VehicleServer.Entities;
using VehicleServer.Profiles;
using VehicleServer.Repository;
using VehicleServer.Services;
using VehicleServer.Services.ReportServices;
using VehicleServer.Services.StockTransactionDetailServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
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
builder.Services.AddScoped<IStockItemsDetailService, StockItemsDetailService>();
builder.Services.AddScoped<IStockReportService, StockReportService>();
builder.Services.AddScoped<IStockItemsDetailRepository, StockItemsDetailRepo>();
builder.Services.AddScoped<reportRepo>();
//builder.Services.AddScoped<>


builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
             builder =>
               builder.WithOrigins( $"http://localhost:4200")
             .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("CorsPolicy");
app.UseDefaultFiles();
app.UseStaticFiles();
//app.UseHangfireDashboard();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
