import React from "react"
import { graphql } from 'gatsby'
import Img from "gatsby-image";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './post.scss'
import SliderImage from '../../components/slider-image'

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
      opacity: 0
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

    let label_styles = { width: '50%', display: 'inline-block', float: 'left' }

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
              style={{ opacity: this.state.opacity / 100, ...sliderStyle }}
            />
          </div>
          <div>
            <div style={label_styles}>
              {first_image.wavelength}
            </div>
            <div style={{ textAlign: 'right', ...label_styles }}>
              {second_image.wavelength}
            </div>
          </div>
          <div style={{ clear: 'both' }}></div>
          <Slider onChange={e => this.SliderChange(e)} />
        </div>
        <div>
          <div style={label_styles}>
            {first_image.description}
          </div>
          <div style={{ textAlign: 'right', ...label_styles }}>
            {second_image.description}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        Credits:
        {post_data.images.map((i) => {
          return (
            <div>
              <strong>{i.wavelength}:</strong>
              <small>
                <em>
                  {i.credit}
                </em>
              </small>
            </div>
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
