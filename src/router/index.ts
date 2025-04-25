import { Router } from "express";
import { JsNews } from "../model/index";

const router = Router();

// 金色财经
router.get("/js-news", async (req, res): Promise<any> => {
  try {
    const news = new JsNews();
    // 金色财经文章列表
    // news.fetchJsNews()
    news.getArticleDetails()
    res.json({ success: true, data: [] });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
