import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider-post.scss'

const sliderStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
}

class SliderPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: 100
    }
  }

  SliderChange = (event) => {
    this.setState({
      opacity: event
    })
  }

  render() {
    const { post } = this.props.data

    let opac = this.state.opacity;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div className="slider">
          <div className="slider-body">
            <Img fluid={post.frontmatter.base_image.img.childImageSharp.fluid} />
            {post.frontmatter.images.map((i) => {
              return (
                <Img
                  className='slide'
                  fluid={i.img.childImageSharp.fluid}
                  style={{ opacity: opac / 100, ...sliderStyle }}
                />
              )
            })}
          </div>
        </div>
        <Slider onChange={this.SliderChange.bind(this)} />
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
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
                      fluid(maxWidth: 550) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  description
                }
                base_image {
                  img {
                    childImageSharp {
                      fluid(maxWidth: 786) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
            }
        }
    }
`
