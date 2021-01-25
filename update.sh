#!/bin/sh

#
# Focus on current working space
#
cd "$( dirname "$0" )" || exit

#
# Ordering all things to functions
#
lazy_git(){
  if [ -d "./datasets" ]
  then
    rm -rf ./datasets
    git clone https://github.com/wiut-bis/timetable.git ./datasets
  else
    git clone https://github.com/wiut-bis/timetable.git ./datasets
  fi
}
lazy_copy()
{
  rsync -a ./datasets/ ./timetable
}
lazy_pull()
{
  yarn format
  git add .
  git commit -m "Updated timetables"
  git push
}
lazy_clean()
{
  rm -rf ./timetable/.git
  rm -rf ./datasets
}
lazy_main()
{
  lazy_git
  lazy_copy
  lazy_clean
  if [[ $(git status --porcelain) ]]; then
    lazy_pull
  else
    echo "Yay, no changes to commit"
  fi
}

#
# Start removing and updating datasets
#
if [ -d "./timetable" ]
then
  echo "Directory timetable exists, removing!" &&
  rm -rf ./timetable
  lazy_main

else
  echo "Error: Directory timetable does not exists, just updating!"
  lazy_main
fi
