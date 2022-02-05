'use strict';

export function setResolution(canvas, width, height, ratio) {
  if (!canvas) {
    return;
  }
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = width + "px";
  canvas.style.height = width + "px";
  canvas.getContext("2d")?.scale(ratio, ratio);
  return canvas;
}