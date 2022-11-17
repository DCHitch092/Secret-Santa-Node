import shuffle from './shuffle.js';
import findShortestList from './findShortestList.js';
import runTests from './runTests.js';
import filterParticipants from './filterParticipants.js';
import determineSituation from './determineSituation.js';
import findOwnerIndex from './findOwnerIndex.js';

export default function allocate (owners, unfilteredParticipants) {
  // model participant:
  // { "_id", "name", "type": "dog", "wants": [ "_id"}],"__v": 0 },

  // model owner:
  // { "_id", "name", "email", "__v": 0},

  const participants = filterParticipants(unfilteredParticipants, owners);

  const dataChecks = {
    lastEvent: 'dataChecks object created',
    shuffleOnLoop: true,
    everyLoopCount: 0,
    dealCount: 0,
    loopCount: 0,
    errorCount: 0,
    resetCount: 0,
    remaining: participants.length,
    resolved: false,
    testsPassed: false,
    testsResults: {
      noTestsRun: true
    },
    previousGiftBuyer: "none given",
    previousGiftReceiver: "none given",
    nextGiftBuyer: "none given",
    nextGiftReceiver: "none given",
    resultsLength: { owners: false, owner1: false, owner2: false}
  }

  function updateDataChecks(key, value){
    dataChecks[key] = value;
    switch(key){
      case 'testResults':
        dataChecks.lastEvent = 'Test Results Obtained'
      break;
      default:
        dataChecks.lastEvent = `Updated ${key} as ${JSON.stringify(value)}`
    }
    logAction();

    return;
  }

  function updateResultsLength(){
    const preparedObject = {
      owners: results.length,
      owner1: results[0]?.picks?.length,
      owner2: results[1]?.picks?.length
    }
    updateDataChecks('resultsLength', preparedObject)
    dataChecks.lastEvent = `New entry added to result`
    logAction();
  }

  const results = [];
  // updateDataChecks('resultsLength', results.length)
  updateResultsLength();

  function init(){
    const buyers = shuffle(participants)
    const receivers = shuffle(participants)

    owners.forEach((owner) => {
      results.push({
        owner: owner.name,
        picks: [] })
    })

    updateResultsLength();
    return { buyers, receivers }
  }

  function hashItOut(number){

    const array = [];
    for(let i = 0; i < number; i++){
      array.push('#')
    }

    return array.join('');
  }

  function prepareResultsArray(){
    // empty array
    results.length = 0;

    owners.forEach((owner) => {
      results.push({
        owner: owner.name,
        picks: []
      })
    })
  }

  function renderLoopLog(data){
    const totalWidth = 100;
    const oneEntrySide = 40;
    const twoEntrySide = 30;
    const threeEntrySide = 15;

    if (process.env.NODE_ENV.toUpperCase() === "DEV") {
    console.log('')
    console.log(hashItOut(totalWidth))
    console.log(hashItOut(oneEntrySide),
    "participants: ",
    participants.length,
    hashItOut(oneEntrySide))
    console.log(
      hashItOut(twoEntrySide),
      'LOOPS total:',
      data.everyLoopCount,
      'L: ',
      data.loopCount,
      ' | D: , ',
      data.dealCount,
      hashItOut(twoEntrySide))

    console.log(
      hashItOut(twoEntrySide),
       'PREV: buyer: ',
       data.resultsLength,
       ' | receiver: , ',
       data.dealCount,
       hashItOut(twoEntrySide))

    console.log(
      hashItOut(twoEntrySide),
      'RESULTS: owners: ',
      data.resultsLength ,
      ' | D: , ',
      data.dealCount,
      hashItOut(twoEntrySide))

    console.log(
      hashItOut(oneEntrySide),
      'Latest Event: ',
      data.lastEvent,
      hashItOut(oneEntrySide)
    )
  }
  }

  function addToResult(owner_index, gift_buyer, gift_receiver) {
    const preparedObject = {
      gift_buyer,
      gift_receiver
    }

    results[owner_index].picks.push(preparedObject);
    updateDataChecks('previousGiftBuyer', gift_buyer);
    updateDataChecks('previousGiftReceiver', gift_receiver);
    updateResultsLength();

    const buyersIndex = buyers.indexOf(gift_buyer);
    const receiversIndex = receivers.indexOf(gift_receiver);


    buyers.splice(buyersIndex, 1)
    receivers.splice(receiversIndex, 1)

    dataChecks.lastEvent = `Attempted to remove ${buyers[buyersIndex]} from buyers list at index ${buyersIndex}`
    dataChecks.lastEvent = `Attempted to remove ${receivers[receiversIndex]} from buyers list at index ${receiversIndex}`
    logAction();
  }

  function forceShuffle(reason) {
    dataChecks.shuffleOnLoop = true;
    dataChecks.lastEvent = `Shuffle requested due to ${reason}`
    logAction();
  }

  function logAction(){

    if (process.env.NODE_ENV.toUpperCase() === "DEV") {
        console.log(dataChecks.lastEvent);
    }

  }

  function reset(){
    buyers = shuffle(participants)
    receivers = shuffle(participants)

    prepareResultsArray();

    dataChecks.loopCount = 0;
    updateDataChecks('resetCount', dataChecks.resetCount + 1);
    dataChecks.lastEvent = "Resetting decks"
  }

  let { buyers, receivers } = init();

  function loopCheck(){
    if (dataChecks.loopCount > (participants.length *3)) {
      dataChecks.lastEvent = `Loop count ${dataChecks.loopCount} is too high`;
      logAction();
      return true;
    }

    if (dataChecks.everyLoopCount >= 400) {
      dataChecks.lastEvent = `Total Loop count ${dataChecks.everyLoopCount} is too high`;
      logAction();
      return true;
    }
  }

  while(!dataChecks.resolved){
    renderLoopLog(dataChecks);

    updateDataChecks('loopCount', dataChecks.loopCount + 1);
    updateDataChecks('everyLoopCount', dataChecks.everyLoopCount + 1);

    const breakLoop = loopCheck();


    if(breakLoop){
      dataChecks.resolved = true;
      break;
    }

    if (dataChecks.shuffleOnLoop){

      buyers = shuffle(buyers);
      receivers = shuffle(receivers);
      dataChecks.shuffleOnLoop = false;
      dataChecks.lastEvent = `Shuffled deck`;
      logAction();

      updateDataChecks("nextGiftBuyer", buyers[0]);
      updateDataChecks("nextGiftReceiver", receivers[0]);

      logAction();
    }

    // run tests
    if(dataChecks.loopCount >= 1 && dataChecks.testsPassed === false){
      const { testResults, testsPassed } = runTests(participants, results, 'running tests... ')
      updateDataChecks('testsPassed', testsPassed)
      updateDataChecks('testResults', testResults)

    // specific actions for different errors
    //   if( dataChecks.testResults?.participantArrayHasData === false) {
    //     // remedy for no data;
    //     break;
    //   }
    //   if( dataChecks.testResults?.resultArrayHasData === false) {
    //
    //     continue;
    //   }
    //   if( dataChecks.testResults?.arraysEqual === false) {
    //     // remedy for no data;
    //     continue;
    //   }
      if( dataChecks.testResults?.ownerIncludedAsGiftBuyer === false) {

        owners.forEach((owner, index) => {
          if (buyers.includes(owner)) {
            const buyersIndex = buyers.indexOf(owner);
            buyers.splice(buyersIndex, 1);
            buyers.unshift(owner)

            dataChecks.lastEvent = "forcing owner to be picked as buyer early"

          }
        })

        // remedy for no data;
        // reset();
        // continue;
      }
    //   if( dataChecks.testResults?.noOwnersGiftToThemselves === false) {
    //     // remedy for no data;
    //     continue;
    //   }
    //   if( dataChecks.testResults?.noParticipantsGiftToThemselves === false) {
    //     // remedy for no data;
    //     continue;
    //   }
      if( dataChecks.testResults?.allParticipantsAreBuying === false) {

        // if only 1 buyer left and they are the same, reset
        if(buyers.length === 1 && receivers.length === 1 && (buyers[0] === receivers[0])) {
          reset();
          continue;
        }
      }
    //     // remedy for no data;
    //     continue;
    //   }
    //   if( dataChecks.testResults?.allParticipantsAreReceiving === false) {
    //     // remedy for no data;
    //     continue;
    //   }
    }

    if(dataChecks.testsPassed){
      updateDataChecks('resolved', true)
      break;
    }

    // Now, for this loop, attempt to add a match

    if (buyers.length === 0 && receivers.length === 0 && (participants.length === (results[0].picks.length + results[1].picks.length))) {

      dataChecks.lastEvent = "No-one left to allocate. Reset required"
      logAction();
      dataChecks.lastEvent = JSON.stringify(results);
      logAction();
      // reset()
      break;
    }


    let newBuyer = buyers[0];
    let newReceiver = receivers[0];
    const shortestListIndex = findShortestList(results);
    const shortestListOwner = results[shortestListIndex].owner;
    updateDataChecks('lastEvent', `Shortest list is index at ${shortestListIndex}, for ${shortestListOwner}`)

    const situation = determineSituation(newBuyer, newReceiver, shortestListOwner, owners, buyers.length);

    switch(situation){
      case "SHUFFLE":
      forceShuffle();
      break;

      case "FORCE BUYER TO BUY":
      const buyerIndex = findOwnerIndex(results, newBuyer);
      addToResult(buyerIndex, newBuyer, newReceiver);
      break;

      case "FORCE RECEIVER TO BUY":
      const receiverIndex = findOwnerIndex(results, newReceiver);
      dataChecks.lastEvent = `Swapping receiver (${newReceiver})and buyer(${newBuyer}). New owner index is now, ${receiverIndex}`
      logAction();
      updateDataChecks( 'nextGiftBuyer', receivers[0])
      updateDataChecks( 'nextGiftReceiver', buyers[0])
      addToResult(receiverIndex, newReceiver, newBuyer);
      break;

      case "RESET":
      reset();
      break;

      case "DEFAULT":
      addToResult(shortestListIndex, newBuyer, newReceiver);
      break;
    }


    // if (owners.includes(newBuyer)) {
    //
    //   // i.e. the gift giver is an owner
    //
    //
    // } else if (newBuyer === newReceiver) {
    // // i.e. they are the same person
    //   updateDataChecks('lastEvent', `newBuyer ${newBuyer} is also the new Receiver, ${newReceiver}` )
    //   forceShuffle();
    //   updateDataChecks('lastEvent', 'breaking loop, buyers and receivers the same');
    //   continue;
    //
    // } else if (shortestListOwner === newReceiver){
    //     updateDataChecks('lastEvent', `Shortest list can't be used, as the receiver ${newReceiver}was the list owner ${shortestListOwner}`)
    //
    //     forceShuffle()
    //     continue;
    //
    // } else {
    //   // this is the case where no issues appear to have taken place.
    //   addToResult(shortestListIndex, newBuyer, newReceiver);
    // }

    updateDataChecks( 'nextGiftBuyer', buyers[0])
    updateDataChecks( 'nextGiftReceiver', receivers[0])

  }
  return {results, testsPassed: dataChecks.testsPassed};
}
