import initialise from './initialise';

test('everything initialises', ( ) => {

  let {loopCount, errorCount, dealCount, outcome, results, buyers, receivers,testsPassed} = initialise()

  expect(loopCount).toBe(0)
  expect(typeof loopCount).toBe("number")
  expect(errorCount).toBe(0)
  expect(typeof errorCount).toBe("number")
  expect(dealCount).toBe(0)
  expect(typeof dealCount).toBe("number")
  expect(outcome).toBe(false)
  expect(typeof outcome).toBe("boolean")
  expect(results).toStrictEqual([])
  expect(Array.isArray(results)).toBe(true)
  expect(buyers).toStrictEqual([])
  expect(Array.isArray(buyers)).toBe(true)
  expect(receivers).toStrictEqual([])
  expect(Array.isArray(receivers)).toBe(true)
  expect(testsPassed).toBe(false)
  expect(typeof testsPassed).toBe("boolean")

})
