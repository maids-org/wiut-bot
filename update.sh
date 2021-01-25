#!/bin/sh

#
# Focus on current working space
#
# shellcheck disable=SC2164
cd "$( dirname "$0" )"

#
# Check git modules update
#
git clone https://github.com/wiut-bis/timetable.git ./datasets

#
# Start removing and updating datasets
#
if [ -d "./timetable" ]
then
  echo "Directory timetable exists, removing!" &&
  rm -rf ./timetable
  rsync -a ./datasets/ ./timetable
  rm -rf ./timetable/.git
  rm -rf ./datasets
  git add .
  git commit -m "Updated timetables"
  git push
else
  echo "Error: Directory timetable does not exists, just updating!"
  rsync -a ./datasets/ ./timetable
  rm -rf ./timetable/.git
  rm -rf ./datasets
  git add .
  git commit -m "Updated timetables"
  git push
fi
