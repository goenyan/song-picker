cd "$(dirname "$0")"

PORT=8000
URL="http://localhost:$PORT/index.html"

echo "Starting Song Picker at $URL"
echo "Leave this window open while you use the app."
echo "Press Ctrl+C here to stop the server when you're done."
echo ""

( sleep 1 && open "$URL" ) &

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  python -m http.server "$PORT"
else
  echo "Python isn't installed. Install it from https://www.python.org/downloads/ and try again,"
  echo "or run: npx serve -l $PORT"
  read -p "Press Enter to close this window..."
fi
