import shuffle from './shuffle.js';

function randomCheck(testDataArray, testFunction) {
  const cacheResult = []
  let correct = 0;
  const testArray = [];

  for ( let i = 0; i <= 50; i++) {
    const result = testFunction(testDataArray);

    if (cacheResult.includes(result[0])) {
      testArray.push('matching integer');
    } else {
      cacheResult.push(result[0])
    }

    if (result[0] !== testDataArray[0]) {
      correct +=1
    }
  }

  return { cacheResult, correct }
}

test('randomCheck catches unchanged array', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  function returnArray(testArray){
    return testArray;
  }

  const { cacheResult, correct } = randomCheck(array, returnArray);

  expect(cacheResult.length).toBe(1)
  expect(correct <= 5).toBe(true)
})

test('array is shuffled in some regard', () =>{
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const { correct, cacheResult } = randomCheck(array, shuffle);


  expect(correct >= 45).toBe(true);
  expect(cacheResult.length <= 10).toBe(true);
})
