'use strict';
import { GridTile } from '../grid-tile/@grid-tile.module';

/**
 * Generates the tiles for the minefield
 * @param {number} rows - rows of the grid 
 * @param {number} columns - columns of the grid 
 * @returns {Object} { byPosition, byRow, byColumn } - an object with the required maps indexed byPosition, byRow, byColumn
 */
export function generateGridTiles(rows, columns) {
  const byPosition = new Map();
  const byRow = new Map();
  const byColumn = new Map();

  for (let row = 1; row <= rows; row++) {
    const tilesOfRow = generateRowTiles(row, columns);
    byRow.set(row, tilesOfRow);

    tilesOfRow.forEach(tile => {
      const columnTiles = byColumn.get(tile.column) || [];
      byPosition.set(tile.position, tile);
      byColumn.set(tile.column, [...columnTiles, tile]);
    });
  }
  return { byPosition, byRow, byColumn };
}

/**
 * Generates the tiles for the row
 * @param {number} row - row of the grid for which the tiles are generated
 * @param {number} gridColumns - columns of the grid 
 * @returns {Array} rowTiles - an array of all the tiles in the row
 */
function generateRowTiles(row, gridColumns) {
  const rowTiles = [];
  for (let column = 1; column <= gridColumns; column++) {
    const position = generatePosition(row, column, gridColumns);
    rowTiles.push(new GridTile(position, row, column));
  }
  return rowTiles;
}

function getRowIndex(rowIndex, gridColumns) {
  return (rowIndex - 1) * gridColumns;
}

function generatePosition(row, column, gridColumns) {
  const rowIndex = getRowIndex(row, gridColumns);
  return rowIndex + column;
}
