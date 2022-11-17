export default function findShortestList (arrayOfObjects) {

  if (arrayOfObjects.length === 0){
    console.log('not enough data')
    return false;
  }

  console.log('findShortestList',
  arrayOfObjects[0].owner, ": ", arrayOfObjects[0].picks.length,
  arrayOfObjects[1].owner, ": ", arrayOfObjects[1].picks.length )
  function compareNumbers(a, b){
    return a.length - b.length;
  }

  const lengths = arrayOfObjects.map((object, index) => {
    return { length: object.picks.length, index }
  })

  // console.log('findShortestList lengths', lengths)
  lengths.sort(compareNumbers);
  // console.log('findShortestList sorted lengths', lengths)
  return lengths[0].index;
}
