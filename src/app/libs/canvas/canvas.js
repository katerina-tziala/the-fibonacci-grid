'use strict';
export function radians(angle = 0) {
  return angle * (Math.PI / 180);
}

export function setShadow(ctx, properties) {
  ctx.shadowColor = properties.shadowColor;
  ctx.shadowOffsetX = properties.offsetX || 0;
  ctx.shadowOffsetY = properties.offsetY || 0;
  ctx.shadowBlur = properties.blur || 0;
};

export function clearShadow(ctx) {
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
};

export function drawCenteredText(ctx, x, y, content, angle = 0, stroke = false) {
  const degrees = radians(angle);

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(x, y);
  ctx.rotate(degrees);
  ctx.fillText(content, 0, 0);
  if (stroke) {
    ctx.strokeText(content, 0, 0);
  }
  ctx.restore();
}
