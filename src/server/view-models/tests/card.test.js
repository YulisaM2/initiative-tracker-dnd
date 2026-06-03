const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); // Need to ensure cascading delete from card to characters

const dbHandler = require('../../models/tests/db-handler.js');
const { Character } = require('../../models/character.js');
const { Card } = require('../card.js');

// Db Setup
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

// Optional: Clean up collections between tests to keep them isolated
afterEach(async () => {
    await Character.deleteMany({});
    await Card.deleteMany({});
});


describe('Card Model Unit Tests', () => {
    it('should create a card & save succesfully', async() => {
        const testChar = new Character({ 
            genDetails: {
                name: 'Alfie'
            }
        });
        testChar.save();

        const testPos = {
            x: 1,
            y: 2,
        };
        const validCard = new Card({
            character: testChar._id,
            position: testPos
        });
        
        const savedCard = await validCard.save();

        expect(savedCard._id).toBeDefined();
        expect(savedCard.character).toMatchObject(testChar._id);
        expect(savedCard.position).toMatchObject(testPos);
    });

    it('should create an empty card & save succesfully', async() => {
        const validCard = new Card({ });
        
        const savedCard = await validCard.save();

        expect(savedCard._id).toBeDefined();
    });

    it('should delete card & character succesfully', async() => {
        const testChar = new Character({ 
            genDetails: {
                name: 'Alfie'
            }
        });
        testChar.save();


        const testCard = new Card({
            character: testChar._id,
        });
        
        const savedCard = await testCard.save();

        // Checking that character exists in db
        const charBefore = await Character.findById(testChar._id);
        expect(charBefore).not.toBeNull();

        // Check that card exists
        const cardBefore = await Card.findById(testCard._id);
        expect(cardBefore).not.toBeNull();

        // Triggering delete
        await testCard.deleteOne();

        // Search and validate that they don't exist
        const cardAfter = await Card.findById(testCard._id);
        const charAfter = await Character.findById(testChar._id);

        expect(cardAfter).toBeNull();
        expect(charAfter).toBeNull();

    });

    
});