using BenchmarkingOfflinePoc.Models.API.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace BenchmarkingOfflinePoc.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private ILogger log;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> log)
        {
            this.next = next;
            this.log = log;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (ApiException e)
            {
                log.LogWarning(e, $"Handled API exception: {e.Message}");
                context.Response.ContentType = "application/json";

                if (e is NotFoundException)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                }
                else if (e is BadRequestException)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                }
                else if (e is UnauthorizedException)
                {
                    //Note: 401 Unauthorized actually means "Not Authenticated", so we want 403 "Forbidden" instead
                    context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                }
                else
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                }

                ApiExceptionResponse errObj = new ApiExceptionResponse()
                {
                    Type = "ApiException",
                    Message = e.Message
                };

                await context.Response.WriteAsync(JsonConvert.SerializeObject(errObj, new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                }));
            }
            catch (Exception)
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                throw;
            }
        }
    }

    public static class ExceptionStatusCodeExtensions
    {
        /// <summary>
        /// Causes specific uncaught exceptions to generate status codes and api error responses instead of the normal error handling
        /// </summary>
        public static IApplicationBuilder UseExceptionStatusCodes(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
