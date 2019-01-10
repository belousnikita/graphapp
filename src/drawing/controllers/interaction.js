const getMousePos = (ctx, evt) => {
  const { canvas } = ctx;
  const rect = canvas.getBoundingClientRect();
  // abs. size of element

  const scaleX = canvas.width / rect.width;
  // relationship bitmap vs. element for X

  const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY // been adjusted to be relative to element
  };
};
const interact = (ctx, evt, action) => {
  // console.log(`evt: ${evt.type}`);
  const pos = getMousePos(ctx, evt);
  // console.log(`at pos: ${pos.x} ${pos.y}`);
  action(pos);
};
const getDistance = (pos1, pos2) =>
  Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);

export { getMousePos, interact, getDistance };
