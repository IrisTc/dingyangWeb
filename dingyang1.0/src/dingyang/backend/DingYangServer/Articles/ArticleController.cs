using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using IOFile = System.IO.File;

namespace DingYangServer.Articles
{
  [ApiController]
  [Route("[controller]")]
  public class ArticleController : ControllerBase
  {
    protected DingYangDbContext dbContext;
    protected FileUploadConfig settings;
    public ArticleController(DingYangDbContext dbContext, IOptions<FileUploadConfig> settings)
    {
      this.dbContext = dbContext;
      this.settings = settings.Value;
    }
    [HttpGet("all")]
    public IEnumerable<Article> GetAll()
    {
      return dbContext.Articles;
    }
    [HttpGet("{category}/all")]
    public IEnumerable<Article> GetAllByCategory(string category)
    {
      return from article in dbContext.Articles
             where article.Category == category
             select article;
    }
    [HttpGet("{category}/peeks")]
    public IEnumerable<ArticlePeek> GetPeeks(string category)
    {
      return GetAllByCategory(category).Select(it => it.Peek()).Take(4);
    }
    [HttpPost]
    public async Task<Article> Post(Article article) {
      var a = dbContext.Articles.FirstOrDefault(a => a.ID == article.ID);
      if (a != null) {
        a.Category = article.Category;
        a.Title = article.Title;
        a.Description = article.Description;
        a.Content = article.Content;
        a.Date = DateTime.Now;
        dbContext.Articles.Update(a);
      } else {
        await dbContext.Articles.AddAsync(article);
      }
      await dbContext.SaveChangesAsync();
      return article;
    }
    [HttpGet("delete/{id}")]
    public async Task<int> Delete(int id)
    {
      dbContext.Articles.RemoveRange(from a in dbContext.Articles where a.ID == id select a);
      return await dbContext.SaveChangesAsync();
    }
    [HttpPost("cover")]
    public async Task<string> UploadCover(IFormFile coverFile) {
      var filename = Path.ChangeExtension(Path.GetFileNameWithoutExtension(Path.GetRandomFileName()), Path.GetExtension(coverFile.FileName));
      using var stream = IOFile.OpenWrite(Path.Combine(settings.StaticAssetsPath, "covers", filename));
      await coverFile.CopyToAsync(stream);
      return filename;
    }
  }
}