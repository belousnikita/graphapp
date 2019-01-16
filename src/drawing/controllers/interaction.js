const getMousePos = (ctx, evt) => {
  const { canvas } = ctx;
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX, // - rect.left) * scaleX, // scale mouse coordinates after they have
    y: evt.clientY - rect.top //* scaleY // been adjusted to be relative to element
  };
};
const interact = (ctx, evt, action) => {
  const pos = getMousePos(ctx, evt);
  action(pos);
};
const applyDrag = (ctx, pos, dragged) => {
  const style = getComputedStyle(ctx.canvas);
  const width = parseInt(style.getPropertyValue('width'), 10);
  const height = parseInt(style.getPropertyValue('height'), 10);

  if (pos.x + dragged.radius > width) {
    dragged.setX(width - dragged.radius);
  } else if (pos.x - dragged.radius < 0) {
    dragged.setX(0 + dragged.radius);
  } else {
    dragged.setX(pos.x);
  }
  if (pos.y + dragged.radius > height) {
    dragged.setY(height - dragged.radius);
  } else if (pos.y - dragged.radius < 0) {
    dragged.setY(0 + dragged.radius);
  } else {
    dragged.setY(pos.y);
  }
  dragged.setColor('dragged');
};

const getDistance = (pos1, pos2) =>
  Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);

export { getMousePos, interact, getDistance, applyDrag };
