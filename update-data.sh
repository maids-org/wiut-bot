#!/bin/bash

#
# This script is used to update the data git submodule
#

# Check if folder "data" exists
if [ ! -d "data" ]; then
    echo "Folder 'data' does not exist. Fetching data git submodule..."
    git submodule update --init --recursive
fi

# Check if folder "data" is a git repository
if [ ! -d "data/.git" ]; then
    echo "Folder 'data' is not a git repository. Fetching data git submodule..."
    git submodule update --init --recursive
fi

# Update data git submodule
echo "Updating data git submodule..."
git submodule update --init --recursive