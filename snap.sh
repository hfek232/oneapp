#!/bin/bash
echo "=== APP SNAPSHOT: $(date) ==="
echo "Location: $(pwd)"
echo "---------------------------"
# This loops through your core files and prints them with headers
for file in App.js TopBar.js BottomNav.js ActivityBubble.js ProfileHeader.js build.sh header.html; do
  if [ -f "$file" ]; then
    echo "==> $file <=="
    cat "$file"
    echo ""
  else
    echo "!!> $file (MISSING)"
  fi
done
echo "=== END SNAPSHOT ==="
