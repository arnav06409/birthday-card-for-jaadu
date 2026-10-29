BIRTHDAY WEBSITE — REPAIRED EXISTING PROJECT

RUN ON WINDOWS
1. Extract the ZIP folder.
2. Open the birthday-card-for-jaadu-main folder.
3. Open Command Prompt in that folder.
4. Run: python -m http.server 8000
5. Open http://localhost:8000 in Chrome or Edge.
6. Press Ctrl+C in Command Prompt to stop the server.

CONTENT PRESERVATION
- Restored the original apology letter from the supplied earlier source ZIP.
- Added the extra Hinglish apology paragraph after the original apology content.
- Added the new birthday letter on its own separate page after the apology page.
- Added the Shayari introduction before the existing line-by-line Shayari reveal.
- Preserved the existing question flow and restored its requested question wording; the new “Do you miss me?” question remains in the flow.
- Preserved the existing review box and goodbye action, and added the long final birthday message alongside the existing final scene text.
- Preserved the photo album's previous captions and added the remembered caption as an additional caption, not a replacement.
- The removed “Universe of Memories” and “Our Story — Timeline” sections remain absent.

MUSIC
- Default background: assets/music/iktara.mp3
- Birthday/cake: assets/music/happy-birthday.mp3
- Photo Album: assets/music/ilahi.mp3
- Appreciation Garden: assets/music/khairiyat.mp3
- Secret Star: assets/music/hawayein.mp3
- Final cinematic and goodbye: assets/music/apna-bana-le.mp3

The website uses one persistent HTML audio element for scene music and the playlist, so tracks cannot play simultaneously through separate page-level audio elements. Iktara's currentTime is saved before switching to a scene-specific track and is restored when returning to default music. The birthday song is stopped when cake-cutting completes or its Skip action is used. Browser autoplay may be blocked; tap the page or music control to start playback.

OUR MUSIC PLAYLIST
- Open “Our Music” from the Photo Album or Appreciation Garden.
- Bundled songs include Iktara, the birthday song, Ilahi, Khairiyat, Hawayein, and Apna Bana Le.
- Play/Pause, Previous/Next, seek, volume, shuffle, repeat off/one/all, and playlist selection are available.
- Add Song accepts common audio formats including MP3, WAV, OGG, and M4A. Added audio files and metadata are stored in IndexedDB on that browser/device only. They are not uploaded or shared with other visitors/devices.
- The photo slideshow uses existing local photos and does not control audio playback.

PHOTOS AND WATERMARKS
- All 10 original photo files are preserved and remain local in assets/photos; no photos were uploaded to an external service or replaced.
- The website's decorative privacy watermark is hidden on the Photo Album so it does not overlay scrapbook photographs.
- Inspection found no clear third-party stock-photo watermark in the supplied files. IMG-20251229-WA0003.jpg contains visible decorative text “<<B!! ❤️” near the top of the photograph; it was preserved because it is not clearly a rights-holder watermark and may be intentional. Supply a clean authorized original if you want that overlay removed.
- Ordinary browser code cannot prevent screenshots or screen recordings. Static photos in assets/photos are accessible to anyone who can retrieve the site files. Real privacy requires authenticated backend storage and server-side authorization.

OWNER DASHBOARD / SECURITY
- Passwords preserved: 2910 (one-time), anshika29 (two-time), arnav81 (unlimited), arnavowner (owner-only in the existing client-side flow).
- Owner dashboard responses, thoughts, reviews and usage counts are stored in browser localStorage. They are not shared across devices. This is not secure server-side authentication; client-side passwords/localStorage can be inspected or modified by a technically capable visitor.

IMPORTANT LIMITATION — CODE THAT DREW YOU
The supplied earlier ZIP and all available project ZIP backups do not contain a “Code That Drew You” portrait page or its portrait-generation code. I did not invent a fake page or claim it was restored. To restore that specific original implementation, provide the original ZIP/source that contains it; if the intended source portrait is not included there, identify the correct photograph.

VERIFICATION
- JavaScript syntax check (`node --check script.js`) passed.
- ZIP integrity and local asset-path checks passed.
- The HTML has no duplicate IDs and all 10 photo files plus all six audio files are present.
- A complete interactive browser test of every flow, audio seek/resume, IndexedDB uploads, and mobile layouts was not successfully completed in this environment. Please manually verify these behaviours in Chrome/Edge after extracting.
