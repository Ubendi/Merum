using AutoMapper;
using Merum_BE.BL;
using Merum_BE.Data.Models;
using Merum_BE.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging.Abstractions;

namespace Merum_BE.Tests;

public sealed class BasicBehaviorTests
{
    [Fact]
    public void MappingProfile_IsValid()
    {
        var configuration = new MapperConfiguration(options => options.AddProfile<Merum_BE.Data.MappingProfile>(), NullLoggerFactory.Instance);

        Assert.NotNull(configuration.CreateMapper());
    }

    [Fact]
    public void MappingProfile_MapsLocationEntityToLocationDto()
    {
        var mapper = CreateMapper();
        var entity = new LocationEntity
        {
            Id = 7,
            Title = "North vineyard",
            Name = "North",
            City = "Eger"
        };

        var result = mapper.Map<BaseLocationDTO>(entity);

        Assert.Equal(entity.Id, result.Id);
        Assert.Equal(entity.Title, result.Title);
        Assert.Equal(entity.Name, result.Name);
        Assert.Equal(entity.City, result.City);
    }

    [Fact]
    public void MappingProfile_MapsWineEntityAndNestedLocation()
    {
        var mapper = CreateMapper();
        var entity = new WineEntity
        {
            Id = 12,
            Name = "Furmint",
            Year = 2024,
            LocationEntity = new LocationEntity
            {
                Id = 3,
                Title = "Tokaj",
                Name = "Tokaj"
            },
            GrapeVarietyEntity = new GrapeVarietyEntity
            {
                Id = 4,
                Name = "Furmint"
            }
        };

        var result = mapper.Map<WineDTO>(entity);

        Assert.Equal(entity.Id, result.Id);
        Assert.Equal(entity.Name, result.Name);
        Assert.NotNull(result.Location);
        Assert.Equal(entity.LocationEntity.Title, result.Location.Title);
        Assert.Equal(entity.LocationEntity.Name, result.Location.Name);
    }

    [Fact]
    public async Task FileService_RejectsEmptyFile()
    {
        var service = new FileService();
        await Assert.ThrowsAsync<ArgumentException>(() => service.UploadFileAsync(null!, "test", "empty"));
    }

    [Fact]
    public async Task FileService_UploadsAndNormalizesDesiredName()
    {
        var service = new FileService();
        var folder = "TestArtifacts";
        var subFolder = $"BasicBehaviorTests-{Guid.NewGuid():N}";
        var expectedDirectory = Path.Combine(Directory.GetCurrentDirectory(), folder, subFolder);
        var formFile = new FormFile(new MemoryStream("test content"u8.ToArray()), 0, 12, "file", "ignored.txt");

        try
        {
            var relativePath = await service.UploadFileAsync(formFile, folder, subFolder, " Árvíz Teszt ");
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), relativePath.Replace('/', Path.DirectorySeparatorChar));

            Assert.Contains("arviz-teszt", relativePath);
            Assert.EndsWith(".txt", relativePath);
            Assert.True(File.Exists(fullPath));
            Assert.Equal("test content", await File.ReadAllTextAsync(fullPath));
        }
        finally
        {
            if (Directory.Exists(expectedDirectory))
            {
                Directory.Delete(expectedDirectory, recursive: true);
            }
        }
    }

    private static IMapper CreateMapper()
    {
        var configuration = new MapperConfiguration(options => options.AddProfile<Merum_BE.Data.MappingProfile>(), NullLoggerFactory.Instance);
        return configuration.CreateMapper();
    }
}
