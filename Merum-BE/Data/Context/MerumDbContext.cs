using Merum_BE.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGeneration.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.General;

namespace Merum_BE.Data.Context
{
    public class MerumDbContext : IdentityDbContext<MerumUser>
    {

        public MerumDbContext(DbContextOptions<MerumDbContext> options) : base(options) { }
        
#pragma warning disable CS8618
        public DbSet<WineEntity> WineEntities { get; set; }
        public DbSet<LocationEntity> LocationEntities { get; set; }
        public DbSet<GrapeVarietyEntity> GrapeVarietyEntities { get; set; }
        public DbSet<EbikeTourEntity> EbikeTourEntities { get; set; }
    }
}
