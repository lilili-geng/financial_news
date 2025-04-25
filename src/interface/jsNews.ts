export interface JsNewsOBject {
  id: number; // 文章的唯一标识
  title: string; // 文章标题
  description: string; // 文章描述
  author: string; // 文章作者
  image: string; // 文章的图片URL
  a_d_id: number; // 文章的广告ID（假设是广告相关）
  jump_url: string; // 文章的跳转链接
  class_id: number; // 文章分类ID
  read_count: number; // 文章的阅读量
  created_at: string; // 文章的创建时间（ISO格式）
}

export interface JsNewsArticleOBject {
  title: string; // 文章标题
  description: string; // 文章描述
  author: string; // 文章作者
  image: string; // 文章的图片URL
  a_d_id: number; // 文章的广告ID（假设是广告相关）
  jump_url: string; // 文章的跳转链接
  class_id: number; // 文章分类ID
  read_count: number; // 文章的阅读量
  created_at: string; // 文章的创建时间（ISO格式）
}

export interface ArticleDetailsOBject {
  title: string; // 文章标题
  class_id: number; // 文章类别的ID
  article_id: number; // 文章唯一标识符
  content: string; // 文章内容
  created_at: string; // 文章创建时间（TIMESTAMP 格式）
}
