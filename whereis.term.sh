#!/bin/bash
find . -type d \( -name "node_modules" -o -name ".git" -o -name ".output" -o -name ".nuxt" \) -prune -o -type f -name "*" -exec grep -i "$1" {} +
