import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


// const SliderPostTemplate = ({ data: { post } }) => (
// )
class SliderPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 1
    }
  }

  SliderChange = (event) => {
    this.setState({
      opacity: event
    })
  }


  render() {
    const { post } = this.props.data
    console.log(this.state)
    let opac = this.state.opacity;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        {/* <div>{post.frontmatter.images.map((i) => { return i.description })}</div> */}
        {post.frontmatter.images.map((i) => { return (<div style={{ opacity: opac / 100 }} > <Img fluid={i.img.childImageSharp.fluid} /> </div>) })}
        <Slider onChange={this.SliderChange.bind(this)} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}


export default SliderPostTemplate

export const pageQuery = graphql`
    query PostBySlug($slug: String!) {
        post: markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            frontmatter {
                title
                images{
                  img{
                    childImageSharp {
                      resize(width: 150, height: 150) {
                        src
                      }
                      fluid(maxWidth: 150) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  description
                }
            }
        }
    }
`
