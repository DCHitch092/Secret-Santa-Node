import { Participant } from '../models/participant.js';

export default function filterParticipants(list, list2) {
  // model participant:
  // { "_id", "name", "type": "dog", "wants": [ "_id"}],"__v": 0 },

  // model owner:
  // { "_id", "name", "email", "__v": 0},


  const filteredList = list.filter((item) => {return item !== undefined})

  if (filteredList.length % list2.length !== 0) {
    const spare = new Participant({name: "spare"})
    spare.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });
    
    filteredList.push(spare);
    return filteredList;
  }

  return filteredList;
}
