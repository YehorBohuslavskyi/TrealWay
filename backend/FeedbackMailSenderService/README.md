# Setting environment

1. Check Dockerfile and appsettings.json
2. When deploying is needed to set envs from `"Email"` section (i.e. `-e Email__Smtp__Login=sender@gmail.com`)
3. Also check the `ASPNETCORE_ENVIRONMENT`. If is set to `Development`, Swagger is enabled. In other situations use `Staging` or `Production` consequently.