export default class Arrow {
  constructor(
    fromNodeId,
    toNodeId,
    id,
    color = '#006494',
    arrowHeadRadius = 14
  ) {
    this.fromNodeId = String(fromNodeId);
    this.toNodeId = String(toNodeId);
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;
    this.circleRadius = 0;
    this.id = String(id);
    this.color = String(color);
    this.arrowHeadRadius = arrowHeadRadius;
  }
  setFrom(pos) {
    this.x1 = pos.x;
    this.y1 = pos.y;
  }
  setTo(pos) {
    this.x2 = pos.x;
    this.y2 = pos.y;
  }
  setCircleRadius(radius) {
    this.circleRadius = radius;
  }
  drawDefault(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineWidth = 5;
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.restore();
    ctx.save();

    const radius = this.arrowHeadRadius;
    const to = { x: this.x2, y: this.y2 };
    const from = { x: this.x1, y: this.y1 };

    const x_center = to.x;
    const y_center = to.y;

    let angle;
    let x;
    let y;

    ctx.beginPath();

    angle = Math.atan2(to.y - from.y, to.x - from.x);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    ctx.moveTo(x, y);

    angle += (2.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    angle += (2.0 / 3.0) * (2 * Math.PI);
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  drawIndeslf(ctx) {
    const halfRadius = this.circleRadius / 2;
    const quartRadius = this.circleRadius / 4;
    const style = getComputedStyle(ctx.canvas);
    const canvasWidth = parseInt(style.getPropertyValue('width'), 10);
    const canvasHeight = parseInt(style.getPropertyValue('height'), 10);
    const middle = {
      x: canvasWidth / 2,
      y: canvasHeight / 2
    };

    let xShift = (middle.x - this.x1) * 0.2;
    let yShift = (middle.y - this.y1) * 0.2;

    xShift =
      xShift > quartRadius
        ? halfRadius
        : xShift < -quartRadius
          ? -halfRadius
          : xShift;
    yShift =
      yShift > quartRadius
        ? halfRadius
        : yShift < -quartRadius
          ? -halfRadius
          : yShift;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(
      this.x1 - xShift,
      this.y1 - yShift,
      this.circleRadius,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.restore();
  }
  draw(ctx) {
    if (this.fromNodeId === this.toNodeId) {
      this.drawIndeslf(ctx);
    }
    this.drawDefault(ctx);
  }
}
