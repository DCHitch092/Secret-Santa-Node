import { Owner } from '../models/owner.js';
// import { Participant } from '../models/participant.js';
import assert from 'assert';
import setupDB from '../utilities/setupDB.js';

setupDB("test");

describe('Models', () => {
  describe('Owner', () => {

    let owner;
    beforeEach((done) => {
        owner = new Owner({ name: 'Freddo', email: 'longjohnsilver@gmail.cum' });
        owner.save()
            .then(() => done());
    });

    it('should create a new owner', (done) => {

      owner.save() // returns a promise after some time
        .then(() => {
          //if the newOwner is saved in db and it is not new
          assert(!owner.isNew);
          done();
        });
    });


    it('should find a given owner based on their name', (done) => {

      owner.save()
        .then(() => {
          Owner.findOne({ name: 'Freddo' })
            .then((owner) => {
              assert(owner.name === 'Freddo');
              done();
            });
        });
    })

    it('should remove an Owner using its instance', (done) => {

      owner.save()
        .then(() => {
          Owner.deleteOne()
            .then(() => Owner.findOne({ name: 'Freddo'}))
            .then((owner) => {
                assert(owner === null);
                done();
          });
        });
      });

    it('should remove an owner it can find by name', (done) => {

      owner.save()
        .then(() => {
          Owner.findOneAndRemove({ name: 'Freddo' })
              .then(() => Owner.findOne({ name: 'Freddo' }))
              .then((owner) => {
                  assert(owner === null);
                  done();
              });
          });
      });



    it('should remove an owner using its id', (done) => {

      owner.save().then(() => {
        Owner.findByIdAndRemove(owner._id)
        .then(() => Owner.findOne({ name: 'Freddo' }))
        .then((owner) => {
          assert(owner === null);
          done();
        });
      });
    });

    function updateHelper(assertion, done) {
      assertion
        .then(() => Owner.find({}))
        .then((owners) => {
            assert(owners.length === 1);
            assert(owners[0].name === 'Updated Freddo');
            done();
        });
    }

    it('should set and save an owner using an instance', (done) => {
        // Not yet updated in MongoDb
        owner.set('name', 'Updated Freddo');
        updateHelper(owner.save(), done);
    });

    it('should update an owner using its instance', (done) => {
        updateHelper(owner.updateOne({ name: 'Updated Freddo' }), done);
    });

  });
  // describe('Want', () => {

    let want;
    beforeEach((done) => {
        want = new Want({ name: 'Freddo', email: 'longjohnsilver@gmail.cum' });
        want.save()
            .then(() => done());
    });

    it('should create a new want', (done) => {

      want.save() // returns a promise after some time
        .then(() => {
          //if the newWant is saved in db and it is not new
          assert(!want.isNew);
          done();
        });
    });


    it('should find a given want based on their name', (done) => {

      want.save()
        .then(() => {
          Want.findOne({ name: 'Freddo' })
            .then((want) => {
              assert(want.name === 'Freddo');
              done();
            });
        });
    })

    it('should remove an Want using its instance', (done) => {

      want.save()
        .then(() => {
          Want.deleteOne()
            .then(() => Want.findOne({ name: 'Freddo'}))
            .then((want) => {
                assert(want === null);
                done();
          });
        });
      });

    it('should remove an want it can find by name', (done) => {

      want.save()
        .then(() => {
          Want.findOneAndRemove({ name: 'Freddo' })
              .then(() => Want.findOne({ name: 'Freddo' }))
              .then((want) => {
                  assert(want === null);
                  done();
              });
          });
      });



    it('should remove an want using its id', (done) => {

      want.save().then(() => {
        Want.findByIdAndRemove(want._id)
        .then(() => Want.findOne({ name: 'Freddo' }))
        .then((want) => {
          assert(want === null);
          done();
        });
      });
    });

    function updateHelper(assertion, done) {
      assertion
        .then(() => Want.find({}))
        .then((wants) => {
            assert(wants.length === 1);
            assert(wants[0].name === 'Updated Freddo');
            done();
        });
    }

    it('should set and save an want using an instance', (done) => {
        // Not yet updated in MongoDb
        want.set('name', 'Updated Freddo');
        updateHelper(want.save(), done);
    });

    it('should update an want using its instance', (done) => {
        updateHelper(want.updateOne({ name: 'Updated Freddo' }), done);
    });

  });
});
