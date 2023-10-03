#!/bin/bash

#
# This script is used to update the data by downloading
# the latest version from the data repository
#

# Set working directory to the script's directory
cd "$(dirname "$0")" || exit

# If the data data exists, remove it
if [ -d "data" ]; then
    echo "Removing data directory..."
    rm -rf data
fi

# Update data git submodule
echo "Updating data git submodule..."

# Download the latest version of the data repository
wget https://github.com/mad-maids/wiut-data/archive/refs/heads/main.zip

# Unzip the downloaded file
unzip main.zip

# Rename the unzipped folder to data
mv wiut-data-main data

# Clean up
rm -rf main.zip
rm -rf ./data/README.md
rm -rf ./data/LICENSE
rm -rf ./data/.github