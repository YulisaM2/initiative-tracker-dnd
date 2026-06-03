const mongoose = require('mongoose');
const dbHandler = require('../../models/tests/db-handler.js');

const { Character } = require('../../models/character.js');
const { Card } = require('../card.js');

// Db Setup
beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe('Card Model Unit Tests', () => {
    it('should create a card & save succesfully', async() => {
        const testChar = new Character({ 
            genDetails: {
                name: 'Alfie'
            }
        });
        const testPos = {
            x: 1,
            y: 2,
        };
        const validCard = new Card({
            character: testChar,
            position: testPos
        });
        
        const savedCard = await validCard.save();

        expect(savedCard._id).toBeDefined();
        expect(savedCard.character).toMatchObject(testChar.toObject());
        expect(savedCard.position).toMatchObject(testPos);
    });

    it('should create an empty card & save succesfully', async() => {
        const validCard = new Card({ });
        
        const savedCard = await validCard.save();

        expect(savedCard._id).toBeDefined();
    });
});