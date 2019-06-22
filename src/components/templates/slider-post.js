import React from "react"
import { graphql } from 'gatsby'

const SliderPostTemplate = ({ data: { post } }) => (
  <div>
    <h1>{post.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
)

export default SliderPostTemplate

export const pageQuery = graphql`
    query PostBySlug($slug: String!) {
        post: markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            frontmatter {
                title
            }
        }
    }
`
