import React, { useState, useEffect, useRef } from "react"
import { navigate, useStaticQuery, graphql } from "gatsby"
import "../../styles/search-form.css"

const SearchForm = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const suggestionsRef = useRef(null)
  const inputRef = useRef(null)

  // GraphQLでブログ記事データを取得
  const data = useStaticQuery(graphql`
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
            }
          }
        }
      }
    }
  `)

  // 全記事データを取得
  const allPosts = data?.allMicrocmsBlogs?.edges?.[0]?.node?.contents || []

  // 検索クエリが変更されたときに候補を更新
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const query = searchQuery.toLowerCase().trim()
    
    // タイトルとタグで検索
    const filteredSuggestions = allPosts
      .filter(post => {
        const title = post.title?.toLowerCase() || ""
        
        // タグ検索
        const tags = post.tag || []
        const tagMatch = tags.some(tag => 
          tag.name?.toLowerCase().includes(query)
        )
        
        return title.includes(query) || tagMatch
      })
      .slice(0, 5) // 最大5件まで表示
    
    setSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }, [searchQuery, allPosts])

  // クリック以外の場所をクリックしたときに候補を非表示
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // キーボード操作のハンドリング
  const handleKeyDown = (e) => {
    // 下キー
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    }
    // 上キー
    else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    }
    // Enterキー
    else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        e.preventDefault()
        handleSuggestionClick(suggestions[selectedIndex])
      }
    }
    // Escキー
    else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  // 検索フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSuggestions(false)
    }
  }

  // 候補クリック時の処理
  const handleSuggestionClick = (suggestion) => {
    navigate(`/blog/${suggestion.id}`)
    setShowSuggestions(false)
    setSearchQuery("")
  }

  return (
    <div className="search-container">
      <form className={`search-form ${className || ""}`} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim() !== "" && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder="ブログを検索..."
          aria-label="検索"
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-button" aria-label="検索">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
      
      {/* 検索候補のドロップダウン */}
      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className="search-suggestions">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={suggestion.id}
                className={index === selectedIndex ? "selected" : ""}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <span className="suggestion-title">{suggestion.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchForm 