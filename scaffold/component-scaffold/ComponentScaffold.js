'use strict';
import { Component } from 'CORE';

import STYLES from './component-scaffold.styles.scss';
import { ATTRIBUTES, TEMPLATE, DOM_ELEMENT_CLASS } from './component-scaffold.constants';
// const OBSERVED_ATTR = Object.values(ATTRIBUTES);

export class ComponentScafold extends Component {

  constructor() {
    super();
  }

  /**
   * Set the attributes to watch for changes
   */
  // static get observedAttributes() {
  //   return OBSERVED_ATTR;
  // }

  connectedCallback() {
    this.setStyles(STYLES);
    this.setTemplate(TEMPLATE);
  }

  disconnectedCallback() {}

}

customElements.define('app-component-scafold', ComponentScafold);