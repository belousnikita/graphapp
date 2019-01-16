/* eslint-disable no-param-reassign */
export default class Circle {
  constructor(
    x,
    y,
    radius,
    id,
    color = '#12bbad',
    defaultColor = '#12bbad',
    dragColor = '#0D8C82'
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.id = id;
    this.color = color;
    this.defaultColor = defaultColor;
    this.dragColor = dragColor;
    this.weight = 0;
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
    switch (color) {
      case 'default': {
        this.color = this.defaultColor;
        break;
      }
      case 'dragged': {
        this.color = this.dragColor;
        break;
      }
      default: {
        this.color = color;
      }
    }
  };

  getScaledSize(ctx, totalCount) {
    const style = getComputedStyle(ctx.canvas);
    const canvasWidth = parseInt(style.getPropertyValue('width'), 10);
    const size = canvasWidth / (totalCount * Math.PI * 0.8);
    const fixedSize = size < 16 ? 16 : size;
    return fixedSize > 40 ? 40 : fixedSize;
  }
  setWeight = weight => {
    this.weight = weight;
  };
}
