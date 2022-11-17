export default function initialise () {
  // create empty, editable results array;
  let results = [];

  // define outcome as our loop variable
  let outcome = false;

  // create empty 'decks' that can be dealt into
  let buyers = [];
  let receivers = [];
  let remaining = 100;
  let errorCount = 0;
  let loopCount = 0;
  let dealCount = 0;
  let resetCount = 0;
  let testsPassed = false;

  return { results, remaining, outcome,buyers, receivers, errorCount,loopCount,dealCount, testsPassed, resetCount}
}
