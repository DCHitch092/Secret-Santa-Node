import determineSituation from './determineSituation.js';

const owners = ["Tom", "Dick"]

test('no issues', () => {
  const buyer = "Harry"
  const receiver = "John"

  expect(determineSituation(buyer, receiver, owners[0], owners, 2)).toBe("DEFAULT")
})

test('buyer is receiver', () => {
  const buyer = "Harry"
  const receiver = "Harry"

  expect(determineSituation(buyer, receiver, owners[0], owners, 2)).toBe("SHUFFLE")
})

test('buyer is owner', () => {
  const buyer = "Tom"
  const receiver = "Harry"

  expect(determineSituation(buyer, receiver, owners[0], owners, 2)).toBe("DEFAULT")
})

test('receiver is owner', () => {
  const buyer = "Harry"
  const receiver = "Tom"

  expect(determineSituation(buyer, receiver, owners[0], owners, 2)).toBe("FORCE RECEIVER TO BUY")
})

test('owner is found as owner, other owner is also receiver', () => {
  const buyer = "Dick"
  const receiver = "Tom"

  expect(determineSituation(buyer, receiver, owners[0], owners, 2)).toBe("FORCE RECEIVER TO BUY")
})
