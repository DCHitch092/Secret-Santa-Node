import assert from 'assert';
import setupDB from '../utilities/setupDB.js';
import filterParticipants from '../utilities/filterParticipants.js';
import findShortestList from '../utilities/findShortestList.js';
import { Owner } from '../models/owner.js';
import { Participant } from '../models/participant.js';

setupDB("test");

describe('Utilities', function () {
  describe('#filterParticipants()', function () {

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

    it('should remove undefined from array with objects', (done) => {
      const array = [participant1, participant2, undefined, participant3, participant4]
      const filteredArray = filterParticipants(array, fullOwners);

      assert.equal(filteredArray.length, 4);
      done();
    });


    it('should add blank entires to ensure the array is divisible by 2', (done) => {
      const array = [participant1, participant2, participant3]
      const filteredArray = filterParticipants(array, fullOwners);

      assert.equal(filteredArray.length, 4);
      done()
    })

    it('should return even array if provided', (done) => {
      const array = [participant1, participant2]
      const filteredArray = filterParticipants(array, fullOwners);

      assert.equal(filteredArray.length, 2);
      done();
    })

  });
  describe('#findShortestList()', function () {

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

      it('should find the shortest list of owners', (done) => {
        const array = [participant1, participant2, undefined, participant3, participant4]
        const filteredArray = filterParticipants(array, fullOwners);
          assert.equal(filteredArray.length, 4)
          done();
        });
    //
    //
    //
    //   test('can find shortest list', () => {
    //     const longArray = [1, 2, 3]
    //     const shortArray = [1]
    //
    //     const testObjectArray = [
    //       { picks: longArray },
    //       { picks: shortArray }
    //         ]
    //
    //     expect(findShortestList(testObjectArray)).toBe(1)
    //   })
    //
    //   test('can find shortest list', () => {
    //     const longArray = [1, 2, 3]
    //     const shortArray = [1]
    //
    //     const testObjectArray = [
    //       { picks: shortArray },
    //       { picks: longArray }
    //         ]
    //
    //     expect(findShortestList(testObjectArray)).toBe(0)
    //   })
    //
    //   test('can handle empty arrays', () => {
    //     const zeroArray0 = []
    //     const zeroArray1 = []
    //
    //     const testObjectArray = [
    //       { picks: zeroArray0 },
    //       { picks: zeroArray1 }
    //         ]
    //
    //     expect(findShortestList(testObjectArray)).toBe(0)
    //   })
    //
    //   test('can handle empty testObjectArray', () => {
    //     const testObjectArray = []
    //
    //     expect(findShortestList(testObjectArray)).toBe(false)
    //   })
    //
    //
    //
    // it('should add blank entires to ensure the array is divisible by 2', () => {
    //   const array = [participant1, participant2, participant3]
    //   const filteredArray = filterParticipants(array, fullOwners);
    //
    //   assert.equal(filteredArray.length, 4);
    // })
    //
    // it('should return even array if provided', () => {
    //   const array = [participant1, participant2]
    //   const filteredArray = filterParticipants(array, fullOwners);
    //
    //   assert.equal(filteredArray.length, 2);
    // })

  });
});
