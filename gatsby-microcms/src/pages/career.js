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
          // 見出し2の要素から次の見出し2までの要素をグループ化
          const card = document.createElement('div');
          card.className = 'career-card';
          
          // 見出し2の後の要素をカードに移動
          let nextElement = h2.nextElementSibling;
          const elementsToMove = [];
          
          while (nextElement && nextElement.tagName !== 'H2') {
            elementsToMove.push(nextElement);
            nextElement = nextElement.nextElementSibling;
          }
          
          // 見出し2をカードの前に移動
          h2.parentNode.insertBefore(card, h2.nextSibling);
          
          // 要素をカードに移動
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

export const Head = () => <Seo title="キャリア" />

export default CareerPage 