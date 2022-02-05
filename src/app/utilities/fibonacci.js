'use strict';
/**
 * Resources
  * https://www.geeksforgeeks.org/find-index-given-fibonacci-number-constant-time/
  * https://www.geeksforgeeks.org/check-whether-array-represents-a-fibonacci-series-or-not/
 */
export function consecutiveNumbersInSequence(numbersToCheck = []) {
  const quantity = numbersToCheck.length;
  if (!quantity) {
    return false;
  }
  return quantity === 1 ? inSequence(value) : numbersPartOfSequence(numbersToCheck);
}

function getFibonacciSequence(numberOfItems = 10, startN = 1) {
  const sequence = [];
  const endN = startN + numberOfItems;
  for (let index = startN; index < endN; index++) {
    sequence.push(fibonacci(index));
  }
  return sequence;
}

function fibonacci(n) {
  return n < 1 ? 0
    : n <= 2 ? 1
      : fibonacci(n - 1) + fibonacci(n - 2)
}

function findIndex(n) {
  const fibo = 2.078087 * parseFloat(Math.log(n)) + 1.672276;
  // Returning rounded off value of index
  return Math.round(fibo);
}

function inSequence(value) {
  const fibbonacciIndex = findIndex(value);
  const fibonacciValue = fibonacci(fibbonacciIndex);
  return fibonacciValue === value;
}


function numbersPartOfSequence(numbersToCheck = []) {
  const allNumbersInSequence = numbersToCheck.every(value => inSequence(value));
  if (!allNumbersInSequence) {
    return false;
  }
  return consecutiveSequenceNumbers(numbersToCheck);
}

function consecutiveSequenceNumbers(numbersToCheck = []) {
  const fiboStartN = findIndex(numbersToCheck[0]);
  if (fiboStartN > 2) {
    return consecutiveSequenceNumbersFromPosition(numbersToCheck, fiboStartN);
  }
  return consecutiveSequenceNumbersFromPosition(numbersToCheck, 1) || consecutiveSequenceNumbersFromPosition(numbersToCheck, 2);
}

function consecutiveSequenceNumbersFromPosition(numbersToCheck = [], startIndex) {
  const matchingNumbers = getFibonacciSequence(numbersToCheck.length, startIndex);
  return matchingNumbers.every((fiboNumber, index) => fiboNumber === numbersToCheck[index]);
}