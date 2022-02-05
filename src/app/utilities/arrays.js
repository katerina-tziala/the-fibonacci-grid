'use strict';

export function unique(arrayToCheck = []) {
  return Array.from(new Set(arrayToCheck));
}

export function flatten(array) {
  return [].concat(...array);
};
