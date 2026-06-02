const mongoose = require('mongoose');
const dbHandler = require('./db-handler.js');

const { Bonus } = require('../bonus.js');

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Bonus Model Unit Tests', () => {
    it('should create a bonus & save succesfully', async() => {
        const testName = 'Heroic Inspiration';
        const validBonus = new Bonus({
            name: testName
        });
        
        const savedBonus = await validBonus.save();

        expect(savedBonus._id).toBeDefined();
        expect(savedBonus.name).toBe(testName);
    });

     it('should fail if class is not in accepted list', async() => {
        const invalidBonus = new Bonus({
            name: 'Lumiere'
        });
        
        let err;
        try {
            await invalidBonus.save();
        } catch(error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
     });

     it('should fail if name is missing', async() => {
        const invalidBonus = new Bonus();
        
        let err;
        try {
            await invalidBonus.save();
        } catch(error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
     });
});