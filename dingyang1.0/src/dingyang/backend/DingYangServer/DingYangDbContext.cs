using DingYangServer.Articles;
using DingYangServer.Videos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DingYangServer
{
  public class DingYangDbContext : DbContext
  {
    public DbSet<Article> Articles { get; set; }
    public DbSet<Video> Videos { get; set; }
    public DingYangDbContext(DbContextOptions<DingYangDbContext> options) : base(options)
    {
    }
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
      options.UseMySql("server=localhost;database=dingyang;user=root;");
    }
  }
}