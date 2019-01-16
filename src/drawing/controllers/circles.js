import Circle from '../figures/Circle';

const createCircles = (ctx, nodes) => {
  const nodesId = Object.keys(nodes);
  return nodesId.reduce((acc, i) => {
    const node = nodes[i];
    const { id } = node;
    const circle = new Circle(0, 0, 0, id);
    const size = circle.getScaledSize(ctx, nodesId.length);
    circle.setSize(size);
    return { ...acc, [id]: circle };
  }, {});
};

const resize = (ctx, circles) => {
  const idS = Object.keys(circles);
  idS.forEach(id => {
    const circle = circles[id];
    const size = circle.getScaledSize(ctx, idS.length);
    circle.setSize(size);
  });
};

const arrangeLine = (ctx, circles) => {
  const { radius } = circles[1];

  const style = getComputedStyle(ctx.canvas);
  const canvasWidth = parseInt(style.getPropertyValue('width'), 10);
  const canvasHeight = parseInt(style.getPropertyValue('height'), 10);

  const idS = Object.keys(circles);
  const k = 2.5;
  const detla = radius * k;
  const length = idS.length * detla - detla;
  const center = canvasWidth / 2;
  const begin = center - length / 2;

  let prev = begin;
  return idS.reduce((acc, id) => {
    const circle = circles[id];
    const shift = circle.id % 2 === 0 ? canvasHeight / 3 : -canvasHeight / 3;
    circle.setX(prev);
    circle.setY(canvasHeight / 2 + shift);
    prev = circle.x + circle.radius * k;
    return { ...acc, [id]: circle };
  }, {});
};

export { createCircles, arrangeLine, resize };
