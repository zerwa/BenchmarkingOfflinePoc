using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using BenchmarkingOfflinePoc.Middleware;
using BenchmarkingOfflinePoc.Services;
using DbUp;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BenchmarkingOfflinePoc
{
    public class Startup
    {
        public IConfiguration config { get; }
        public IHostingEnvironment env { get; }
        public ILogger log;

        public Startup(IConfiguration configuration, IHostingEnvironment env, ILogger<Startup> log)
        {
            config = configuration;
            this.env = env;
            this.log = log;

            RunMigrations();
        }

        private void RunMigrations()
        {
            var upgradeEngine = DeployChanges.To
                .SqlDatabase(config.GetConnectionString("OflinePocConnectionString"))
                .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly(), (string s) => s.StartsWith("BenchmarkingOfflinePoc.Migrations.Script") && (env.IsDevelopment() || !s.Contains("DEVONLY")))
                .WithTransactionPerScript()
                .LogToConsole()
                .Build();

            if (upgradeEngine.IsUpgradeRequired())
            {
                log.LogInformation("Database Update required.");

                var result = upgradeEngine.PerformUpgrade();

                if (!result.Successful)
                {
                    log.LogError(result.Error, "Failed to run migrations due to an error executing the sql scripts.");
                    throw result.Error;
                }
                log.LogInformation("Completed database upgrade.  The following scripts were executed:");

                foreach (var script in result.Scripts)
                {
                    log.LogInformation(script.Name);
                }
            }
            else
            {
                log.LogInformation("No database update is required.");
            }
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                );


            services.AddDbContext<OfflinePocDb>();
            services.AddScoped<CaseService>();
            services.AddScoped<SurveyTemplateService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseExceptionHandler("/Error");
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            //This middleware turns certain uncaught exceptions into status codes/error responses for the api
            app.UseExceptionStatusCodes();

            //anything which might generate an API Exception should be down here

            //do not attempt to use hot reloading on staging or production
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
                HotModuleReplacement = true,
                EnvParam = new { NODE_ENV = "development" }
            });

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");

                //If no server route matched, assume that this is a route handled by the client side router in the react app
                //Note: urls that look like static resources will not be handled by this, such as urls that end in file extensions
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
