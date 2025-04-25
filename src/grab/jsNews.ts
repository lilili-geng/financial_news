import { chromium } from "playwright";

export class JsNewsGrab {
  public async fetchDataFromUrl(url: string) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });

      // 尝试抓取 .js-article 元素
      let articleHtml = await page.$eval('.js-article', (element) => element.outerHTML).catch(() => '');

      // 如果没有找到 .js-article，再尝试抓取 .content 元素
      if (!articleHtml) {
        articleHtml = await page.$eval('.content', (element) => element.outerHTML).catch(() => '');
      }

      // 如果仍然没有找到，尝试抓取 .title 元素
      if (!articleHtml) {
        articleHtml = await page.$eval('.title', (element) => element.outerHTML).catch(() => '');
      }

      return articleHtml; // 返回抓取到的 HTML

    } catch (error) {
      console.error("抓取失败:", error);
      return "";
    } finally {
      await browser.close();
    }
  }
}
