import React from 'react';
import Canvas from './Canvas';
import { createCircles, arrangeLine, resize } from './controllers/circles';
import { interact, getDistance } from './controllers/interaction';

export default class GraphCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { circles: props.nodes, dragged: false };
    this.update = this.update.bind(this);
    this.saveContext = this.saveContext.bind(this);
    this.draw = this.draw.bind(this);
    this.moveEvent = this.moveEvent.bind(this);
    this.clickTrigger = this.clickTrigger.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.update);
    window.addEventListener('mousemove', e =>
      interact(this.ctx, e, this.moveEvent)
    );
    window.addEventListener('mousedown', e =>
      interact(this.ctx, e, this.clickTrigger)
    );
    window.addEventListener('mouseup', e =>
      interact(this.ctx, e, () => {
        const { dragged } = this.state;
        if (dragged) dragged.setColor('#12bbad');
        this.setState({ dragged: false });
      })
    );
    const { nodes } = this.props;
    const circles = createCircles(this.ctx, nodes);
    this.scaleCircles(circles);
  }

  componentWillReceiveProps(newProps) {
    const circles = createCircles(this.ctx, newProps.nodes);
    this.scaleCircles(circles);
  }

  componentDidUpdate() {
    //  get from state or props and draw
    // console.log(this.ctx);
    this.setupCanvas();
    this.draw(this.ctx);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  setupCanvas() {
    const { ctx } = this;
    // Get the device pixel ratio, falling back to 1.
    const dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    const rect = ctx.canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    ctx.canvas.width = rect.width * dpr;
    ctx.canvas.height = rect.height * dpr;
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
  }

  saveContext(ctx) {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  }

  update() {
    const { circles } = this.state;
    this.scaleCircles(circles);
    this.draw(this.ctx);
  }

  scaleCircles(circles) {
    const resizedCircles = resize(this.ctx, circles);
    this.setState(arrangeLine(this.ctx, resizedCircles));
  }

  draw(ctx) {
    const { circles } = this.state;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    circles.forEach(circle => {
      ctx.beginPath();
      circle.draw(ctx);
    });
    ctx.restore();
  }

  moveEvent(pos) {
    const { circles, dragged } = this.state;
    const { width, height } = this.ctx.canvas;
    if (dragged) {
      if (pos.x + dragged.radius > width) {
        dragged.setX(width - dragged.radius);
      } else if (pos.x - dragged.radius < 0) {
        dragged.setX(0 + dragged.radius);
      } else {
        dragged.setX(pos.x);
      }

      if (pos.y + dragged.radius < height && pos.y - dragged.radius > 0) {
        dragged.setY(pos.y);
      }
      dragged.setColor('#0D8C82');
      circles[dragged.id - 1] = dragged; // TODO Make an object parameter
      this.setState({ circles });
      return;
    }
    circles.forEach(circle => {
      const distance = getDistance(pos, circle);
      const scaledSize = circle.getScaledSize(this.ctx, circles.length);
      if (distance <= circle.radius) {
        circle.setSize(scaledSize + (scaledSize - distance) / 3);
      } else {
        circle.setSize(scaledSize);
      }
    });
    this.setState({ circles });
  }

  clickTrigger(pos) {
    const { circles } = this.state;
    const clickedCircle = circles.find(circle => {
      const distance = getDistance(pos, circle);
      return distance <= circle.radius ? circle : false;
    });
    this.setState({ dragged: clickedCircle });
  }

  render() {
    return <Canvas contextRef={this.saveContext} />;
  }
}
