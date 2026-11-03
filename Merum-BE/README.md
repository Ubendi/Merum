# Merum-BE

## Local build, test, and Docker pipeline

Prerequisites:

- .NET 9 SDK
- Docker Desktop with the Docker daemon running
- A SQL Server instance reachable by the application container

Run the complete local pipeline from the repository root in PowerShell:

```powershell
.\scripts\Invoke-LocalPipeline.ps1
```

The pipeline:

1. Restores `Merum-BE.sln`.
2. Builds the solution in `Release` configuration.
3. Runs all tests in the solution.
4. Builds the Docker image as `merum-be:local`.
5. Removes and recreates the `merum-be-local` container, mapped to `http://localhost:8080`.

View the running application at `http://localhost:8080` or its Swagger UI at `http://localhost:8080/swagger`.

The default application configuration expects SQL Server at the Docker host name `db`. For a different database connection, pass the connection string as an environment variable override:

```powershell
.\scripts\Invoke-LocalPipeline.ps1 `
	-ConnectionString 'Server=host.docker.internal;Database=MerumDB;User Id=sa;Password=<password>;Encrypt=False;TrustServerCertificate=True'
```

Useful options:

```powershell
# Use another host port and image/container names
.\scripts\Invoke-LocalPipeline.ps1 `
	-HostPort 8090 `
	-ImageName 'merum-be:dev' `
	-ContainerName 'merum-be-dev'

# Keep the existing container and skip rebuilding the image
.\scripts\Invoke-LocalPipeline.ps1 -SkipDockerBuild -KeepExistingContainer

# Stop and remove the local container manually
Docker rm --force merum-be-local
```

The script stops at the first failed restore, build, test, or Docker command. The Dockerfile targets only `Merum-BE.csproj`; the test project is executed by the solution-level test step and is not included in the production image.
