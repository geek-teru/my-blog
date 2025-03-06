import React, { useEffect, useRef } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TableOfContents from "../components/toc"
import "../../styles/blog-post.css"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  // データ構造をコンソールに出力
  console.log("Blog Post Data:", data)
  console.log("Page Context:", pageContext)
  
  // 記事データを取得
  const post = data.allMicrocmsBlogs.edges[0]?.node
  
  // タイトル要素への参照を作成
  const containerRef = useRef(null)
  
  // コンポーネントがマウントされたら、タイトルにスクロール
  useEffect(() => {
    // ページ読み込み時に強制的にトップにスクロール
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    })
    
    // 少し遅延させて再度スクロール（レイアウトが完全に読み込まれた後）
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    }, 50)
    
    // さらに遅延させて再度スクロール（確実に適用するため）
    const secondTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      })
    }, 150)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(secondTimer)
    }
  }, [])
  
  if (!post || !post.contents) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="error-message">
            <p>記事が見つかりませんでした。</p>
            <Link to="/">トップページに戻る</Link>
          </div>
        </div>
      </Layout>
    )
  }
  
  // 記事の内容を取得（pageContextから渡されたidを使用）
  const content = post.contents.find(content => content.id === pageContext.id)
  
  if (!content) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="error-message">
            <p>記事の内容が見つかりませんでした。</p>
            <Link to="/">トップページに戻る</Link>
          </div>
        </div>
      </Layout>
    )
  }
  
  // 日付のフォーマット
  const formattedDate = content.publishedAt 
    ? new Date(content.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : null

  return (
    <Layout>
      <div className="blog-post-container" id="blog-post-top" ref={containerRef}>
        <div className="blog-post-content-wrapper">
          <article className="blog-post">
            <header className="post-header">
              <h1 className="post-title">{content.title}</h1>
              <div className="post-meta">
                {/* タグを表示 */}
                {content.tag && content.tag.length > 0 && (
                  <div className="post-tags">
                    {content.tag.map(tag => (
                      <span key={tag.id} className="post-tag">{tag.name}</span>
                    ))}
                  </div>
                )}
                {formattedDate && (
                  <span className="post-date">{formattedDate}</span>
                )}
              </div>
            </header>
            
            {content.content && (
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            )}
            
            <footer className="post-footer">
              <Link to="/" className="back-link">
                ← ホームに戻る
              </Link>
            </footer>
          </article>
          
          {/* 目次サイドバー */}
          <aside className="blog-post-sidebar">
            <TableOfContents content={content.content} />
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data, pageContext }) => {
  const post = data.allMicrocmsBlogs.edges[0]?.node
  const content = post?.contents?.find(content => content.id === pageContext.id)
  return <Seo title={content ? content.title : "ブログ記事"} />
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug {
    allMicrocmsBlogs {
      edges {
        node {
          id
          contents {
            id
            title
            content
            publishedAt
            tag {
              id
              name
            }
          }
        }
      }
    }
  }
` 