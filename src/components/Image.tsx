import * as React from 'react';
import styled from 'styled-components';
import LazyImage from 'react-lazy-image';
import VisibilitySensor from './VisibilitySensor';
import * as cn from 'classnames';

interface ImageProps {
  src: string,
  width: number,
  height: number
}

interface ImageState {
  loading: boolean,
  loaded: boolean,
  visible: boolean | null
}

export default class Image extends React.Component<ImageProps, ImageState> {

  img: HTMLImageElement;

  state = {
    loading: false,
    loaded: false,
    visible: null,
  };

  componentDidUpdate(prevProps: ImageProps, prevState: ImageState) {
    if (prevProps.src !== this.props.src) {
      this.setState({loading: false, loaded: false});
    }

    if (!prevState.visible && this.state.visible) {
      this.setState({loading: true});
      const {src} = this.props;
      const image = new window.Image();
      image.src = src;
      image.onload = () => {
        if (src === this.props.src) {
          this.setState({loaded: true});
        }
      }
    }
  }

  handleLoadEnd = () => {
    this.setState({loaded: true});
  };

  handleVisibilityChange = (visible: boolean) => {
    this.setState({visible})
  };

  render() {
    const {width, height, src} = this.props;
    const {loading, loaded, visible} = this.state;
    return (
      <VisibilitySensor active={!loaded} onChange={this.handleVisibilityChange}>
        <Wrapper width={width} height={height} className={cn({ loaded })}>
          { (loading || loaded) && <img src={src} style={{ width, height }} /> }
        </Wrapper>
      </VisibilitySensor>
    )
  }
}

const Wrapper = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: #ddd;
  border-radius: 7px;
  
  img {
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    border-radius: 7px;
  }
  
  &.loaded img {
    opacity: 1;
  }  
`;
