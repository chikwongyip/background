#!/bin/sh
cd /Users/chikwongyip/code/frontend/background/blog-1/logs
cp access.log $(date +%y-%m-%d).access.log
echo "" > access.log