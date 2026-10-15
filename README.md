# A Little Space For Memories & Words

A personalized, interactive web journey featuring memory snapshots, reflective thoughts, and an editable personal letter accompanied by soothing ambient music.

This website is completely self-contained and **runs natively in any modern web browser without any npm installation, build process, or external dependencies**.

---

## 🚀 How to Run the Website

### Option 1: Double Click (Simplest)
Simply double-click `index.html` in your file manager to open it in your default web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local HTTP Server (Recommended for audio & local media)
Open a terminal in this directory and start a lightweight local server:

```bash
# Using Python (already available on Linux/macOS/Windows)
python3 -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

---

## ✍️ How to Edit the Personal Letter & Website Text

All text across the entire website is centralized in **one single file**:
👉 `js/content.js`

You **never** need to touch HTML, CSS, or JavaScript animation logic to update messages or photos.

### 1. Editing the Personal Letter (Chapter IV)
Open `js/content.js` in any text editor (VS Code, Notepad, etc.) and scroll down to the `letter:` section:

```javascript
  letter: {
    tag: "Chapter IV · A Personal Letter",

    // EDIT HERE: Replace this sample text with your own letter heading
    heading: "One Last Thing",

    // EDIT HERE: Replace this sample text with your own letter opening
    opening: "Hey, there's something I've wanted to put into words for a while.",

    // EDIT HERE: Replace this sample text with your own body paragraphs.
    // Each string in this array is a separate paragraph.
    // Add as many paragraphs as you need! The layout automatically expands.
    body: [
      "I don't know if you realize it, but some of the smallest moments can leave the biggest impressions. Sometimes, an ordinary day becomes a little more memorable because of someone who happens to be part of it.",
      "I made this little website as a collection of memories, but I also wanted to leave a few words here that I might not have known how to say otherwise.",
      "There's no big expectation behind this. I simply wanted to be honest about something that matters to me."
    ],

    // EDIT HERE: Replace this sample text with your own closing line
    closing: "Whatever happens next, I'm glad our paths crossed.",

    // EDIT HERE: Replace this sample text with your own signature
    signature: "— Someone who wanted to tell you this",

    // EDIT HERE: Optional postscript (P.S.). Leave empty "" if not needed.
    ps: "P.S. Thank you for taking the time to read through all of this.",

    buttonText: "Continue to The End",
  },
```

> **Note on Length:** You can write 1 paragraph or 10 paragraphs. The paper and layout will smoothly and automatically expand on both mobile and desktop without overflowing or breaking any animations.

---

### 2. Editing Other Sections

In `js/content.js`, you can also easily edit:

- **Welcome Screen (`welcome`):**
  - `heading`: Title shown on the entry screen (e.g. `"A Space For Us"`)
  - `subtitle`: Short invitation message
  - `buttonText`: Entry button label (e.g. `"Begin The Journey"`)

- **Introductory Text (`intro`):**
  - `heading`: Prologue title
  - `paragraphs`: Array of prologue text paragraphs

- **Memory Gallery (`memories`):**
  - Add, remove, or edit cards in `memories.cards`.
  - For each card, customize `title`, `date`, `caption`, and `tag`.
  - To use your own photo, place your image (e.g. `my-photo.jpg`) in the `images/` folder and change `image: "images/my-photo.jpg"`.

- **Reflection Section (`reflection`):**
  - `quote`: Highlighted quote
  - `author`: Attribution note
  - `paragraphs`: Reflection paragraphs

- **Final Message / Epilogue (`finalMessage`):**
  - `heading`: Epilogue heading
  - `message`: Farewell or closing message
  - `replayButtonText`: Button to return to the beginning

---

## 🎵 Background Music

1. **Out of the box:** When the visitor clicks the initial button ("Begin The Journey"), the site immediately plays a gentle, calming ambient acoustic piano melody synthesized natively with the Web Audio API. No external files or network connections needed!
2. **Using your own custom song (e.g., MP3):**
   - Place your MP3 file in the `audio/` directory (e.g., `audio/my-song.mp3`).
   - Open `js/content.js` and set:
     ```javascript
     audio: {
       trackTitle: "Your Song Title",
       trackArtist: "Your Artist",
       customAudioSrc: "audio/my-song.mp3",
     }
     ```
   - Refresh the page, and your custom track will play seamlessly!

---

## 📁 File Structure

```
websitekunto/
├── index.html           # Main semantic HTML structure
├── README.md            # Documentation & editing guide
├── css/
│   └── style.css        # Warm twilight styling, responsive layouts
├── js/
│   ├── content.js       # ⭐ ALL EDITABLE TEXT IS CONFIGURED HERE ⭐
│   ├── audio.js         # Audio engine (custom MP3 + procedural ambient fallback)
│   ├── particles.js     # Lightweight ambient starlight canvas
│   └── main.js          # Dynamic DOM rendering and scene navigation
└── images/
    └── memories/        # Snapshot illustrations / photos
        ├── memory-1.svg
        ├── memory-2.svg
        ├── memory-3.svg
        └── memory-4.svg
```
