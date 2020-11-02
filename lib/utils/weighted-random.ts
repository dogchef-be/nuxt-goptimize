/**
 * Author: Brandon Mills
 * Source: https://github.com/btmills/weighted-random
 */

export function weightedRandom(weights: number[]) {
  var totalWeight = 0,
    i,
    random;

  for (i = 0; i < weights.length; i++) {
    totalWeight += weights[i];
  }

  random = Math.random() * totalWeight;

  for (i = 0; i < weights.length; i++) {
    if (random < weights[i]) {
      return i;
    }

    random -= weights[i];
  }

  return -1;
}
