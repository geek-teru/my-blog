import * as React from "react"
import { Link } from "gatsby"
import { useState } from "react"
import SearchForm from "./search-form"
import "../../styles/header.css"

const Header = ({ siteTitle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="global-header">
      {/* 上段: サイトタイトル */}
      <div className="header-top">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/">{siteTitle || "Teru's Blog"}</Link>
          </h1>
          
          {/* ハンバーガーメニューボタン */}
          <button 
            className="hamburger-button" 
            onClick={toggleMenu}
            aria-label="メニュー"
            aria-expanded={isMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          
          {/* 検索ボックス */}
          <div className="search-box">
            <SearchForm />
          </div>
        </div>
      </div>
      
      {/* 下段: ナビゲーション */}
      <div className={`header-bottom ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header-content">
          <nav className="main-nav">
            <ul>
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
