import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './slider-post.scss'
import SliderImage from '../slider-image'

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

  SliderChange = (event) => {
    this.setState({
      ...this.state,
      opacity: event
    })
  }

  render() {
    const { post } = this.props.data

    let opac = this.state.opacity;
    let post_data = post.frontmatter;
    let first_image = post_data.images[0];
    let second_image = post_data.images[1];

    return (
      <div className="slider" style={{ height: window.innerHeight }}>
        <h1>{post_data.title}</h1>
        <div>
          <div className="slider-body">
            <SliderImage
              className='slide'
              img={first_image.img.childImageSharp.fluid}
            />
            <SliderImage
              className='slide'
              img={second_image.img.childImageSharp.fluid}
              style={{ opacity: opac / 100, ...sliderStyle }}
            />
          </div>
          <Slider onChange={e => this.SliderChange(e)} />
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
      }
    }
  }
`
