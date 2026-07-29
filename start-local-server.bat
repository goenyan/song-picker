@echo off
REM Double-click this file to run Song Picker locally.
REM It starts a tiny local web server in this folder and opens the app —
REM needed so YouTube embeds get a real Referer header (fixes Error 153,
REM which always happens when a page is opened directly as a file://).

cd /d "%~dp0"

set PORT=8000
set URL=http://localhost:%PORT%/index.html

echo Starting Song Picker at %URL%
echo Leave this window open while you use the app.
echo Close this window to stop the server when you're done.
echo.

where python >nul 2>nul
if %errorlevel%==0 (
    start "" "%URL%"
    python -m http.server %PORT%
    goto :eof
)

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "%URL%"
    py -m http.server %PORT%
    goto :eof
)

echo Python isn't installed. Install it from https://www.python.org/downloads/ and try again,
echo or run: npx serve -l %PORT%
pause
