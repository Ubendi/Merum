using Merum_BE.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Merum_BE.Data.Context
{
    public class MerumDbContext : DbContext
    {

        public MerumDbContext(DbContextOptions<MerumDbContext> options) : base(options) { }
        
#pragma warning disable CS8618
        public DbSet<WineEntity> WineEntities { get; set; }
        public DbSet<LocationEntity> LocationEntities { get; set; }

    }
}
