using System;
using System.ComponentModel.DataAnnotations;

namespace DingYangServer.Articles
{
  public class ArticlePeek
  {
    public int ID { get; set; }
    public string Title { get; set; }
    public DateTime Date { get; set; }
    public string Description { get; set; }
    public string CoverUrl { get; set; }
  }
  public class Article
  {
    [Key]
    public int ID { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public DateTime Date { get; set; }
    [Required]
    public string Description { get; set; }
    public string CoverUrl { get; set; }
    [Required]
    public string Category { get; set; }
    [Required]
    public string Content { get; set; }
  }
  public static class ArticleExtensions
  {
    public static ArticlePeek Peek(this Article article)
    {
      return new ArticlePeek
      {
        ID = article.ID,
        Title = article.Title,
        Date = article.Date,
        Description = article.Description,
        CoverUrl = article.CoverUrl,
      };
    }
  }
}