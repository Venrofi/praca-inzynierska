using Microsoft.EntityFrameworkCore;
using Backend.Data.Context;
using Backend.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("HipHopHub");
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString).EnableSensitiveDataLogging());
  //  options.UseInMemoryDatabase("UserList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IEmailService, EmailService>();
/*builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalAngularApp",
            builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});*/

var app = builder.Build();
//builder.Services.AddSwaggerGen();
// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "REST");
        c.RoutePrefix = string.Empty;
    });
//}

//app.UseCors("LocalAngularApp");

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
}
);

//app.MapControllers();

app.Run();
