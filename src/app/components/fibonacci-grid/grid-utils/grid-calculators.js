'use strict';
import { GRID_TILE_CONFIG } from '../grid-tile/@grid-tile.module';

export function calculateCanvasSize(value = 0) {
  if (!value) return 0;
  const addition = GRID_TILE_CONFIG.spacing + value;
  return (value * GRID_TILE_CONFIG.size) + addition;
}

export function calculatePoints(tiles = []) {
  return tiles.reduce((total, tile) => {
    return total + tile.value;
  }, 0);
}
