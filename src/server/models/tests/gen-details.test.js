const mongoose = require('mongoose');
const dbHandler = require('./db-handler.js');

const { Race } = require('../race.js');
const { CharClass } = require('../char-class.js');
const { GenDetails } = require('../gen-details.js');

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('General Details Model Unit Tests', () => {
    it('should create a genDetail & save succesfully', async() => {
        const testName = 'Alfie';
        const testClass = 'Cleric';
        const testRace = 'Human';

        const validGenDet = new GenDetails({
            name: testName,
            class: new CharClass({
                name: testClass
            }),
            race: new Race({
                name: testRace
            })
        });
        
        const savedGenDet = await validGenDet.save();

        expect(savedGenDet._id).toBeDefined();
        expect(savedGenDet.name).toBe(testName);
        expect(savedGenDet.race.name).toBe(testRace);
        expect(savedGenDet.class.name).toBe(testClass);
    });

    it('should create a genDetail with NAME ONLY & save succesfully', async() => {
        const testName = 'Alfie';

        const validGenDet = new GenDetails({
            name: testName,
        });
        
        const savedGenDet = await validGenDet.save();

        expect(savedGenDet._id).toBeDefined();
        expect(savedGenDet.name).toBe(testName);
        expect(savedGenDet.race).toBeUndefined();
        expect(savedGenDet.class).toBeUndefined();
    });

     it('should fail if name is missing', async() => {
        const invalidGenDet = new GenDetails();
        
        let err;
        try {
            await invalidGenDet.save();
        } catch(error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
     });
});