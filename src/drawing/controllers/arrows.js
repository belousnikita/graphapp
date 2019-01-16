import Arrow from '../figures/Arrow';

const createArrows = (ctx, nodes) => {
  const idS = Object.keys(nodes);
  return idS.reduce((acc, id) => {
    const node = nodes[id];
    const connects = node.connectsTo;
    const arrows = connects.map(
      connectionID => new Arrow(id, connectionID, id)
    );
    return arrows.length > 0 ? { ...acc, [id]: arrows } : acc;
  }, {});
};
const getIntersection = (x1, y1, x2, y2, circleRadius, arrowHeadRadius = 0) => {
  const line = (k, x, b) => k * x + b;

  const k = (y2 - y1) / (x2 - x1);

  const b = (y2 * x1 - y1 * x2) / (x1 - x2) + (k * x2 - y2);

  const D =
    Math.pow(2 * b * k, 2) +
    4 *
      (1 + Math.pow(k, 2)) *
      (Math.pow(circleRadius + arrowHeadRadius, 2) - Math.pow(b, 2));

  const X1 = (-2 * b * k - Math.sqrt(D)) / (-2 * (1 + Math.pow(k, 2)));

  const Y1 = line(k, X1, b);

  const X2 = (-2 * b * k + Math.sqrt(D)) / (-2 * (1 + Math.pow(k, 2)));

  const Y2 = line(k, X2, b);

  return x1 >= x2 ? { x: X1 + x2, y: Y1 + y2 } : { x: X2 + x2, y: Y2 + y2 };
};
const connectArrows = (ctx, arrows, circles) => {
  const idS = Object.keys(arrows);
  idS.forEach(nodeId => {
    const nodeArrows = arrows[nodeId];
    nodeArrows.forEach(arrow => {
      const from = arrow.fromNodeId;
      const to = arrow.toNodeId;

      const fromCircle = circles[from];
      const toCircle = circles[to];

      const fromPos = {
        x: fromCircle.x,
        y: fromCircle.y
      };
      const toPos = getIntersection(
        fromCircle.x,
        fromCircle.y,
        toCircle.x,
        toCircle.y,
        toCircle.radius,
        arrow.arrowHeadRadius
      );
      arrow.setFrom(fromPos);
      arrow.setTo(toPos);
      arrow.setCircleRadius(toCircle.radius);
    });
  });
  return arrows;
};
export { createArrows, connectArrows };
