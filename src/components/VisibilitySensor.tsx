import * as React from 'react';
import * as _ from 'lodash';
import * as R from 'ramda';

interface VisibilitySensorProps {
  active: boolean,
  onChange: (value: boolean) => void,
  offset: number,
}

interface VisibilitySensorState {
  visible: boolean
}

interface Rectangle {
  top: number,
  left: number,
  width: number,
  height: number
}

export default class VisibilitySensor extends React.Component<VisibilitySensorProps, VisibilitySensorState> {

  node: HTMLElement;

  state: {
    visible: false
  };

  static defaultProps = {
    offset: 0
  };

  componentDidMount() {
    if (this.props.active) {
      setTimeout(() => {
        this.startWatch();
      }, 10);
    }
  }

  componentDidUpdate(prevProps: VisibilitySensorProps, prevState: VisibilitySensorState) {
    if (prevProps.active && !this.props.active) {
      this.stopWatch();
    }
    if (!prevProps.active && this.props.active) {
      this.startWatch();
    }
    const prevVisible = prevState && prevState.visible;
    const currentVisible = this.state && this.state.visible;
    if (prevVisible !== currentVisible) {
      this.props.onChange(currentVisible);
    }
  }

  componentWillUnmount() {
    this.stopWatch();
  }

  startWatch() {
    this.setState({visible: this.isVisible()});
    window.addEventListener('scroll', this.debounceCheck);
    window.addEventListener('resize', this.debounceCheck);
  }

  stopWatch() {
    window.removeEventListener('scroll', this.debounceCheck);
  }

  debounceCheck = _.throttle(() => {
    const { visible } = this.state;
    const newVisible = this.isVisible();
    if (visible !== newVisible)  {
      this.setState({ visible: newVisible });
    }
  }, 50);

  isVisible = () => {
    const {offset} = this.props;
    const nodeRect: Rectangle = this.node.getBoundingClientRect();
    const viewPort: Rectangle = {
      top: -offset,
      left: -offset,
      width: window.innerWidth + offset,
      height: window.innerHeight + offset
    };
    return this.intersectRect(nodeRect, viewPort)
  };

  intersectRect(r1: Rectangle, r2: Rectangle) {
    return !(
      r2.left > (r1.left + r1.width) ||
      (r2.left + r2.width) < r1.left ||
      r2.top > (r1.top + r1.height) ||
      (r2.top + r2.height) < r1.top
    );
  }

  render() {
    return <div ref={node => this.node = node}>{this.props.children}</div>;
  }

}