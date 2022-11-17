import Tests from './tests.js'


export default function runTests(participants, resultArray, loopString){


  console.log('begin tests', participants.length)
  const prefix = `${loopString}: `;
  const testResults = {}

  // check data exists to work with
  if ( !Tests.arrayHasData(participants) ) {
    console.log(prefix, 'participant data empty');
    testResults["participantArrayHasData"] = false;
  }

  if ( !Tests.arrayHasData(resultArray) ) {
    console.log(prefix, 'participant data empty');
    testResults["resultArrayHasData"] = false;
  }

  // If difference between array lengths is 1 or less
  if ( !Tests.arraysAreEqual(resultArray[0]?.picks,  resultArray[1]?.picks) ) {
    console.log(prefix, "Arrays were not equal")
    testResults["arraysEqual"] = false;
  }

  if ( !Tests.ownerIncludedAsGiftBuyer(resultArray[0]) ) {
    console.log(prefix, "Owner 1 not included as a gift buyer")
      testResults["ownerIncludedAsGiftBuyer"] = false;
  }

  if ( !Tests.ownerIncludedAsGiftBuyer(resultArray[1]) ) {
    console.log(prefix, "Owner 2 not included as a gift buyer")
    testResults["ownerIncludedAsGiftBuyer"] = false;
  }

  if ( !Tests.noOwnersGiftToThemselves(resultArray[0]) ) {
    console.log(prefix, "Owner 1 is a gift receiver for themselves")
    testResults["noOwnersGiftToThemselves"] = false;
  }

  if ( !Tests.noOwnersGiftToThemselves(resultArray[1]) ) {
    console.log(prefix, "Owner 2 is a gift receiver for themselves")
    testResults["noOwnersGiftToThemselves"] = false;
  }

  if ( !Tests.noParticipantsGiftToThemselves(resultArray[0]) ) {
    console.log(prefix, "Owner 1 has picks that gift to themselves")
    testResults["noParticipantsGiftToThemselves"] = false;
  }

  if ( !Tests.noParticipantsGiftToThemselves(resultArray[1]) ) {
    console.log(prefix, "Owner 2 has picks that gift to themselves")
    testResults["noParticipantsGiftToThemselves"] = false;
  }

  if ( !Tests.allParticipantsAreBuying(participants, resultArray[0], resultArray[1]) ){
    console.log(prefix, "Some participants are missing as gift buyers")
    testResults["allParticipantsAreBuying"] = false;
  }

  if ( !Tests.allParticipantsAreReceiving(participants, resultArray[0], resultArray[1]) ){
    console.log(prefix, "Some participants are missing as gift receivers")
    testResults["allParticipantsAreReceiving"] = false;
  }

  console.log(prefix, "all checks complete")
  console.log(prefix, 'testResults', testResults);
  const testsPassed = !Object.values(testResults).includes(false)
  return { testResults, testsPassed };
}
