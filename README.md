# initiative-tracker-dnd

Small web app for initiative and stats management during DnD combat, based on 2024 Player and Monster Hanbooks. It has local persistent storage.
Consists of:
1. Node.js + Express for backend.
2. Mongodb + Mongoose for storage.
3. React/Vite for frontend.
<img src="src/view-example.png" width="600">

For solution to work, **please** make sure you **have npm and node installed**.

# Features
1. Adding character cards that auto save + validate data is valid.
2. Cards can be dragged and dropped like sticky notes. (Thanks https://sticky-fcc.vercel.app/ for the tutorial!)
3. Automatic heal/damage that considers temporal HP as well.
4. If selected a card and then clicked on one of the color themes, role is updated (only cosmetic for now)
5. Lock/Unlock dragging of grid, also known as panning.
6. Notes expand to acommodate text, with a limit defined (turns into scroll)
7. Delete a character card or delete all.

# Instructions
## Install packages in client folder
1. Go to src/client/initiative-tracker-app
2. Run `npm install`

## Install packages in server folder
1. Go to src/server
2. Run `npm install`

## Install packages in contracts folder
1. Go to src/contracts
2. Run `npm install`

## Create a .env file in the src/
PORT=<br>
MONGOOSE_DB_URL=<br>
VITE_API_REQUESTS_URL=<br>
VITE_API_CHAR_URL=<br>
VITE_API_COMBAT_HIGHLIGHTS_URL=<br>
VITE_API_BARDIC_INSPIRATION_URL=<br>
VITE_API_HEROIC_INSPIRATION_URL=<br>
VITE_API_NOTES_URL=<br>
VITE_API_MAX_HP_URL=<br>
VITE_API_CURR_HP_URL=<br>
VITE_API_MODIFY_HP_URL=<br>

## Run the server
1. Inside server `node index.js`
   
You should see the console logging the port in which the server is running, the address in which Mongo is connected, and that the app is succesfully running.
Any query to the database will be logged here.

## Run client
1. Inside initiative-tracker-app  `npm run dev`
   
You should see the address to which the react app was launched. Use it to access the frontend of the solution. 
