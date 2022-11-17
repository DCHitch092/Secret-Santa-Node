import dealParticipants from './dealParticipants.js'

test('dealCount increases when dealt', () => {
  var participants = ["tom"]
  var owners = [{ name: "tom"}]
  var dealCount = 0;
  const result = dealParticipants(participants, owners, dealCount )
  expect(result.dealCount).toBe(0)
})

test('participants are dealt', () => {
  var participants = ["tom", "gary", "steve"]
  var owners = [{ name: "tom"}]
  var dealCount = 0;
  const result = dealParticipants(participants, owners, dealCount )
  expect(result.buyers.length).toBe(3)
  expect(result.receivers.length).toBe(3)
})

test('results array is prepped', () => {
  var participants = ["tom", "gary", "steve"]
  var owners = [{ name: "tom"}]
  var dealCount = 0;
  const result = dealParticipants(participants, owners, dealCount )
  expect(result.resultsArray.length).toBe(1)
})
