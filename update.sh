#!/bin/sh

# shellcheck disable=SC2164
cd "$( dirname "$0" )"

# update submodule and timetable
git submodule update --init --recursive
rm -rf ./timetable && cp -a ./timetables ./timetable

echo "Successfully updated timetables"
