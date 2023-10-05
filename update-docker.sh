#!/bin/bash

#
# Fetch latest changes and
# redeploy docker containers
#

# Set working directory to the script's directory
cd "$(dirname "$0")" || exit

# Fetch latest changes
git checkout main
git submodule update --init
docker compose build
docker compose stop && sudo docker compose up -d
