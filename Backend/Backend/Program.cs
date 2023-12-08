using Microsoft.EntityFrameworkCore;
using Backend.Data.Context;
using Backend.Services;
using AspNetCoreRateLimit;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
builder.Services.AddCors(options =>
{
    options.AddPolicy("EnableAngularApp",
            builder => builder.WithOrigins("http://localhost:4200", "https://hip-hop-hub.netlify.app")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options => {
    options.EnableEndpointRateLimiting = true;
    options.StackBlockedRequests = false;
    options.HttpStatusCode = 429;
    options.RealIpHeader = "X-Real-IP";
    options.ClientIdHeader = "X-ClientId";
    options.GeneralRules = new List<RateLimitRule>
        {
            new RateLimitRule
            {
                Endpoint = "*",
                Period = "3s",
                Limit = 2,
                QuotaExceededResponse = new QuotaExceededResponse() {
                    Content = $"Przekroczono limit 2 zapytañ w czasie 3 sekund.",
                    //ContentType = "application/json",
                    StatusCode = 429
                }
            }
        };
});

/// JWT TOKEN CONFIGURATION - KEY & ISSUER TO BE SET IN APPSETTINGS.JSON


 builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        // JWT Key configuration
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Issuer").Get<string>())),
        
        // JWT Issuer configuration
        ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Get<string>(),
        
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
 


builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddInMemoryRateLimiting();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "REST");
   c.RoutePrefix = string.Empty;
});

app.UseCors("EnableAngularApp");

app.UseHttpsRedirection();

app.UseRouting();

app.UseIpRateLimiting();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
}
);

//app.MapControllers();

app.Run();
