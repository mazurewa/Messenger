using AutoMapper;
using Messenger.Domain;
using Messenger.Domain.Services;
using Messenger.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace Messenger
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MessengerContext>(o => o.UseSqlServer(connectionString));

            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IPrivateMessageService, PrivateMessageService>();
            services.AddSingleton<IUserManager>(new UserManager(new List<LoggedUser>()));

            services.AddAutoMapper();
            services.AddSignalR();
            services.AddMvc();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());

            app.UseSignalR(builder => builder.MapHub<MessageHub>("/hub/chat"));
            app.UseSignalR(builder => builder.MapHub<PrivateMessageHub>("/hub/privateChat"));

            app.UseMvc();
        }
    }
}
