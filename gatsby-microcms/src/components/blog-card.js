import React from "react"
import { Link } from "gatsby"
import "../../styles/blog-cards.css"

const BlogCard = ({ post }) => {
  // コンソールでデータ構造を確認
  console.log("BlogCard post:", post);
  
  if (!post || !post.contents) {
    return <div className="blog-post-card empty-card">投稿データがありません</div>
  }

  // データ構造を直接参照
  const { contents } = post;
  
  // 日付のフォーマット
  const formattedDate = contents.publishedAt 
    ? new Date(contents.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : null

  return (
    <article className="blog-post-card">
      <div className="post-content">
        <h2 className="post-title">
          <Link to={`/blog/${contents.id}`}>{contents.title || "タイトルなし"}</Link>
        </h2>
        
        {/* タグを表示 */}
        {contents.tag && contents.tag.length > 0 && (
          <div className="post-tags">
            {contents.tag.map(tag => (
              <span key={tag.id} className="post-tag">{tag.name}</span>
            ))}
          </div>
        )}
        
        {formattedDate && (
          <div className="post-date">{formattedDate}</div>
        )}
      </div>
    </article>
  )
}

export default BlogCard 