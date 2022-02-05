'use strict';
import { Component, ElementUtils } from 'CORE';
import '../fibonacci-grid/FibonacciGrid';

import STYLES from './fibonacci-board.styles.scss';
import { TEMPLATE, DOM_ELEMENT_CLASS } from './fibonacci-board.constants';

export class FibonacciBoard extends Component {
  #grid;
  #restartBtn;
  #pointsHolder;
  #points = 0;

  constructor() {
    super();
    this.setStyles(STYLES);
  }

  connectedCallback() {
    this.setTemplate(TEMPLATE);
    this.#pointsHolder = this.getElementByClass(DOM_ELEMENT_CLASS.pointsHolder);
    this.#grid = this.getElementByClass(DOM_ELEMENT_CLASS.grid);
    this.#restartBtn = this.getElementByClass(DOM_ELEMENT_CLASS.restartBtn);
    this.#grid.addEventListener('onStarted', (event) => this.#setButtonDisabled(!event.detail));
    this.#grid.addEventListener('onPoints', this.#onPoints.bind(this));
    this.#restartBtn.addEventListener('click', this.#onRestart.bind(this));
  }

  #onRestart() {
    this.#points = 0;
    this.#setButtonDisabled(false);
    this.#setDisplayedPoints();
    this.#grid.init();
  }

  #onPoints(event) {
    const pointsToAdd = event.detail;
    this.#points = this.#points + pointsToAdd;
    this.#setDisplayedPoints();
  }

  #setButtonDisabled(disabled) {
    ElementUtils.setDisabled(this.#restartBtn, disabled);
  }

  #setDisplayedPoints() {
    ElementUtils.setContent(this.#pointsHolder, this.#points);
  }

}

customElements.define('app-fibonacci-board', FibonacciBoard);