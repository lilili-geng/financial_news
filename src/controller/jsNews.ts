import { ArticleDetailsOBject, JsNewsArticleOBject } from "../interface/jsNews";
import pool from "../utils/index";

export class JsNewsController {
  /**
   * 插入文章到数据库
   * @param article 文章数据
   */
  public async insertArticle(article: JsNewsArticleOBject) {
    const query = `
    INSERT INTO articles (
      title, description, author, image, a_d_id,jump_url,class_id,read_count, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,FROM_UNIXTIME(?))
  `;
    const values = [
      article.title,
      article.description,
      article.author,
      article.image,
      article.a_d_id,
      article.jump_url,
      article.class_id,
      article.read_count,
      article.created_at,
    ];

    try {
      // 使用数据库连接池执行 SQL 查询
      const [rows] = await pool.execute(query, values);
      console.log(`成功插入文章: ${article.title}`);
    } catch (error) {
      console.error("插入文章失败:", error);
    }
  }

  /**
   * 查询指定页数的文章
   * @param page 当前页码
   * @param limit 每页查询的数量
   */
  public async getArticlesByPage(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM articles LIMIT ${limit} OFFSET ${offset}`;
    try {
      const rows = await pool.execute(query);
      return rows[0];
    } catch (error) {
      console.error("查询文章失败:", error);
      return [];
    }
  }

  /**
   * 插入文章详情到数据库
   * @param article 文章数据
   */
  public async insertArticleDetails(article: ArticleDetailsOBject) {
    const query = `
    INSERT INTO article_details (
      title,class_id,article_id,content,created_at
    ) VALUES (?, ?, ?, ?, ?)
  `;
    const values = [
      article.title,
      article.class_id,
      article.article_id,
      article.content,
      article.created_at,
    ];

    try {
      // 使用数据库连接池执行 SQL 查询
      const [rows] = await pool.execute(query, values);
      console.log(`成功插入文章详情: ${article.title}`);
    } catch (error) {
      console.error("插入文章失败:", error);
    }
  }
}
