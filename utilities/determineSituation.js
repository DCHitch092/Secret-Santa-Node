export default function determineSituation(buyer, receiver, determinedOwner, possibleOwners, remainingAllocations) {
  let responseLog = "";
  let response = "";

  scenarios: if (buyer === receiver) {
    response = "SHUFFLE"
    responseLog = "Buyer and receiver the same"

    if(remainingAllocations === 1) {
      response = "RESET"
      responseLog = "Final allocation is itself"

    }
      break scenarios;
  } else if ( buyer === determinedOwner ) {
    response = "DEFAULT"
    responseLog = "Buyer is the owner"
      break scenarios;
  } else if (receiver === determinedOwner) {
    response = "FORCE RECEIVER TO BUY"
    responseLog = "Receiver is the owner"
      break scenarios;
  } else if (possibleOwners.includes(buyer) && possibleOwners.includes(receiver)) {

      if(buyer === determinedBuyer){
        response = "DEFAULT"
        responseLog = "Buyer can be the owner"

      } else {
      response = "SHUFFLE"
      responseLog = "FORCE BUYER TO BUY"
    }
        break scenarios;
  } else if (possibleOwners.includes(buyer) && deteminedOwner !== buyer) {
    response = "FORCE BUYER TO BUY"
    responseLog = "Buyer is one of the owners"
      break scenarios;
  } else if (possibleOwners.includes(receiver)) {

    if(receiver === determinedOwner){
      response = "SHUFFLE"
      responseLog = "Receiver is the owner"
    } else  {
      response = "FORCE RECEIVER TO BUY"
      responseLog = "Receiver is one of the owners"
    }
      break scenarios;

  } else {
    response = "DEFAULT"
    responseLog = "No issues with pairing"
  }

  console.log(`%c${responseLog}`, "color:green")
  return response;

}
