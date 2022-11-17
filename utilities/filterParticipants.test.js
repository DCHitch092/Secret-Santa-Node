import setupDB from './setupDB.js';
import filterParticipants from './filterParticipants.js';
import { Owner } from '../models/owner.js';
import { Participant } from '../models/participant.js';

setupDB("test");

const owners = ["mary", "joseph"]

test('removes undefined from array', () => {
  const array = ["a", 1, undefined, true, {}]
  const filteredArray = filterParticipants(array, owners);

  expect(array.length).toBe(5)
  expect(filteredArray.length).toBe(4)
})

test('returns array divisible by 2', () => {
  const array = [1, 2, 3]
  const filteredArray = filterParticipants(array, owners);

  expect(filteredArray.length).toBe(4)
})

test('returns valid array as is', () => {
  const array = ["a", "b"]
  const filteredArray = filterParticipants(array, owners);

  expect(filteredArray.length).toBe(2)
})

test('removes undefined from array with objects', () => {
  // FULL OBJECT TESTS
  const owner1 = new Owner({
    "name": "mary",
    "email": "fahitch@gmail.com"
  });

  const owner2 = new Owner({
    "name": "joseph",
    "email": "fahitch@gmail.com"
  });

  const fullOwners = [owner1, owner2];

  const participant1 = new Participant(
    { "name": "Peter", "type": "disciple", "wants": [{ "name": "World Peace"	}]})
  const participant2 = new Participant(
    { "name": "John", "type": "disciple", "wants": [{ "name": "Jesus to be his pal"	}]})
  const participant3 = new Participant(
    { "name": "Judas", "type": "disciple", "wants": [{ "name": "Silver"	}]})
  const participant4 = new Participant(
    { "name": "Mary Magdalene", "type": "disciple", "wants": [{ "name": "Jesus to be her you know who"	}]})
  const array = [participant1, participant2, undefined, participant3, participant4]
  const filteredArray = filterParticipants(array, fullOwners);

  expect(array.length).toBe(5);
  expect(filteredArray.length).toBe(4);

})

test('returns array divisible by 2', () => {
  const owner1 = new Owner({
    "name": "mary",
    "email": "fahitch@gmail.com"
  });

  const owner2 = new Owner({
    "name": "joseph",
    "email": "fahitch@gmail.com"
  });

  const fullOwners = [owner1, owner2];

  const participant1 = new Participant(
    { "name": "Peter", "type": "disciple", "wants": [{ "name": "World Peace"	}]})
  const participant2 = new Participant(
    { "name": "John", "type": "disciple", "wants": [{ "name": "Jesus to be his pal"	}]})
  const participant3 = new Participant(
    { "name": "Judas", "type": "disciple", "wants": [{ "name": "Silver"	}]})
  const array = [participant1, participant2, participant3]
    const filteredArray = filterParticipants(array, fullOwners)

  expect(filteredArray.length).toBe(4)
})

test('returns valid array as is', () => {
  const owner1 = new Owner({
    "name": "mary",
    "email": "fahitch@gmail.com"
  });

  const owner2 = new Owner({
    "name": "joseph",
    "email": "fahitch@gmail.com"
  });

  const fullOwners = [owner1, owner2];

  const participant1 = new Participant(
    { "name": "Peter", "type": "disciple", "wants": [{ "name": "World Peace"	}]})
  const participant2 = new Participant(
    { "name": "John", "type": "disciple", "wants": [{ "name": "Jesus to be his pal"	}]})
  const array = [participant1, participant2]
    const filteredArray = filterParticipants(array, fullOwners);

  expect(filteredArray.length).toBe(2)
})
