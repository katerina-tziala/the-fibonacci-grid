'use strict';
import { Fibonacci } from 'UTILITIES';

export function extractFibbonacciSequencesFromMap(tilesMap, sequenceMatchingLength = 5) {
  const fibbonacciSequences = [];
  for (const tiles of tilesMap.values()) {
    extractFibbonacciSequence(tiles, fibbonacciSequences, sequenceMatchingLength);
  }
  return fibbonacciSequences;
}

function extractFibbonacciSequence(tiles, fibbonacciSequences = [], sequenceMatchingLength) {
  const maxIndex = tiles.length - sequenceMatchingLength;
  
  for (let index = 0; index <= maxIndex; index++) {
    const subSequent = tiles.slice(index, index + sequenceMatchingLength);
    const values = subSequent.map(tile => tile.value);
    const consecutiveFibo = Fibonacci.consecutiveNumbersInSequence(values);
   
    if (consecutiveFibo) {
      fibbonacciSequences.push(subSequent);
    }

  }
}

