import * as React from "react"
import { Link } from "gatsby"

const BlogCard = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  const author = post.frontmatter.author || {}

  return (
    <article
      className="blog-post-card"
      itemScope
      itemType="http://schema.org/Article"
    >
      {post.frontmatter.thumbnail && (
        <div className="post-thumbnail">
          <img src={post.frontmatter.thumbnail} alt={title} />
        </div>
      )}
      <div className="post-content">
        <header>
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small className="post-date">{post.frontmatter.date}</small>
        </header>
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.frontmatter.description || post.excerpt,
            }}
            itemProp="description"
          />
        </section>
        {author.name && (
          <div className="post-author">
            {author.avatar && (
              <img src={author.avatar} alt="" className="author-avatar" />
            )}
            <span>{author.name}</span>
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogCard 