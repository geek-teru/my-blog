import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../../styles/career.css"

const CareerPage = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  
  // コンテンツをレンダリングした後、DOM操作でカード化
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const content = document.querySelector('.career-content');
      if (content) {
        // すべての見出し2を取得
        const h2Elements = content.querySelectorAll('h2');
        
        h2Elements.forEach((h2) => {
          // 見出し2を含むカードを作成
          const card = document.createElement('div');
          card.className = 'career-card';
          
          // 見出し2の後の要素をカードに移動
          let nextElement = h2.nextElementSibling;
          const elementsToMove = [];
          
          while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'H1') {
            elementsToMove.push(nextElement);
            nextElement = nextElement.nextElementSibling;
          }
          
          // 見出し2をカードに追加（最初の要素として）
          card.appendChild(h2);
          
          // 見出し2の親ノード（content）にカードを挿入
          content.insertBefore(card, elementsToMove[0] || nextElement);
          
          // 残りの要素をカードに移動
          elementsToMove.forEach(element => {
            card.appendChild(element);
          });
        });
      }
    }
  }, []);

  return (
    <Layout>
      <div className="career-container">
        <h1>{frontmatter.title}</h1>
        <div 
          className="career-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/career/index.md/" }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export const Head = () => <Seo title="Career" />

export default CareerPage 