import * as React from "react"
import { Link } from "gatsby"
import "../../styles/header.css"

const Header = ({ siteTitle }) => {
  return (
    <header className="global-header">
      {/* 上段: サイトタイトル */}
      <div className="header-top">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/">{siteTitle || "マイテックブログ"}</Link>
          </h1>
          
          {/* 検索ボックス */}
          <div className="search-box">
            <input type="text" placeholder="ブログを検索..." />
          </div>
        </div>
      </div>
      
      {/* 下段: ナビゲーション */}
      <div className="header-bottom">
        <div className="header-content">
          <nav className="main-nav">
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/categories">カテゴリ</Link></li>
              <li><Link to="/tags">タグ</Link></li>
              <li><Link to="/about">このブログについて</Link></li>
              <li><Link to="/contact">お問い合わせ</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
