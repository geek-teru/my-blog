import React, { useEffect, useState } from "react"
import "../../styles/toc.css"

// 目次コンポーネント
const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState("")

  // 記事の見出し要素を取得する
  useEffect(() => {
    if (!content) return

    // 記事が表示された後に見出し要素を取得
    setTimeout(() => {
      const articleHeadings = Array.from(document.querySelectorAll('.post-content h2, .post-content h3'))
      
      if (articleHeadings.length > 0) {
        // 見出し要素の情報を整形
        const headingItems = articleHeadings.map(heading => ({
          id: heading.id || heading.innerText.replace(/\s+/g, '-').toLowerCase(),
          text: heading.innerText,
          level: parseInt(heading.tagName.substring(1)) // h2 -> 2, h3 -> 3
        }))
        
        // 見出しにIDがない場合は追加
        articleHeadings.forEach((heading, index) => {
          if (!heading.id) {
            heading.id = headingItems[index].id
          }
        })
        
        setHeadings(headingItems)
      }
    }, 100)
  }, [content])

  // スクロール時に現在位置の見出しをハイライト
  useEffect(() => {
    if (headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // 少し余裕を持たせる

      // 各見出しの位置を取得
      const headingPositions = headings.map(heading => {
        const element = document.getElementById(heading.id)
        return element ? { id: heading.id, position: element.offsetTop } : null
      }).filter(Boolean)

      // 現在のスクロール位置に最も近い見出しを特定
      for (let i = headingPositions.length - 1; i >= 0; i--) {
        if (scrollPosition >= headingPositions[i].position) {
          setActiveId(headingPositions[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期表示時にも実行

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  // 見出しが存在しない場合は何も表示しない
  if (headings.length === 0) {
    return null
  }

  return (
    <div className="toc-container">
      <div className="toc-title">目次</div>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map(heading => (
            <li 
              key={heading.id} 
              className={`toc-item toc-level-${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              <a 
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id).scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default TableOfContents 