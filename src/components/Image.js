import React, { PropTypes } from 'react'
import hunt from 'huntjs'

export default class Image extends React.Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  }

  componentDidMount () {
    this.img.onload = () => {
      if (this.img) {
        this.img.className = "loaded";
      }
    }

    hunt(this.img, {
      enter: () => {
        if (this.img) {
          this.img.src = this.props.src
        }
      }
    })
  }

  render () {
    const { width, height } = this.props;
    return (
      <div style={{ width, height }} className="image">
        <img style={{ width, height }} ref={img => this.img = img}/>
      </div>
    )
  }

}