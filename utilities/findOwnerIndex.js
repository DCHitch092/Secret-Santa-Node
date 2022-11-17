export default function findOwnerIndex(array, name) {
  // arrayModel [{ owner: String, picks: Array }]
  let returnIndex = -1;

  array.forEach(
    (owner, index) => {
      if (owner.owner === name) {
        returnIndex = index
      }
    }
  )

  return returnIndex;

}
