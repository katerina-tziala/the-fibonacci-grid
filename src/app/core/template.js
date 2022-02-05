const TEMPLATE_VALUE_ANGOR = '%';

export function generate(templateString, content = {}) {
  const template = document.createElement('template');
  template.innerHTML = updateTemplateString(templateString, content);
  return template.content.cloneNode(true);
}

export function updateTemplateString(templateString, content = {}) {
  for (const [key, value] of Object.entries(content)) {
    const templateReference = getValueReference(key);
    templateString = replaceTemplateValueReference(templateString, templateReference, value);
  }
  return templateString;
}

function getValueReference(param) {
  return `${TEMPLATE_VALUE_ANGOR}${param}${TEMPLATE_VALUE_ANGOR}`;
}

function replaceTemplateValueReference(template, refValue, value) {
  const templateParts = template.split(refValue);
  return templateParts.join(value);
}
