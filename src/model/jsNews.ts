import axios from "axios";
import { config } from "../config";
import { JsNewsController } from "../controller/jsNews";
import { JsNewsGrab } from "../grab/jsNews";
import { JsNewsOBject } from "../interface/jsNews";

export class JsNews {
  private config: config;

  private jsNewsController: JsNewsController;

  private jsNewsGrab: JsNewsGrab;

  constructor() {
    this.config = new config();
    this.jsNewsController = new JsNewsController();
    this.jsNewsGrab = new JsNewsGrab();
  }

  /**
   * 抓取指定information_id的文章数据
   * @param information_id 文章信息ID
   */
  private async fetchArticlesById(information_id: number) {
    try {
      // 分类爬取
      const response = await axios.get(
        // `https://api.jinse.cn/noah/v3/timelines?catelogue_key=www&limit=10&information_id=${information_id}&flag=down`
        // `https://api.jinse.cn/noah/v3/timelines?catelogue_key=头条&limit=100&information_id=${information_id}&flag=down`
        // `https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=%E6%AF%94%E7%89%B9%E5%B8%81L2&limit=100&information_id=${information_id}&flag=up`
        // 'https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=Meme&limit=100&information_id=0&flag=up'
        // 'https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=ethereum&limit=100&information_id=0&flag=up'
        // 'https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=%E7%A0%94%E6%8A%A5&limit=100&information_id=0&flag=up'
        // 'https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=%E7%A9%BA%E6%8A%95&limit=100&information_id=0&flag=up'
        "https://api.jinse.cn/noah/v3/catalogue/timelines?catelogue_key=%E7%AC%A6%E6%96%87&limit=100&information_id=0&flag=up"
      );

      const data = response.data.data;

      // 检查返回的数据是否包含有效的文章数据
      if (data && Array.isArray(data.list)) {
        return data.list.map((item: any) => {
          // console.log(item, "item");

          // 获取文章数据

          const title =
            item.object_2?.title || item.object_1?.title || "无标题";
          const description =
            item.object_2?.content ||
            item.object_1?.content ||
            item.object_1?.summary ||
            "无描述";
          const author =
            item.object_2?.author?.nickname ||
            item.object_1?.author?.nickname ||
            "未知";
          const created_at =
            item.object_2?.published_at ||
            item.object_1?.published_at ||
            "未知时间"; // 转换时间戳并提供默认时间
          const read_count =
            item.object_2?.down_counts || item.object_1?.down_counts || 0;
          const image = item.object_2?.cover || item.object_1?.cover || 0;
          const a_d_id = item.object_2?.id || item.object_1?.id || 0;
          const jump_url =
            item.object_2?.jump_url || item.object_1?.jump_url || 0;
          const attribute =
            item.object_2?.attribute || item.object_1?.attribute || "无标题";

          // 对应分类id
          const class_id = 7;

          return {
            title,
            description,
            author,
            created_at,
            read_count,
            image,
            a_d_id,
            jump_url,
            attribute,
            class_id,
          };
        });
      } else {
        console.error(`没有找到有效的文章数据，ID为${information_id}`);
        return []; // 返回空数组
      }
    } catch (error) {
      console.error(
        `抓取ID为${information_id}的文章数据失败:`,
        error.response || error.message || error
      );
      return [];
    }
  }

  /**
   * 执行抓取并循环处理多个information_id
   */
  public async fetchJsNews() {
    const allArticles = [];

    try {
      const articles = await this.fetchArticlesById(0);
      for (const article of articles) {
        await this.jsNewsController.insertArticle(article);
      }

      // for (
      //   let information_id = 95306;
      //   information_id <= 95308;
      //   information_id++
      // ) {
      //   console.log(`开始抓取ID为${information_id}的数据...`);

      //   const articles = await this.fetchArticlesById(information_id);

      //   allArticles.push(...articles);

      //   for (const article of articles) {
      //     await this.jsNewsController.insertArticle(article);
      //   }
      // }
    } catch (error) {
      console.error("抓取失败:", error.response || error.message || error);
    }
  }

  public async getArticleDetails() {
    let page = 1;
    const limit = 10; // 每次查询 10 条

    try {
      while (true) {
        // 获取当前页的文章数据
        const articles: any = await this.jsNewsController.getArticlesByPage(
          page,
          limit
        );

        if (articles.length === 0) {
          console.log("所有文章已插入完毕");
          break; // 没有更多文章，退出循环
        }

        for (const article of articles) {
          const articleData = await this.jsNewsGrab.fetchDataFromUrl(
            article.jump_url
          );
          const param = {
            title: article.title,
            class_id: article.class_id,
            article_id: article.id,
            content: articleData.toString(),
            created_at: article.created_at,
          };
          await this.jsNewsController.insertArticleDetails(param);
        }

        console.log(`第 ${page} 页文章已插入完毕`);

        // 增加页数，查询下一页
        page++;
      }
    } catch (error) {
      console.error("抓取失败:", error.response || error.message || error);
    }
  }
}
