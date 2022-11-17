import Tests from './tests';


// ///////////////////////////////
// // arrayHasData
// test('array is populated with data', )
// function arrayHasData(array) {
//   return array.length !== 0;
// }
//
// function objectHasData(object) {


///////////////////////////////////
// arrays Are The Same Length
test('array not provided is handled', () => {
  let array1;
  let array2;

  expect(Tests.arraysAreEqual(array1, array2)).toBe(false)
})

test('arrays of the zero length are valid', () =>{
  const array1 = []
  const array2 = []
  expect(Tests.arraysAreEqual(array1, array2)).toBe(true);
})

test('arrays of the same length are valid', () =>{
  const array1 = [1]
  const array2 = [2]
  expect(Tests.arraysAreEqual(array1, array2)).toBe(true);
})

test('arrays of the different lengths of only 1 are valid', () =>{
  const array1 = [1]
  const array2 = [2, 2]
  expect(Tests.arraysAreEqual(array1, array2)).toBe(true);
})

test('arrays of the different lengths exceeding 1 are not valid', () =>{
  const array1 = [1]
  const array2 = [2, 2, 3]
  expect(Tests.arraysAreEqual(array1, array2)).toBe(false);
})

///////////////////////////////////
// Test ownerIncludedAsGiftBuyer
test('result object includes the name of the owner as a buyer', () => {
  const object  =
    {
      owner: "Mitch",
      picks: [{ gift_buyer: "Mitch", gift_receiver: "John" }]
    }

  expect(Tests.ownerIncludedAsGiftBuyer(object )).toBe(true)
})

test('where result object  does not includes the name of the owner as a buyer', () => {
  const object = {
      owner: "John",
      picks: [{ gift_buyer: "Mitch", gift_receiver: "John" }]
    }

  expect(Tests.ownerIncludedAsGiftBuyer(object )).toBe(false)
})


test('where result object is empty', () => {
  const object = {
      owner: "John",
      picks: []
    }

  expect(Tests.ownerIncludedAsGiftBuyer(object)).toBe(false)
})

test('where no owner is provided', () => {
  const object = {
      picks: [{ gift_buyer: "John", gift_receiver: "John"}]
    }

  expect(Tests.ownerIncludedAsGiftBuyer(object)).toBe(false)
})

///////////////////////////////////
// Test noOwnersGiftToThemselves
test('when owners are not gifting to themselves', () =>{
  const object = {
      owner: "John",
      picks: [{ gift_buyer: "John", gift_receiver: "Mitch" }]
    }

  expect(Tests.noOwnersGiftToThemselves(object)).toBe(true)
})

test('when owners are gifting to themselves', () =>{
  const object = {
      owner: "John",
      picks: [{ gift_buyer: "Mitch", gift_receiver: "John" }]
    }

  expect(Tests.noOwnersGiftToThemselves(object)).toBe(false)
})

test('when no owner is provided', () =>{
  const object = {
      picks: [{ gift_buyer: "John", gift_receiver: "Mitch" }]
    }

  expect(Tests.noOwnersGiftToThemselves(object)).toBe(false)
})

test('where result object is empty', () => {
  const object = {
      owner: "John",
      picks: []
    }

  expect(Tests.noOwnersGiftToThemselves(object)).toBe(true)
})


test('early loop should continue', () => {
  const object = {
    "owner":"dad",
    "picks":[{
      "gift_buyer": "elmo",
      "gift_receiver": "spare" }]}

  expect(Tests.noOwnersGiftToThemselves(object)).toBe(true);
})


////////////////////////////////////
// Test noParticipantsGiftToThemselves
test('when participants do not gift to themselves', () =>{
  const object = {
      picks: [{ gift_buyer: "John", gift_receiver: "Mitch" }]
    }

  expect(Tests.noParticipantsGiftToThemselves(object)).toBe(true)
})

test('when participants gift to themselves', () =>{
  const object = {
      picks: [{ gift_buyer: "John", gift_receiver: "John" }]
    }

  expect(Tests.noParticipantsGiftToThemselves(object)).toBe(false)
})

test('where result object is empty', () => {
  const object = {
      owner: "John",
      picks: []
    }

  expect(Tests.noParticipantsGiftToThemselves(object)).toBe(false)
})

////////////////////////////////////
// Test allParticipantsAreBuying

test('where all pariticpants are buying', () => {
  const participants = ["John", "Mitch"]
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {
      owner: "Mitch",
      picks:[{gift_buyer: "Mitch", gift_receiver: "John"}]
  }

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(true);
})


test('where not all pariticpants are buying', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(false);
})

test('where no participants are given', () => {
  const participants = []
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(false);
})

test('where one result object is empty', () => {
  const participants = []
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(false);
})


test('where all result objects are empty', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {}
  const object2 = {}

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(false);
})

test('where all picks are empty', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {
    owner: "John",
    picks:[]
  }
  const object2 = {
    owner: "Sue",
    picks:[]
  }

  expect(Tests.allParticipantsAreBuying(participants, object1, object2)).toBe(false);
})



///////////////////////////////////
/// Test  allParticipantsAreReceiving

test('where all pariticpants are receiving', () => {
  const participants = ["John", "Mitch"]
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {
      owner: "Mitch",
      picks:[{gift_buyer: "Mitch", gift_receiver: "John"}]
  }

  expect(Tests.allParticipantsAreReceiving(participants, object1, object2)).toBe(true);
})


test('where not all pariticpants are receiving', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreReceiving(participants, object1, object2)).toBe(false);
})

test('where no participants are given', () => {
  const participants = []
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreReceiving(participants, object1, object2)).toBe(false);
})

test('where one result object is empty', () => {
  const participants = []
  const object1 = {
      owner: "John",
      picks:[{gift_buyer: "John", gift_receiver: "Mitch"}]
  }
  const object2 = {owner: "Sue",
  picks:[{gift_buyer: "Sue", gift_receiver: "Mitch"}]}

  expect(Tests.allParticipantsAreReceiving(participants, object1, object2)).toBe(false);
})


test('where all result objects are empty', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {}
  const object2 = {}

  expect(Tests.allParticipantsAreReceiving(participants, object1, object2)).toBe(false);
})

test('where all picks are empty', () => {
  const participants = ["John", "Mitch", "Sue"]
  const object1 = {
    owner: "John",
    picks:[]
  }
  const object2 = {
    owner: "Sue",
    picks:[]
  }

  expect( Tests.allParticipantsAreReceiving(participants, object1, object2) ).toBe(false);

})
