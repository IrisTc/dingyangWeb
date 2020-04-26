using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using IOFile = System.IO.File;

namespace DingYangServer.Videos
{
  [ApiController]
  [Route("[controller]")]
  public class VideoController : ControllerBase
  {
    protected DingYangDbContext dbContext;
    protected FileUploadConfig settings;
    public VideoController(DingYangDbContext dbContext, IOptions<FileUploadConfig> settings)
    {
      this.dbContext = dbContext;
      this.settings = settings.Value;
    }
    [HttpGet("all")]
    public IEnumerable<Video> GetAll()
    {
      return dbContext.Videos;
    }
    [HttpGet("peeks")]
    public IEnumerable<VideoPeek> GetPeeks()
    {
      return dbContext.Videos.Select(v => v.Peek()).Take(4);
    }
    [HttpPost]
    public async Task<Video> Post(Video video)
    {
      var v = dbContext.Videos.FirstOrDefault(a => a.ID == video.ID);
      if (v != null)
      {
        v.Url = video.Url;
        v.CoverUrl = video.CoverUrl;
        v.Title = video.Title;
        v.Date = DateTime.Now;
        dbContext.Videos.Update(v);
      }
      else
      {
        await dbContext.Videos.AddAsync(video);
      }
      await dbContext.SaveChangesAsync();
      return video;
    }
    [HttpGet("delete/{id}")]
    public async Task<int> Delete(int id)
    {
      dbContext.Videos.RemoveRange(from a in dbContext.Videos where a.ID == id select a);
      return await dbContext.SaveChangesAsync();
    }
    [HttpPost("cover")]
    public async Task<string> UploadCover(IFormFile coverFile)
    {
      var filename = Path.ChangeExtension(Path.GetFileNameWithoutExtension(Path.GetRandomFileName()), Path.GetExtension(coverFile.FileName));
      using var stream = IOFile.OpenWrite(Path.Combine(settings.StaticAssetsPath, "covers", filename));
      await coverFile.CopyToAsync(stream);
      return filename;
    }
    [HttpPost("video")]
    public async Task<string> UploadVideo(IFormFile videoFile)
    {
      Console.WriteLine(videoFile);
      Console.WriteLine(videoFile.FileName);
      var filename = Path.ChangeExtension(Path.GetFileNameWithoutExtension(Path.GetRandomFileName()), Path.GetExtension(videoFile.FileName));
      using var stream = IOFile.OpenWrite(Path.Combine(settings.StaticAssetsPath, "videos", filename));
      await videoFile.CopyToAsync(stream);
      return filename;
    }
  }
}