#!/bin/zsh

# Setup of paths used for commands
cd "$(dirname "$0")"
BASE_DIR=$(pwd)
SERVER_DIR=$(cd "$BASE_DIR/../server" && pwd)
CLIENT_DIR=$(cd "$BASE_DIR/../client/initiative-tracker-app" && pwd)

echo "Starting backend..."
# Starting mongoDB server that listens only to applications running on same machine and storing it in data folder
osascript -e "tell application \"Terminal\" to do script \"cd '$SERVER_DIR' && mongod --bind_ip=127.0.0.1 --dbpath=data; exit\""

# Starting server that manages DB
osascript -e "tell application \"Terminal\" to do script \"cd '$SERVER_DIR' && node ./index.js; exit\""

# Starting the client for UI interaction
osascript -e "tell application \"Terminal\" to do script \"cd '$CLIENT_DIR' && npm run dev; exit\""

echo "Solution launched succesfully!"
echo "Press ENTER on this window to stop solution."
read -r

echo "Stopping applications..."

# Terminate all processes
pkill -f "mongod --bind_ip=127.0.0.1"
pkill -f "node ./index.js"
pkill -f "npm run dev"

# Awating so process complete
# sleep 1

# # Close windows that popped up at launch
# osascript -e "tell application \"Terminal\" to close $BindingDB_PID" 2>/dev/null
# osascript -e "tell application \"Terminal\" to close $BackendApp_PID" 2>/dev/null
# osascript -e "tell application \"Terminal\" to close $FrontendApp_PID" 2>/dev/null

echo "Solution stopped successfully!"