import allocate from './allocate.js';
import runTests from './runTests.js';
import shuffle from './shuffle.js';

export default function generateValidResult(owners, compiledParticipants){

  // const participants = compiledParticipants.map((item) => item.name.toLowerCase());
  const participants = compiledParticipants;
  console.log('begin with', participants.length, participants)

  const { results, tests_passed } = allocate(owners, participants);

    if (tests_passed == false) {
      return false;
    }

    if ( tests_passed ) {
        console.log('result', results);
        tests_incomplete = false;
        return results;
      }

    return results

  }


  // model participant:
  // {
	// 	"_id": "636ce36991bae9b58d084650",
	// 	"name": "Peechy-Pu",
	// 	"type": "dog",
	// 	"wants": [
	// 		{
	// 			"_id": "636ce36991bae9b58d084653"
	// 		},
	// 		{
	// 			"_id": "636ce36991bae9b58d084654"
	// 		}
	// 	],
	// 	"__v": 0
	// },

  // model owner:
  // {
	// 	"_id": "636c38c9ed0395bf9d3605b5",
	// 	"name": "dad",
	// 	"email": "fahitch@gmail.com",
	// 	"__v": 0
	// },
