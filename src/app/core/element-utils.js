
export function clearContent(element) {
  setContent(element, '');
}

export function setContent(element, content = '') {
  if (element) {
    element.innerHTML = content;
  }
}

export function setDisabled(element, disabled = true) {
  if (element) {
    element.disabled = disabled;
    element.setAttribute('aria-disabled', disabled);
  }
}