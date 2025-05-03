/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

const React = require('react')

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  
  // メタビューポートタグを追加
  setHeadComponents([
    React.createElement('meta', {
      key: 'viewport',
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    })
  ])
}
