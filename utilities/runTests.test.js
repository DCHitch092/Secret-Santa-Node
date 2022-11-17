import runTests from './runTests';

const loopString = "generic test string";

test('any failed tests are handled', () => {
  const participants = [ 'Tom', 'Dick', 'Harry'];
  const resultArray = [{
    owner:'Tom',
    picks: [{ gift_buyer: "Tom", gift_receiver: "Tom"}]
  },
  {
    owner:'Tom',
    picks: [{ gift_buyer: "Dick", gift_receiver: "Harry"}]
  }]

  const result = runTests(participants, resultArray, loopString);

  expect(result.testsPassed).toBe(false);

})

test('empty participants are handled',()=> {
  const participants = [];
  const resultArray = [{
    owner:'Tom',
    picks: [{ gift_buyer: "Tom", gift_receiver: "Tom"}]
  }]

  const result = runTests(participants, resultArray, loopString);

  expect(result.testsPassed).toBe(false);

});

test('empty picks are handled',()=> {
  const participants = ["Tom", "Charles"];
  const resultArray = [{
    owner:'Tom',
    picks: []
  }]

  const result = runTests(participants, resultArray, loopString);

  expect(result.testsPassed).toBe(false);

});

test('no one allocated', () => {
  const participants = ["Tom", "Dick", "Harry", "dad", "mum"]
  const resultArray = [ { owner: 'dad', picks: [] }, { owner: 'mum', picks: [] }]
  const result = runTests(participants, resultArray, loopString);

  expect(result.testsPassed).toBe(false);
  expect(result.testResults.allParticipantsAreBuying).toBe(false);
  expect(result.testResults.allParticipantsAreReceiving).toBe(false);

})

test('early loop should continue', () => {
  const participants = ["elmo", "spare", "dad", "mum"];
  const resultArray = [{
    "owner":"dad",
    "picks":[{
      "gift_buyer": "elmo", "gift_receiver": "spare" }]},
    {"owner": "mum",
    "picks": []}]

  const result = runTests(participants, resultArray, loopString);

  expect(result.testsPassed).toBe(false);
  expect(result.testResults.hasOwnProperty("noOwnersGiftToThemselves")).toBe(false);
})

// noOwnersGiftToThemselves: false,
// noParticipantsGiftToThemselves: false,
// allParticipantsAreBuying: false,
// allParticipantsAreReceiving: false
//
// "elmo"
// Updated previousGiftReceiver as "spare"
//
// dad


// [{"owner":"dad","picks":[{"gift_buyer":"te-tina","gift_receiver":"peechy-pu"},{"gift_buyer":"peechy-pu","gift_receiver":"betulla"},{"gift_buyer":"bonnie","gift_receiver":"tina"},{"gift_buyer":"timmy","gift_receiver":"bonnie"},{"gift_buyer":"chumchi","gift_receiver":"bangina louise"},{"gift_buyer":"tina","gift_receiver":"te-tina"},{"gift_buyer":"betulla","gift_receiver":"spare"},
//
// {"gift_buyer":"chumbo","gift_receiver":"mum"}]},{"owner":"mum","picks":[{"gift_buyer":"mum","gift_receiver":"chumbo"},{"gift_buyer":"spare","gift_receiver":"chichipu"},{"gift_buyer":"elmo","gift_receiver":"chumchi"},{"gift_buyer":"dad","gift_receiver":"teena"},{"gift_buyer":"chichipu","gift_receiver":"elmo"},{"gift_buyer":"pipichu","gift_receiver":"timmy"},{"gift_buyer":"bangina louise","gift_receiver":"dad"},{"gift_buyer":"teena","gift_receiver":"pipichu"}]}]
//
//
// ownerIncludedAsGiftBuyer: false,
// noOwnersGiftToThemselves: false,
// noParticipantsGiftToThemselves: false
