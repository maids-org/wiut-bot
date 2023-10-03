#!/bin/bash

#
# This script is used to update the data git submodule
#

# Set working directory to the script's directory
cd "$(dirname "$0")" || exit

# Update data git submodule
echo "Updating data git submodule..."
git submodule update --init --recursive --remote