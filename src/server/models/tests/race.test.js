const mongoose = require('mongoose');
const dbHandler = require('./db-handler.js');

const { Race } = require('../race.js');

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Race Model Unit Tests', () => {
    it('should create a charClass & save succesfully', async() => {
        const testName = 'Gnome';
        const validRace = new Race({
            name: testName
        });
        
        const savedRace = await validRace.save();

        expect(savedRace._id).toBeDefined();
        expect(savedRace.name).toBe(testName);
    });

     it('should fail if class is not in accepted list', async() => {
        const invalidRace = new Race({
            name: 'Lumiere'
        });
        
        let err;
        try {
            await invalidRace.save();
        } catch(error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
     });

     it('should fail if name is missing', async() => {
        const invalidRace = new Race();
        
        let err;
        try {
            await invalidRace.save();
        } catch(error) {
            err = error;
        }

        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
     });
});