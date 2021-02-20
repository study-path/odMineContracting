using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using odMineContracting.Api.Repositories;
using odMineContracting.Api.Repositories.Context;
using odMineContracting.Api.Services;
using FluentValidation.AspNetCore;

namespace odMineContracting.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<odMineContractingContext>(options =>
                options
                    .UseSqlServer(Configuration["ConnectionStrings:odMineContractingDatabase"]));

            services.AddCors(o => o.AddPolicy(
                "AllowAnyOrigin",
                builder =>
                {
                    builder
                        .AllowAnyOrigin() 
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                }));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "od Mine Contracting API", Version = "v1" });
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "odMineContracting.Api.xml"));
            });

            services
                .AddControllers()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());

            services.AddAutoMapper(typeof(Startup));

            services
                .AddScoped<ICityService, CityService>()
                .AddScoped<ICityRepository, CityRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, odMineContractingContext dbContext)
        {
            dbContext.Database.Migrate();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("AllowAnyOrigin");

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(
                c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "od Mine Contracting API");
                });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
