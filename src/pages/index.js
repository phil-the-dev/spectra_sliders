import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql, } from "gatsby";
import Img from "gatsby-image";


import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <SliderCategories />
  </Layout>
)

export default IndexPage

const SliderCategories = () => (
  <StaticQuery
    query={graphql`
    query {
      allMarkdownRemark(filter: { collection: { eq: "category" } }) {
        edges { 
          node {
            id
            frontmatter {
              title,
              image {
                childImageSharp {
                  resize(width: 150, height: 150) {
                    src
                  }
                  fluid(maxWidth: 786) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `}
    render={data =>
      data.allMarkdownRemark.edges.map(function (element, index) {
        var category = element.node.frontmatter
        return (
          <div key={element.node.id}>
            {category.title}
            <Img fluid={category.image.childImageSharp.fluid} />
          </div>);
      })
    }
  />
)