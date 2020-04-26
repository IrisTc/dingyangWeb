using System;
using System.ComponentModel.DataAnnotations;

namespace DingYangServer.Videos
{
  public class VideoPeek
  {
    public int ID { get; set; }
    public string Title { get; set; }
    public string CoverUrl { get; set; }
  }
  public class Video
  {
    [Key]
    public int ID { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string Url { get; set; }
    public string CoverUrl { get; set; }
  }
  public static class VideoExtensions {
    public static VideoPeek Peek(this Video video) {
      return new VideoPeek {
        ID = video.ID,
        CoverUrl = video.CoverUrl,
        Title = video.Title,
      };
    }
  }
}