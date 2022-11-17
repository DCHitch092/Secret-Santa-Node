function arrayHasData(array) {
  return array.length !== 0;
}

function objectHasData(object) {
  return Object.values(object).length !== 0;
}

// checks if two lists are of similar lengths
function arraysAreEqual(array1, array2) {
  if (Array.isArray(array1) !== true) { return false };
  if (Array.isArray(array2) !== true) { return false };

  const difference = array1?.length - array2?.length;
  // returns true if absolute difference between lengths is 1
  return Math.abs(difference) <= 1;
}

// Checks that the owner is responsible for gifting the gift they are buying
function ownerIncludedAsGiftBuyer(object){
  if (typeof object !== "object") { return false };
  if (typeof object.picks !== "object") { return false };
  if (object.picks.length === 0) { return false };

  const arrayOfGiftBuyers = object.picks.map((item) => {
    return item.gift_buyer;
  })

  // returns true if owner is listed as a gift buyer in list
  return arrayOfGiftBuyers.includes(object.owner)
}

// Checks that the owner is not receiving in their own list
function noOwnersGiftToThemselves(object) {
  if (typeof object !== "object") { return false };
  if (typeof object.picks !== "object") { return false };
  if (object.picks.length === 0) { return true };
    const arrayOfGiftReceivers = object.picks.map((item) => {
      return item.gift_receiver
    })

    // if no array owner given
    if (!object.owner) {
      console.log('no array owner given');
      return false
    }

    // no gift pairings in array
    if (arrayOfGiftReceivers.length === 0){
      console.log('not enough gift pairings to check');
      return true;
    }

    // Return true if owner is not listed as a gift receiver
    return !arrayOfGiftReceivers.includes(object.owner)
}

// Checks that buyers/gifters are unique
function noParticipantsGiftToThemselves (object) {
  if (typeof object !== "object") { return false };
  if (typeof object.picks !== "object") { return false };
  if (object.picks.length === 0) { return false };

  const checkArray = object.picks.map((pairing) => {
    return pairing.gift_buyer == pairing.gift_receiver
  })

  if (object.picks.length === 0){
    console.log('the given list of picks is too short to test')
    return false;
  }

  // Return true if checkArray contains no positive matches
  return !checkArray.includes(true)
}

// Checks each participant is giving a gift
function allParticipantsAreBuying( participants, list1, list2 ){
  if (typeof participants !== "object") { return false };
  if (participants.length === 0) { return false };

  if (typeof list1 !== "object") { return false };
  if (typeof list1.picks !== "object") { return false };
  if (list1.picks.length === 0) { return false };

  if (typeof list2 !== "object") { return false };
  if (typeof list2.picks !== "object") { return false };
  if (list2.picks.length === 0) { return false };

  // ensures data is not empty
  if ((participants.length === 0) | (list1.picks?.length === 0) | (list2.picks?.length === 0)) {
    console.log('Tests.allParticipantsAreBuying data not enough')
    return false
  }

  const allGiftBuyers = {};
  list1.picks?.forEach(entry => allGiftBuyers[entry.gift_buyer] = true)
  list2.picks?.forEach(entry => allGiftBuyers[entry.gift_buyer] = true)

  const result = participants.filter((value) => {
    return !allGiftBuyers[value]
  })

  return result.length === 0;
}

// Checks each participant is receiving a gift
function allParticipantsAreReceiving( participants, list1, list2 ){
  if (typeof participants !== "object") { return false };
  if (participants.length === 0) { return false };

  if (typeof list1 !== "object") { return false };
  if (typeof list1.picks !== "object") { return false };
  if (list1.picks.length === 0) { return false };

  if (typeof list2 !== "object") { return false };
  if (typeof list2.picks !== "object") { return false };
  if (list2.picks.length === 0) { return false };

  // ensures data is not empty
  if ((participants.length === 0) | (list1.picks?.length === 0) | (list2.picks?.length === 0)) {
    console.log('Tests.allParticipantsAreReceiving data not enough')
    return false
  }
  const allGiftReceivers = {};
  list1.picks?.forEach(entry => allGiftReceivers[entry.gift_receiver] = true)
  list2.picks?.forEach(entry => allGiftReceivers[entry.gift_receiver] = true)

  const result = participants.filter((value, index ) => {
        return !allGiftReceivers[value];
    });

  return result.length === 0;
}

const Tests = {
  arrayHasData,
  objectHasData,
  arraysAreEqual,
  ownerIncludedAsGiftBuyer,
  noOwnersGiftToThemselves,
  noParticipantsGiftToThemselves,
  allParticipantsAreBuying,
  allParticipantsAreReceiving
}

export default Tests
