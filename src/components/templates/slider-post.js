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
    const { post } = this.props.data
    const post_data = post.frontmatter;
    let opacities = {};

    post_data.images.map((i) => {
      opacities[i.wavelength] = 0;
    });
    this.state = {
      opacities
    }
  }

  SliderChange = (event, wavelength) => {
    let opec = this.state.opacities;
    opec[wavelength] = event
    this.setState({
      opacities: opec
    })
  }

  render() {
    const { post } = this.props.data

    let opac = this.state.opacities;
    let post_data = post.frontmatter;
    return (
      <div className="slider" style={{ height: window.innerHeight }}>
        <h1>{post_data.title}</h1>
        <div>
          <div className="slider-body">
            <Img fluid={post_data.base_image.img.childImageSharp.fluid} />
            {post_data.images.map((i) => {

              return (
                <Img
                  className='slide'
                  fluid={i.img.childImageSharp.fluid}
                  style={{ opacity: opac[i.wavelength] / 100, ...sliderStyle }}
                />
              )
            })}
          </div>
          {post_data.images.map((i) => {
            return (
              <Slider onChange={e => this.SliderChange(e, i.wavelength)} />
            )
          })}

        </div>
        <h2>{post_data.title}</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        {post_data.images.map((i) => {
          return (
            <p>
              <strong>{i.wavelength}:</strong>
              {i.description}
              <br />
              <small>
                <em>
                  {i.credit}
                </em>
              </small>
            </p>
          )
        })}
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
        images {
          img {
            childImageSharp {
              fluid(maxWidth: 550) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          description
          wavelength
          credit
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
