import React from 'react';
import findKey from 'lodash/findKey';
import Canvas from './Canvas';
import { createCircles, arrangeLine, resize } from './controllers/circles';
import { createArrows, connectArrows } from './controllers/arrows';
import { interact, getDistance, applyDrag } from './controllers/interaction';

export default class GraphCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { circles: null, arrows: null, dragged: false };
    this.update = this.update.bind(this);
    this.saveContext = this.saveContext.bind(this);
    this.draw = this.draw.bind(this);
    this.moveEvent = this.moveEvent.bind(this);
    this.clickTrigger = this.clickTrigger.bind(this);
    this.scaleFigures = this.scaleFigures.bind(this);
  }

  componentDidMount() {
    this.ctx.canvas.addEventListener('resize', this.update);
    window.addEventListener('mousemove', e =>
      interact(this.ctx, e, this.moveEvent)
    );
    window.addEventListener('mousedown', e =>
      interact(this.ctx, e, this.clickTrigger)
    );
    window.addEventListener('mouseup', e =>
      interact(this.ctx, e, () => {
        const { dragged } = this.state;
        if (dragged) dragged.setColor('default');
        this.setState({ dragged: false });
      })
    );
    this.ctx.canvas.addEventListener(
      'touchstart',
      e => {
        const evt = e.touches[0];
        if (evt) interact(this.ctx, evt, this.clickTrigger);
      },
      false
    );
    this.ctx.canvas.addEventListener(
      'touchmove',
      e => {
        const evt = e.touches[0];
        const { dragged } = this.state;
        if (dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (evt) {
          interact(this.ctx, evt, this.moveEvent);
        }
      },
      false
    );
    this.ctx.canvas.addEventListener(
      'touchend',
      e => {
        const evt = e.touches;
        const { dragged } = this.state;
        if (evt)
          interact(this.ctx, evt, () => {
            if (dragged) {
              dragged.setColor('default');
            }
            this.setState({ dragged: false });
          });
      },
      false
    );
    const { nodes } = this.props;
    const circles = createCircles(this.ctx, nodes);
    const arrows = createArrows(this.ctx, nodes);
    this.scaleFigures(circles, arrows);
    //console.log(`arrows: ${JSON.stringify(arrows)}`);
  }

  componentWillReceiveProps(newProps) {
    const circles = createCircles(this.ctx, newProps.nodes);
    const arrows = createArrows(this.ctx, newProps.nodes);
    this.scaleFigures(circles, arrows);
  }

  componentDidUpdate() {
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
    const { circles, arrows } = this.state;
    this.scaleFigures(circles, arrows);
  }

  scaleFigures(circles, arrows) {
    resize(this.ctx, circles);
    //   console.log(`arrows: ${JSON.stringify(arrows)}`);
    const newCircles = arrangeLine(this.ctx, circles);
    const newArrows = connectArrows(this.ctx, arrows, newCircles);
    this.setState({ circles: newCircles, arrows: newArrows });
  }

  draw(ctx) {
    const { circles, arrows } = this.state;
    //  console.log(arrows);
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const arrowIdS = Object.keys(arrows);
    arrowIdS.forEach(nodeId => {
      const nodeArrows = arrows[nodeId];
      nodeArrows.forEach(arrow => {
        arrow.draw(ctx);
      });
    });
    const idS = Object.keys(circles);
    idS.forEach(id => {
      const circle = circles[id];
      ctx.beginPath();
      circle.draw(ctx);
    });

    ctx.restore();
  }

  moveEvent(pos) {
    const { circles, arrows, dragged } = this.state;
    if (dragged) {
      applyDrag(this.ctx, pos, dragged);
      circles[dragged.id] = dragged;
      const newArrows = connectArrows(this.ctx, arrows, circles);
      this.setState({ circles, arrows: newArrows });
      return;
    }
    const idS = Object.keys(circles);
    idS.forEach(id => {
      const circle = circles[id];
      const distance = getDistance(pos, circle);
      const scaledSize = circle.getScaledSize(this.ctx, idS.length);
      if (distance <= circle.radius * 4) {
        circle.setSize(scaledSize + (scaledSize - distance / 4) / 3);
      } else {
        circle.setSize(scaledSize);
      }
    });
    const newArrows = connectArrows(this.ctx, arrows, circles);
    this.setState({ circles, arrows: newArrows });
  }

  clickTrigger(pos) {
    const { circles } = this.state;

    const clickedId = findKey(circles, circle => {
      const distance = getDistance(pos, circle);
      return distance <= circle.radius;
    });
    if (clickedId) {
      this.setState({ dragged: circles[clickedId] });
    }
  }

  render() {
    return <Canvas contextRef={this.saveContext} />;
  }
}
