import React from 'react';
import '../style/Canvas.css';
import Canvas from './Canvas';

export default class GraphCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
    };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState() {
    this.setState(prevState => ({
      angle: prevState.angle + 1,
    }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    return <Canvas angle={this.state.angle} />;
  }
}
