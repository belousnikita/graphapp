/* eslint-disable no-param-reassign */
export default class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw = ctx => {
    const context = ctx;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = '#0e8c82';
    context.fillStyle = '#0e8c82';
    context.stroke();
    context.fill();
  };
}
