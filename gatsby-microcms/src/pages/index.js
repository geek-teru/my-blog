// hello.js
import * as React from "react"
import { graphql } from "gatsby"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/blog-card"
import Pagination from "../components/Pagination"
import "../../styles/blog-cards.css"
import "../../styles/pagination.css"

const IndexPage = ({ data }) => {
  // URLからページ番号を取得
  const currentLocation = useLocation()
  const { page = 1 } = queryString.parse(currentLocation.search)
  const postsPerPage = 2 // 1ページあたり2つのカードを表示
  const currentPage = parseInt(page, 10)
  
  // データが存在するか確認
  const node = data?.allMicrocmsBlogs?.edges?.[0]?.node || {}
  const contents = node.contents || []
  const hasData = Array.isArray(contents) && contents.length > 0
  
  // ページネーション用の計算
  const numPages = Math.ceil(contents.length / postsPerPage)
  const paginatedContents = contents.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // データ構造をコンソールに出力
  console.log("MicroCMS Data:", data);
  console.log("Current Page:", currentPage);
  console.log("Total Pages:", numPages);
  console.log("Paginated Contents:", paginatedContents);

  return (
    <Layout>
      <div className="page-container">
        <Seo title="Home" />
        
        {!hasData && (
          <div className="no-data-message">
            <p>ブログ記事が見つかりませんでした。</p>
            <p>microCMSにコンテンツを追加してください。</p>
          </div>
        )}
        
        {hasData && (
          <>
            <div className="posts-summary">
              <p className="post-count">投稿数: {contents.length}件</p>
            </div>
            <div className="blog-posts-container">
              {paginatedContents.map((content) => (
                <BlogCard 
                  key={content.id || Math.random().toString()} 
                  post={{ contents: content }} 
                />
              ))}
            </div>
            {numPages > 1 && (
              <Pagination currentPage={currentPage} numPages={numPages} />
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <Seo title="Home" />

export const query = graphql`
  query {
    allMicrocmsBlogs {
      edges {
        node {
          id
          contents {
            id
            title
            tag {
              id
              name
            }
            publishedAt
          }
        }
      }
    }
  }
`