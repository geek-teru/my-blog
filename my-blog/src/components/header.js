import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import "../styles/header.css"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const navItems = [
    { path: "/infrastructure", label: "Infrastructure" },
    { path: "/backend", label: "Backend" },
    { path: "/frontend", label: "Frontend" }
  ]

  return (
    <header className="global-header">
      {/* 上段: タイトルと検索 */}
      <div className="header-top">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </h1>
          <div className="search-box">
            <input
              type="search"
              placeholder="検索"
              aria-label="サイト内検索"
            />
          </div>
        </div>
      </div>

      {/* 下段: ナビゲーション */}
      <div className="header-bottom">
        <div className="header-content">
          <nav className="main-nav">
            <ul>
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 