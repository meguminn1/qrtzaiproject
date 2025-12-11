AI Chat App (Android Java) + Node Backend (Gemini proxy)
-------------------------------------------------------
This package contains:
- android-app/         (Android Studio compatible app)
- server/              (Node + Express proxy that holds your Gemini API key)

IMPORTANT:
- The Android app calls the backend (server) to send prompts to Gemini.
  This keeps your API key secret (recommended).
- Configure and run the server first, then set `ApiHelper.BACKEND_URL` in the Android app (or use default).

Server setup:
1. cd server
2. copy .env.example to .env and put GEMINI_API_KEY=your_key
3. npm install
4. npm start
Server runs default on http://localhost:3000

Android app:
- This is an Android Studio project (Gradle). Import into Android Studio (File → Open).
- Or extract and move `android-app` contents into AIDE project manually (you might need to adjust dependencies).
- By default the app will send requests to http://10.0.2.2:3000 (Android emulator localhost mapping).
  If you run server on a physical device or different host, update ApiHelper.BACKEND_URL in the app.

What I implemented:
- Login (single-column gradient)
- Chat history with date/time & small AI icon
- Chat screen with RecyclerView and left/right bubbles (user/AI)
- Full message storage (messages table per chat) in SQLite
- Node backend that forwards prompt to Google Gemini API (uses environment GEMINI_API_KEY)

Notes on Gemini:
- Server uses the Generative Language API v1beta endpoint pattern. Keep an eye on official docs:
  https://cloud.google.com/generative-ai/docs
- Responses shape may require small parser tweaks.

Enjoy — if anything fails to build, tell me the exact error and I'll patch files.
