# Feedback service

This service is responsible for processing feedback requests that are sent from feedback form on a web page.

## Tech specs
- .NET 8
- ASP.NET Core
- Uses OpenAPI 3.0

## How to start

```bash
# Configure environment variables 
mv .env.example .env #Or manually in Dockerfile or in docker interface using -e 

# Start an application using docker (`docker build`)
docker build . -t feedback-service
docker run -d -p <PORT>:8080 --env-file .env feedback-service
```

## Links
- Swagger (only when `ASPNETCORE_ENVIRONMENT` is `Development` or `Staging`)- http://<DOMAIN>:<PORT>/swagger
