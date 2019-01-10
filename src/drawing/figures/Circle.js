/* eslint-disable no-param-reassign */
export default class Circle {
  constructor(x, y, dx, dy, radius, id, color = '#12bbad') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.id = id;
    this.color = color;
  }

  draw = ctx => {
    const fontSize = this.radius * 1.1;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();

    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.fillText(this.id, this.x, this.y + fontSize * 0.045);
  };

  setX = x => {
    this.x = x;
  };

  setY = y => {
    this.y = y;
  };

  setSize = size => {
    this.radius = size;
  };

  setColor = color => {
    this.color = color;
  };

  getScaledSize(ctx, totalCount) {
    const style = getComputedStyle(ctx.canvas);
    const canvasWidth = parseInt(style.getPropertyValue('width'), 10);
    const size = canvasWidth / (totalCount * Math.PI * 1.5);
    const fixedSize = size < 16 ? 16 : size;
    return fixedSize > 40 ? 40 : fixedSize;
  }
}
