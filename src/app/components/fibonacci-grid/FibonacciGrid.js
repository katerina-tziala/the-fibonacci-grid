'use strict';
import { Component } from 'CORE';
import { Arrays } from 'UTILITIES';
import * as Canvas from 'CANVAS';

import * as GridUtils from './grid-utils/@grid-utils.module';
import { TileDrawing } from './grid-tile/@grid-tile.module';

import STYLES from './fibonacci-grid.styles.scss';
import { COLORS_INDEX, TEMPLATE, DOM_ELEMENT_CLASS } from './fibonacci-grid.constants';

const SEQUENCE_LENGTH = 5;
const ROWS = 50;
const COLUMNS = 50;
const REPAINT_TIMEOUT = 400;

export class FibonacciGrid extends Component {
  #displayRatio = window.devicePixelRatio || 1;
  #canvas;
  #ctx;
  #tilesByPosition = new Map();
  #tilesByRow = new Map();
  #tilesByColumn = new Map();
  #onClick = this.#onSelectTile.bind(this);
  #repaintTimeout;
  #pallette = {};

  constructor() {
    super();
    this.setStyles(STYLES);
  }

  connectedCallback() {
    this.#setPallete();
    this.setTemplate(TEMPLATE);
    const width = GridUtils.calculateCanvasSize(ROWS);
    const height = GridUtils.calculateCanvasSize(COLUMNS);
    this.#canvas = Canvas.setResolution(this.getElementByClass(DOM_ELEMENT_CLASS.canvasField), width, height, this.#displayRatio);
    this.#ctx = this.#canvas?.getContext('2d');
    this.init();
    this.#addClickListener();
  }

  disconnectedCallback() {
    clearTimeout(this.#repaintTimeout);
  }

  init() {
    const { byPosition, byRow, byColumn } = GridUtils.generateGridTiles(ROWS, COLUMNS);
    this.#tilesByPosition = byPosition;
    this.#tilesByRow = byRow;
    this.#tilesByColumn = byColumn;
    this.#drawTiles(Array.from(this.#tilesByPosition.values()));
  }

  #setPallete() {
    const documentStyle = getComputedStyle(document.documentElement);
    for (const [key, value] of Object.entries(COLORS_INDEX)) {
      this.#pallette[key] = documentStyle.getPropertyValue(value).trim();
    }
  }

  #addClickListener() {
    this.#canvas?.addEventListener('click', this.#onClick);
  }

  #removeClickListener() {
    this.#canvas?.removeEventListener('click', this.#onClick);
  }

  #onSelectTile(event) {
    const { x, y } = this.#getCoordinatesOnCanvas(event);
    const tile = this.#getTileByCoordinates(x, y);
    this.#updateTiles(tile);
    const customEvent = new CustomEvent('onStarted', { detail: true });
    this.dispatchEvent(customEvent);
  }

  #getCoordinatesOnCanvas(event) {
    const { clientX, clientY } = event;
    const { left, top } = event.target.getBoundingClientRect();
    const canvasX = clientX - left;
    const canvasY = clientY - top;
    return {
      x: canvasX * this.#displayRatio,
      y: canvasY * this.#displayRatio
    };
  }

  #getTileByCoordinates(x, y) {
    if (!this.#ctx) {
      return;
    }
    const tiles = Array.from(this.#tilesByPosition.values());
    return tiles.find(tile => this.#ctx.isPointInPath(tile.path, x, y));
  }

  #updateTiles(tileReference) {
    const tilesInRow = this.#tilesByRow.get(tileReference.row);
    const tilesInColumn = this.#tilesByColumn.get(tileReference.column);
    const tilesToUpdate = Arrays.unique([...tilesInRow, ...tilesInColumn]);
    tilesToUpdate.forEach(tile => tile.increaseValue());
    this.#drawHighlightedTiles(tilesToUpdate);
    this.#removeClickListener();
    this.#setRepaintTimeout(() => {
      this.#drawTiles(tilesToUpdate);
      this.#checkFibonacciSequence();
    });
  }

  #checkFibonacciSequence() {
    const sequencessInRows = GridUtils.extractFibbonacciSequencesFromMap(this.#tilesByRow, SEQUENCE_LENGTH);
    const sequencessInColumns = GridUtils.extractFibbonacciSequencesFromMap(this.#tilesByColumn, SEQUENCE_LENGTH);
    const sequences = [...sequencessInRows, ...sequencessInColumns];
    if (!sequences.length) {
      this.#addClickListener();
      return;
    }

    this.#extractPoints(sequences);
    sequences.forEach(sequenceTiles => this.#drawHighlightedTiles(sequenceTiles, this.#pallette.sequence));
    this.#setRepaintTimeout(() => this.#resetSequences(sequences));
  }

  #resetSequences(sequences = []) {
    sequences.forEach(sequenceTiles => {
      sequenceTiles.forEach(tile => tile.resetValue());
      this.#drawTiles(sequenceTiles);
    });
    this.#addClickListener();
  }

  #setRepaintTimeout(callBack) {
    this.#repaintTimeout = setTimeout(() => {
      clearTimeout(this.#repaintTimeout);
      callBack();
    }, REPAINT_TIMEOUT);
  }

  #extractPoints(sequences = []) {
    const tiles = Arrays.flatten(sequences);
    const points = GridUtils.calculatePoints(tiles);
    const event = new CustomEvent('onPoints', { detail: points });
    this.dispatchEvent(event);
  }

  #drawTiles(tiles = []) {
    tiles.forEach(tile => this.#drawTile(tile));
  }

  #drawTile(tile) {
    TileDrawing.drawTile(this.#ctx, tile, this.#pallette.background, this.#pallette.color);
  }

  #drawHighlightedTiles(tiles = [], color = this.#pallette.highlight) {
    tiles.forEach(tile => {
      this.#drawTile(tile);
      TileDrawing.drawHighlightedTile(this.#ctx, tile, color);
    });
  }

}

customElements.define('app-fibonacci-grid', FibonacciGrid);