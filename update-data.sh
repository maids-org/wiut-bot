#!/bin/bash

#
# This script is used to update the data git submodule
#

# Check if folder "data" exists
if [ ! -d "data" ]; then
    echo "Folder 'data' does not exist. Fetching data git submodule..."
    git submodule update --init --recursive --remote
fi

# Update data git submodule
echo "Updating data git submodule..."
git submodule update --init --recursive --remote