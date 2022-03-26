#!/bin/sh

mkdir output

pandoc -s main.md -o output/main.html

date > output/.build_date.txt

echo "generated_at: $(date)" > variables.yml
