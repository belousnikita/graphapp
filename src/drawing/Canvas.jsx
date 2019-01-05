/* eslint-disable react/prop-types */
import React from 'react';
import '../style/Canvas.css';
import PureCanvas from './PureCanvas';

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
  }

  componentDidUpdate() {
    const { angle } = this.props;
    // eslint-disable-next-line prefer-destructuring
    const width = this.ctx.canvas.width;
    // eslint-disable-next-line prefer-destructuring
    const height = this.ctx.canvas.height;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.translate(width / 4, height / 4);
    this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.fillStyle = '#4397AC';
    this.ctx.fillRect(-width / 8, -height / 8, width / 4, height / 4);
    this.ctx.restore();
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  render() {
    return <PureCanvas contextRef={this.saveContext} />;
  }
}
