import React from "react"
import { Link } from "gatsby"
import "../../styles/pagination.css"

const Pagination = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  // 表示するページ番号を計算
  const getVisiblePages = () => {
    const pages = new Set()
    
    // 1ページ目から3ページ目の場合
    if (currentPage <= 3) {
      // 1~5ページを表示
      for (let i = 1; i <= Math.min(5, numPages); i++) {
        pages.add(i)
      }
      // 最終-1ページと最終ページを表示（存在する場合）
      if (numPages > 5) {
        pages.add(numPages - 1)
        pages.add(numPages)
      }
    }
    // 最終ページから3ページ以内の場合
    else if (currentPage >= numPages - 2) {
      // 1ページと2ページを表示
      pages.add(1)
      pages.add(2)
      // 最終-4ページから最終ページまでを表示
      for (let i = Math.max(3, numPages - 4); i <= numPages; i++) {
        pages.add(i)
      }
    }
    // それ以外の場合（中間ページ）
    else {
      // 1ページのみ表示
      pages.add(1)
      // 現在のページの前後2ページを表示
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 2 && i < numPages) {
          pages.add(i)
        }
      }
      // 最終ページを表示
      pages.add(numPages)
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

  const visiblePages = getVisiblePages()

  // 省略記号を含めたページ番号の配列を生成
  const pageItems = []
  visiblePages.forEach((page, index) => {
    if (index > 0) {
      if (page - visiblePages[index - 1] > 1) {
        pageItems.push('...')
      }
    }
    pageItems.push(page)
  })

  return (
    <div className="pagination">
      {/* 前へボタン */}
      <Link
        to={currentPage === 2 ? "/" : `/?page=${currentPage - 1}`}
        className={`pagination-link ${isFirst ? "disabled" : ""}`}
        aria-disabled={isFirst}
      >
        &lt;
      </Link>

      {/* ページ番号ボタン */}
      {pageItems.map((item, index) => (
        item === '...' ? (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
        ) : (
          <Link
            key={`pagination-number${item}`}
            to={item === 1 ? "/" : `/?page=${item}`}
            className={`pagination-link ${currentPage === item ? "active" : ""}`}
          >
            {item}
          </Link>
        )
      ))}

      {/* 次へボタン */}
      <Link
        to={`/?page=${currentPage + 1}`}
        className={`pagination-link ${isLast ? "disabled" : ""}`}
        aria-disabled={isLast}
      >
        &gt;
      </Link>
    </div>
  )
}

export default Pagination 