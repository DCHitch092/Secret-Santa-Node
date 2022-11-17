import findShortestList from './findShortestList.js';

test('can find shortest list', () => {
  const longArray = [1, 2, 3]
  const shortArray = [1]

  const testObjectArray = [
    { picks: longArray },
    { picks: shortArray }
      ]

  expect(findShortestList(testObjectArray)).toBe(1)
})

test('can find shortest list', () => {
  const longArray = [1, 2, 3]
  const shortArray = [1]

  const testObjectArray = [
    { picks: shortArray },
    { picks: longArray }
      ]

  expect(findShortestList(testObjectArray)).toBe(0)
})

test('can handle empty arrays', () => {
  const zeroArray0 = []
  const zeroArray1 = []

  const testObjectArray = [
    { picks: zeroArray0 },
    { picks: zeroArray1 }
      ]

  expect(findShortestList(testObjectArray)).toBe(0)
})

test('can handle empty testObjectArray', () => {
  const testObjectArray = []

  expect(findShortestList(testObjectArray)).toBe(false)
})
