import React from "react";
import Img from "gatsby-image";

export default class SliderImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = {
      opacity: this.props.opacity,
      ...this.props.style
    }

    return (
      <Img
        className={this.props.className}
        fluid={this.props.img}
        style={styles}
      />
    );
  }
}