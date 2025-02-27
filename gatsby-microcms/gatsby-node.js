/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
const path = require("path")

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMicrocmsBlogs {
          edges {
            node {
              id
              contents {
                id
                title
                publishedAt
                category {
                  id
                  name
                }
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // ブログ記事のページを生成
  const blogPostTemplate = path.resolve('./src/templates/blog-post.js');
  
  // 各記事のコンテンツに対してページを生成
  const posts = result.data.allMicrocmsBlogs.edges;
  
  posts.forEach(post => {
    const contents = post.node.contents || [];
    
    contents.forEach(content => {
      console.log(`Creating page for blog post: ${content.id}`);
      
      createPage({
        path: `/blog/${content.id}`,
        component: blogPostTemplate,
        context: {
          id: content.id,
        },
      });
    });
  });
};