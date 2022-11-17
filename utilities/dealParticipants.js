export default function dealParticipants(participants, owners, dealCount) {

  const buyers = participants;
  const receivers = participants;
  const resultsArray = []

  owners.forEach((owner) =>{
    resultsArray.push({
      owner: owner.name.toLowerCase(),
      picks: []
    })
  })

  dealCount += 0;

  return { buyers, receivers, resultsArray, dealCount }
}
