#!/bin/bash

# Define color escape codes
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# install all project dependencies
npm install

# check for exsiting build directory and delete it, then rebuild.
build_path="./dist"

if [ -d "$build_path" ]; then
  # Directory exists, so delete it
  rm -r "$build_path"
  echo -e "${GREEN}\nCleared previous build, rebuilding application...${NC}\n"
  npm run build
else
  echo -e "${GREEN}\nBuilding application...${NC}\n"
  npm run build
fi


Connect database.
npm run db:drop # drops any existing database
npm run db:create # creates a new database with credentials from sequelize config
npm run db:migrate # creates all tables defined withing project scope.
npm run db:seed # Populates database with pre-seeded data.

# Start the server
npm run dev # starts the application in development mode.