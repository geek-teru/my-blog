import React, { useState, useEffect } from "react"
import queryString from "query-string"
import Layout from "../components/layout"
import Seo from "../components/seo"
import TableOfContents from "../components/toc"
import "../../styles/blog-post.css"

const PreviewPage = ({ location }) => {
  const { contentId, draftKey } = queryString.parse(location.search)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!contentId || !draftKey) {
      setError("プレビューに必要なパラメータが不足しています")
      setLoading(false)
      return
    }

    fetch(`https://vl03t31fxb.microcms.io/api/v1/blogs/${contentId}?draftKey=${draftKey}`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.API_KEY,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('プレビューデータの取得に失敗しました')
        }
        return res.json()
      })
      .then(res => {
        setData({ allMicrocmsBlogs: { edges: [{ node: { contents: [res] } }] } })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [contentId, draftKey])

  if (loading) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="loading-message">
            <p>プレビューを読み込み中...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="error-message">
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="error-message">
            <p>プレビューデータが見つかりませんでした。</p>
          </div>
        </div>
      </Layout>
    )
  }

  const post = data.allMicrocmsBlogs.edges[0]?.node
  const content = post?.contents?.[0]

  if (!content) {
    return (
      <Layout>
        <div className="blog-post-container">
          <div className="error-message">
            <p>記事の内容が見つかりませんでした。</p>
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
      <div className="blog-post-container">
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
              <div className="preview-badge">プレビューモード</div>
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

export const Head = () => <Seo title="プレビュー" />

export default PreviewPage 