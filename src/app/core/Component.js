'use strict';
import * as Template from './template';

export class Component extends HTMLElement {
  #attributeHandler = new Map();

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal && this.#attributeHandler.has(attrName)) {
      this.#attributeHandler.get(attrName)();
    }
  }

  setAttributeHandler(attrName, handlerFunction) {
    this.#attributeHandler.set(attrName, handlerFunction);
  }

  removeAttributeHandler(attrName, handlerFunction) {
    this.#attributeHandler.delete(attrName, handlerFunction);
  }

  setStyles(styles, className = 'styles') {
    if (styles) {
      const style = document.createElement('style');
      style.textContent = styles;
      style.className = className;
      this.shadowRoot.prepend(style);
    }
  }

  generateTemplateElement(templateString, content = {}) {
    return Template.generate(templateString, content);
  }

  setTemplate(templateString, content = {}) {
    const template = this.generateTemplateElement(templateString, content);
    this.shadowRoot.appendChild(template);
  }

  getElementByClass(className) {
    return this.shadowRoot.querySelector(`.${className}`);
  }

  connectedCallback() {}

  disconnectedCallback() {}

}
