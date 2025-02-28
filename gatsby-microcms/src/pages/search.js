import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { useLocation } from "@reach/router"
import queryString from "query-string"
import Layout from "../components/layout"
import Seo from "../components/seo"
import BlogCard from "../components/blog-card"
import SearchForm from "../components/search-form"
import "../../styles/search.css"

const SearchPage = ({ data }) => {
  const location = useLocation()
  const { q = "" } = queryString.parse(location.search)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // 検索キーワードが変更されたときに検索を実行
  useEffect(() => {
    if (!q.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // 検索処理
    const searchQuery = q.toLowerCase().trim()
    const allPosts = data?.allMicrocmsBlogs?.edges?.[0]?.node?.contents || []
    
    const filteredPosts = allPosts.filter(post => {
      const title = post.title?.toLowerCase() || ""
      const content = post.content?.toLowerCase() || ""
      const category = post.category?.name?.toLowerCase() || ""
      
      return (
        title.includes(searchQuery) || 
        content.includes(searchQuery) || 
        category.includes(searchQuery)
      )
    })
    
    setSearchResults(filteredPosts)
    setIsSearching(false)
  }, [q, data])

  return (
    <Layout>
      <div className="search-page">
        <h1 className="search-page-title">検索</h1>
        
        {/* 検索フォーム */}
        <div className="search-page-form-container">
          <SearchForm className="search-page-form" />
        </div>
        
        {/* 検索キーワードと結果数 */}
        {q && (
          <div className="search-info">
            <p>
              「<span className="search-query">{q}</span>」の検索結果: 
              <span className="search-count">{searchResults.length}件</span>
            </p>
          </div>
        )}
        
        {/* 検索中の表示 */}
        {isSearching && (
          <div className="search-loading">
            <p>検索中...</p>
          </div>
        )}
        
        {/* 検索結果がない場合 */}
        {!isSearching && q && searchResults.length === 0 && (
          <div className="no-results">
            <p>検索結果が見つかりませんでした。別のキーワードで試してみてください。</p>
          </div>
        )}
        
        {/* 検索結果の表示 */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <div className="blog-posts-container">
              {searchResults.map(post => (
                <BlogCard 
                  key={post.id} 
                  post={{ contents: post }} 
                />
              ))}
            </div>
          </div>
        )}
        
        {/* 検索キーワードが入力されていない場合 */}
        {!q && (
          <div className="search-prompt">
            <p>検索キーワードを入力してください。</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SearchPage

export const Head = () => <Seo title="検索" />

export const query = graphql`
  query {
    allMicrocmsBlogs {
      edges {
        node {
          id
          contents {
            id
            title
            content
            publishedAt
            category {
              id
              name
            }
          }
        }
      }
    }
  }
` 