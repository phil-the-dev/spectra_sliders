/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    node.collection = getNode(node.parent).sourceInstanceName;
  }
}


// Need to figure out what's generated? https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#debugging-help
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            posts: allMarkdownRemark {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter{
                    category
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const path = require(`path`)
        const postTemplate = path.resolve("./src/components/templates/slider-post.js")

        const posts = result.data.posts.edges
        posts.forEach(post => {
          const frontmatter = post.node.frontmatter;
          createPage({
            path: frontmatter.category.toLowerCase() + post.node.fields.slug,
            component: postTemplate,
            context: {
              slug: post.node.fields.slug,
            },
          })
        })
      })
    )
  })
}
