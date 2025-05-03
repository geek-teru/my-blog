/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import "../../styles/header.css"
import "../../styles/layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Teru's Blog`} />
      <div className="global-wrapper">
        <div className="global-content">
          <main className="main-content">{children}</main>
          <footer className="global-footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} {data.site.siteMetadata?.title || `Teru's Blog`} All rights reserved.</p>
              <p>
                Built with <a href="https://www.gatsbyjs.com">Gatsby</a> and 
                {` `}
                <a href="https://microcms.io">microCMS</a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Layout
