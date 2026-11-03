[CmdletBinding()]
param(
	[string]$Configuration = "Release",
	[string]$ImageName = "merum-be:local",
	[string]$ContainerName = "merum-be-local",
	[int]$HostPort = 8080,
	[string]$ContainerPort = "80",
	[string]$ConnectionString = "",
	[switch]$SkipDockerBuild,
	[switch]$KeepExistingContainer
)

$ErrorActionPreference = "Stop"
$repositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot ".." )).Path
$solutionPath = Join-Path $repositoryRoot "Merum-BE.sln"
$dockerfilePath = Join-Path $repositoryRoot "Dockerfile"

function Invoke-CheckedCommand {
	param(
		[Parameter(Mandatory)]
		[string]$Command,
		[Parameter(Mandatory)]
		[string[]]$Arguments
	)

	Write-Host "> $Command $($Arguments -join ' ')" -ForegroundColor Cyan
	& $Command @Arguments
	if ($LASTEXITCODE -ne 0) {
		throw "Command failed with exit code $LASTEXITCODE`: $Command"
	}
}

Push-Location $repositoryRoot
try {
	if (-not (Get-Command dotnet -ErrorAction SilentlyContinue)) {
		throw "The .NET SDK is required but was not found on PATH."
	}

	if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
		throw "Docker CLI is required but was not found on PATH. Start Docker Desktop and try again."
	}

	if (-not (Test-Path $solutionPath)) {
		throw "Solution file was not found: $solutionPath"
	}

	if (-not (Test-Path $dockerfilePath)) {
		throw "Dockerfile was not found: $dockerfilePath"
	}

	Write-Host "Restoring solution..." -ForegroundColor Green
	Invoke-CheckedCommand dotnet @("restore", $solutionPath)

	Write-Host "Building solution ($Configuration)..." -ForegroundColor Green
	Invoke-CheckedCommand dotnet @("build", $solutionPath, "--configuration", $Configuration, "--no-restore")

	Write-Host "Running tests..." -ForegroundColor Green
	Invoke-CheckedCommand dotnet @("test", $solutionPath, "--configuration", $Configuration, "--no-build", "--no-restore")

	if (-not $SkipDockerBuild) {
		Write-Host "Building Docker image $ImageName..." -ForegroundColor Green
		Invoke-CheckedCommand docker @("build", "--file", $dockerfilePath, "--tag", $ImageName, $repositoryRoot)
	}

	if (-not $KeepExistingContainer) {
		Write-Host "Removing existing container $ContainerName, if present..." -ForegroundColor Green
		& docker rm --force $ContainerName 2>$null
		if ($LASTEXITCODE -notin @(0, 1)) {
			throw "Failed to remove existing Docker container $ContainerName."
		}
	}

	$dockerRunArguments = @(
		"run", "--detach",
		"--name", $ContainerName,
		"--publish", "${HostPort}:${ContainerPort}",
		"--env", "ASPNETCORE_URLS=http://+:${ContainerPort}"
	)

	if ($ConnectionString) {
		$dockerRunArguments += @("--env", "ConnectionStrings__DefaultConnection=$ConnectionString")
	}

	$dockerRunArguments += $ImageName

	Write-Host "Starting Docker container $ContainerName..." -ForegroundColor Green
	Invoke-CheckedCommand docker $dockerRunArguments

	Write-Host "Pipeline completed successfully." -ForegroundColor Green
	Write-Host "Application URL: http://localhost:$HostPort" -ForegroundColor Green
	Write-Host "Container logs: docker logs -f $ContainerName" -ForegroundColor Yellow
}
finally {
	Pop-Location
}
