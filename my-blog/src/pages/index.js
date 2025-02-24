import * as React from "react"
import { graphql } from "gatsby"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/blog-card"
import "../styles/blog-cards.css"

// トップページのコンポーネント
// data: GraphQLクエリの結果
// location: 現在のURL情報
const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const currentLocation = useLocation()
  const { page = 1 } = queryString.parse(currentLocation.search)
  const postsPerPage = 2
  const currentPage = parseInt(page, 10)
  const posts = data.allMarkdownRemark.nodes
  const numPages = Math.ceil(posts.length / postsPerPage)
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <div className="blog-posts-container">
        {paginatedPosts.map(post => (
          <BlogCard key={post.fields.slug} post={post} />
        ))}
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        現在のページ: {currentPage} / 全{numPages}ページ
      </p>
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

// GraphQLクエリを定義
// サイトのタイトルとすべてのマークダウンファイルを取得
// ファイルは日付で降順ソートされている
export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY.MM.DD")
          title
          description
          thumbnail
          author {
            name
            avatar
          }
        }
      }
    }
  }
`