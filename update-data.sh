#!/bin/bash

#
# This script is used to update the data git submodule
#

# Update data git submodule
echo "Updating data git submodule..."
git submodule update --init --recursive --remote