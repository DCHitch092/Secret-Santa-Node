import findOwnerIndex from './findOwnerIndex.js';

const array = [{ owner: "John", picks: []}, { owner: "Tom", picks: []}]
test('can find index', () => {
  const name = "John"

  expect(findOwnerIndex(array, name)).toBe(0)
})

test('can handle no result', () => {
  const name = "Fox"

  expect(findOwnerIndex(array, name)).toBe(-1)
})
