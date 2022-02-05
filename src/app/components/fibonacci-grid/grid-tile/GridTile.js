'use strict';
import { GRID_TILE_CONFIG } from './grid-tile.config';

export class GridTile {
  #position = 0;
  #row = 0;
  #column = 0;
  #value = 0;
  #center = { x: 0, y: 0 };
  #area = { xStart: 0, xEnd: 0, yStart: 0, yEnd: 0 };
  #path = new Path2D();

  constructor(position, row, column) {
    this.#position = position;
    this.#row = row;
    this.#column = column;

    const [xStart, xEnd] = this.#getGridArea(column);
    const [yStart, yEnd] = this.#getGridArea(row);
    this.#area = { xStart, xEnd, yStart, yEnd };
    this.#center = this.#getCenter(xStart, yStart);
    this.#path = this.#getPath(this.#area);
  }

  get position() {
    return this.#position;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  get center() {
    return this.#center;
  }

  get value() {
    return this.#value;
  }

  get path() {
    return this.#path;
  }

  increaseValue() {
    this.#value++;
  }

  resetValue() {
    this.#value = 0;
  }

  /**
   * Returns the area that the tile occupies on the grid
   * @param {number} gridPosition : row (for the vertical area) or column (for the horizontal area) on the grid
   * @returns {Array} [] : the start and end values of the area on the grid
   */
  #getGridArea(gridPosition) {
    const size = GRID_TILE_CONFIG.size;
    const normalizedPosition = gridPosition - 1;
    const start = (normalizedPosition * size) + gridPosition;
    const end = start + size;
    return [start, end];
  }

  #getCenter(xStart, yStart) {
    const halfSize = GRID_TILE_CONFIG.size / 2;
    const x = xStart + halfSize;
    const y = yStart + halfSize;
    return { x, y };
  }

  #getPath(area) {
    const { xStart, xEnd, yStart, yEnd } = area;
    const path = new Path2D();
    // check rect
    path.moveTo(xStart, yStart);
    path.lineTo(xEnd, yStart);
    path.lineTo(xEnd, yEnd);
    path.lineTo(xStart, yEnd);
    path.lineTo(xStart, yStart);
    return path;
  }

}
