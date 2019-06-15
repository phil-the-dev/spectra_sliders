import React from "react"
import { Link } from "gatsby"
import { StaticQuery, graphql, } from "gatsby";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <SliderCategory />
  </Layout>
)

export default IndexPage

const SliderCategory = () => (
  <StaticQuery
    query={graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
        }
      }
    }
  `}
    render={data =>
      data.allMarkdownRemark.group.map(function (element, index) {
        return (<div>{element.fieldValue}</div>);
      })
    }
  />
)