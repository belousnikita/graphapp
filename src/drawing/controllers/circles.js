import Circle from '../figures/Circle';

const createCircles = (ctx, nodes) => {
  const nodesId = Object.keys(nodes);
  return nodesId.reduce((acc, i) => {
    const node = nodes[i];
    const { id } = node;
    const circle = new Circle(0, 0, 0, 0, 0, id);
    const size = circle.getScaledSize(ctx, nodesId.length);
    circle.setSize(size);
    return [...acc, circle];
  }, []);
};

const resize = (ctx, circles) =>
  circles.map(circle => {
    const size = circle.getScaledSize(ctx, circles.length);
    circle.setSize(size);
    return circle;
  });

const arrangeLine = (ctx, circles) => {
  const { radius } = circles[0];

  const style = getComputedStyle(ctx.canvas);
  const canvasWidth = parseInt(style.getPropertyValue('width'), 10);
  const canvasHeight = parseInt(style.getPropertyValue('height'), 10);

  const detla = radius * 2.5;
  const length = circles.length * detla - detla;
  const center = canvasWidth / 2;
  const begin = center - length / 2;
  let prev = begin;
  const newCircles = circles.map(circle => {
    circle.setX(prev);
    circle.setY(canvasHeight / 2);
    prev = circle.x + circle.radius * 2.5;
    return circle;
  });
  return { circles: newCircles };
};

export { createCircles, arrangeLine, resize };
