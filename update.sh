#!/bin/sh

#
# Focus on current working space
#
# shellcheck disable=SC2164
cd "$( dirname "$0" )"

#
# Check git modules update
#
git submodule update --remote --merge

#
# Start removing and updating datasets
#
if [ -d "./timetable" ]
then
  echo "Directory timetable exists, removing!" &&
  rm -rf ./timetable &&
  cp -R ./dataset ./timetable
else
  echo "Error: Directory timetable does not exists, just updating!" &&
  cp -R ./dataset ./timetable
fi

