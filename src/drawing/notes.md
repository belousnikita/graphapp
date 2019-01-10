/_ eslint-disable react/prop-types _/
import React from 'react';
import '../style/Canvas.css';
import PureCanvas from './PureCanvas';

export default class Canvas extends React.Component {
constructor(props) {
super(props);
// this.saveContext = this.saveContext.bind(this);
this.setupCanvas = this.setupCanvas.bind(this);
this.draw = this.draw.bind(this);
}

componentDidMount() {
const { ctx } = this.props;
console.log(`recieved ${ctx}`);
// this.setupCanvas();
// arrangeLine(ctx.canvas);
// this.draw();
// ctx.canvas.addEventListener('mousemove', this.printMousePos);
}

componentWillReceiveProps() {
// const { arrangeLine } = props;
// const { ctx } = this.props;
// console.log(`recieved ${ctx}`);
// this.setupCanvas();
// arrangeLine(this.ctx.canvas);
// this.draw();
}

componentWillUpdate() {
const { ctx } = this.props;
console.log(`recieved ${ctx}`);
// // eslint-disable-next-line prefer-destructuring
// this.setupCanvas();
// arrangeLine(this.ctx.canvas);
// this.draw();
}

setupCanvas() {
const { ctx } = this.props;
// Get the device pixel ratio, falling back to 1.
const dpr = window.devicePixelRatio || 1;
// Get the size of the canvas in CSS pixels.
const rect = ctx.canvas.getBoundingClientRect();
// Give the canvas pixel dimensions of their CSS
// size _ the device pixel ratio.
ctx.canvas.width = rect.width _ dpr;
ctx.canvas.height = rect.height \* dpr;
// Scale all drawing operations by the dpr, so you
// don't have to worry about the difference.
ctx.scale(dpr, dpr);
}

getMousePos(canvas, evt) {
const rect = canvas.getBoundingClientRect();
// abs. size of element

    const scaleX = canvas.width / rect.width;
    // relationship bitmap vs. element for X

    const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    return {
      x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
    };

}

printMousePos = e => {
console.log(this.getMousePos(this.ctx.canvas, e));
};

draw() {
const { circles, ctx } = this.props;
const { width } = this.ctx.canvas;
this.setupCanvas();
// this.arrangeLine();
// eslint-disable-next-line prefer-destructuring
const height = ctx.canvas.height;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    circles.forEach(circle => {
      ctx.beginPath();
      circle.draw(ctx);
    });
    ctx.restore();
    // eslint-disable-next-line react/destructuring-assignment

}

render() {
const { width, height, contextRef } = this.props;
return <PureCanvas contextRef={contextRef} style={{ width, height }} />;
}
}

////
/_ eslint-disable react/prop-types _/
import React from 'react';
import '../style/Canvas.css';

export default class PureCanvas extends React.Component {
shouldComponentUpdate() {
return true;
}

resize = () => {
this.forceUpdate();
// eslint-disable-next-line react/destructuring-assignment
};

render() {
const { contextRef, style } = this.props;

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    return (
      <canvas
        width={width}
        height={height}
        style={style}
        ref={node => (node ? contextRef(node.getContext('2d')) : null)}
      />
    );

}
}

/////

/_ eslint-disable react/destructuring-assignment _/
/_ eslint-disable react/prop-types _/
import React from 'react';
import '../style/Canvas.css';
import Canvas from './Canvas';
import Circle from './figures/Circle';
// import nextCircleFrame from './MoveController';

export default class GraphCanvas extends React.Component {
constructor(props) {
super(props);

    this.state = {
      circles: this.createCircles(props.nodes, window.innerWidth)
    };
    this.saveContext = this.saveContext.bind(this);
    this.updateAnimationState = this.updateAnimationState.bind(this);
    this.arrangeLine = this.arrangeLine.bind(this);
    this.saveContext = this.saveContext.bind(this);

}

componentDidMount() {
this.rAF = requestAnimationFrame(this.updateAnimationState);
}

componentWillReceiveProps(nextProps) {
// You don't have to do this check first, but it can help prevent an unneeded render
this.setState({
circles: this.createCircles(nextProps.nodes, window.innerWidth)
});
}

componentWillUnmount() {
cancelAnimationFrame(this.rAF);
}

updateAnimationState() {
// this.setState(prevState => ({
// circle: nextCircleFrame(prevState.circle, window.innerWidth)
// }));
this.rAF = requestAnimationFrame(this.updateAnimationState);
}

createCircles(nodes, width) {
const nodesId = Object.keys(nodes);
const number = nodesId.length;
const size = width / (number _ Math.PI _ 1.5);
const fixedSize = size < 16 ? 16 : size;
return nodesId.reduce((acc, i) => {
const node = nodes[i];
const { id } = node;
const circle = new Circle(
0,
0,
0,
0,
fixedSize > 40 ? 40 : fixedSize,
id
);
return [...acc, circle];
}, []);
}

arrangeLine() {
// const { circles } = this.state;
// const { radius } = circles[0];
// const canvasWidth = parseInt(this.ctx.canvas.style.width, 10);
// const canvasHeight = parseInt(this.ctx.canvas.style.height, 10);
// const detla = radius _ 2.5;
// const length = circles.length _ detla - detla;
// const center = canvasWidth / 2;
// const begin = center - length / 2;
// let prev = begin;
// const newCircles = circles.map(circle => {
// circle.setX(prev);
// circle.setY(canvasHeight / 2);
// prev = circle.x + circle.radius \* 2.5;
// return circle;
// });
// console.log(newCircles);
// this.setState({ circles: newCircles });
}

saveContext(ctx) {
this.ctx = ctx;
}

render() {
const width = window.innerWidth;
const height = window.innerHeight / 2;
return (
<Canvas
        circles={this.state.circles}
        contextRef={this.saveContext}
        ctx={this.ctx}
        width={width}
        height={height}
        arrangeLine={this.arrangeLine}
      />
);
}
}
