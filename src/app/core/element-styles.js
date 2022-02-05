'use strict';

export function addStyleClass(element, className) {
  if (element && className) {
    element.classList.add(className);
  }
}

export function removeStyleClass(element, className) {
  if (element && className) {
    element.classList.remove(className);
  }
}


export function setHeight(element, height = 0) {
  if (element) {
    element.style.height = `${height}px`;
  }
}