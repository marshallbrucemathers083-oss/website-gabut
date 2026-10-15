/**
 * ==============================================================================
 * WEBSITE CONTENT CONFIGURATION (js/content.js)
 * ==============================================================================
 * 
 * IMPORTANT NOTE FOR THE OWNER:
 * All text across the entire website is centralized in this file.
 * You can edit any part of the website by changing the text between the quotes ("...").
 * 
 * When you are ready to write your final message, look for:
 *   // EDIT HERE:
 * and replace the temporary placeholder text with your words.
 * 
 * You do NOT need to edit HTML, CSS, or any animation logic!
 * The website layout and animations automatically adjust to your text.
 * ==============================================================================
 */

const SITE_CONTENT = {
  // ----------------------------------------------------------------------------
  // General Site Settings
  // ----------------------------------------------------------------------------
  meta: {
    // EDIT HERE: Browser tab title
    title: "A Little Space For Memories & Words",
    // EDIT HERE: Site description
    subtitle: "A quiet collection of moments",
  },

  // ----------------------------------------------------------------------------
  // Audio Player Settings
  // ----------------------------------------------------------------------------
  audio: {
    // EDIT HERE: Song title displayed in the music player
    trackTitle: "Warm Twilight Memories",
    // EDIT HERE: Artist name displayed in the music player
    trackArtist: "Acoustic Melody",
    // EDIT HERE: Optional custom MP3 audio file path (e.g. "audio/your-song.mp3").
    // If you leave this as empty string "", the site will automatically use its
    // built-in procedural ambient piano synthesizer!
    customAudioSrc: "",
  },

  // ----------------------------------------------------------------------------
  // SCENE 1: Welcome / Entry Screen
  // ----------------------------------------------------------------------------
  welcome: {
    // EDIT HERE: Small badge above the main title
    badge: "A Quiet Corner",
    // EDIT HERE: Welcome heading
    heading: "A Space For Us",
    // EDIT HERE: Welcome subtitle
    subtitle: "Take a quiet moment, turn on your sound, and step inside.",
    // EDIT HERE: Initial button text (clicking this starts the music & enters the site)
    buttonText: "Begin The Journey",
    // EDIT HERE: Hint text below the button
    hintText: "Best experienced with sound on 🎧",
  },

  // ----------------------------------------------------------------------------
  // SCENE 2: Introductory Text / Prologue
  // ----------------------------------------------------------------------------
  intro: {
    // EDIT HERE: Section tag/chapter title
    tag: "Chapter I · Prologue",
    // EDIT HERE: Introductory section heading
    heading: "Before We Begin",
    // EDIT HERE: Introductory paragraphs. You can add or remove paragraphs freely.
    paragraphs: [
      "Life moves so quickly that sometimes the most meaningful moments pass by in a quiet blur. We get caught up in routines, responsibilities, and the rush of everyday life.",
      "This little corner was created as a gentle pause button — a place to hold onto memories that brought warmth, and to say a few things that deserve to be remembered.",
      "Whenever you are ready, step forward to look back on a few snapshots."
    ],
    // EDIT HERE: Button to proceed to memory gallery
    buttonText: "Explore Memories",
  },

  // ----------------------------------------------------------------------------
  // SCENE 3: Memory Gallery Captions & Photos
  // ----------------------------------------------------------------------------
  memories: {
    // EDIT HERE: Section tag/chapter title
    tag: "Chapter II · Snapshot Gallery",
    // EDIT HERE: Gallery heading
    heading: "Fragments of Time",
    // EDIT HERE: Gallery subtitle
    subtitle: "A few snapshots of moments that lingered long after they passed.",
    // EDIT HERE: Memory cards. You can add, edit, or remove cards here.
    // To use your own photos, place your image files in the 'images/' folder and update 'image'.
    cards: [
      {
        id: 1,
        title: "The Quiet Afternoon",
        date: "An Unhurried Day",
        // EDIT HERE: Caption for Memory 1
        caption: "That unexpected conversation where time seemed to slow down, and laughing felt completely effortless.",
        image: "images/memories/memory-1.svg",
        tag: "Serenity"
      },
      {
        id: 2,
        title: "Golden Hour Glow",
        date: "Sunset Walk",
        // EDIT HERE: Caption for Memory 2
        caption: "Walking side by side while the evening sky turned into shades of amber, honey, and lavender.",
        image: "images/memories/memory-2.svg",
        tag: "Atmosphere"
      },
      {
        id: 3,
        title: "Late Night Talks",
        date: "Under the Stars",
        // EDIT HERE: Caption for Memory 3
        caption: "Sharing small thoughts and playlist favorites while the city lights hummed gently in the background.",
        image: "images/memories/memory-3.svg",
        tag: "Connection"
      },
      {
        id: 4,
        title: "A Shared Smile",
        date: "Simple Moments",
        // EDIT HERE: Caption for Memory 4
        caption: "A quiet reminder that it is rarely the grand gestures we cherish most, but the simplest, warmest smiles.",
        image: "images/memories/memory-4.svg",
        tag: "Gratitude"
      }
    ],
    // EDIT HERE: Button to proceed to reflection
    buttonText: "Reflect Together",
  },

  // ----------------------------------------------------------------------------
  // SCENE 4: Reflection Section Text
  // ----------------------------------------------------------------------------
  reflection: {
    // EDIT HERE: Section tag/chapter title
    tag: "Chapter III · Reflection",
    // EDIT HERE: Section heading
    heading: "A Thought on Time",
    // EDIT HERE: Highlighted quote
    quote: "“Some moments stay with us not because they were loud, but because they felt completely genuine.”",
    // EDIT HERE: Quote author or attribution note
    author: "A gentle reflection",
    // EDIT HERE: Reflection paragraphs
    paragraphs: [
      "We do not always notice the impact of ordinary days until they become memories we look back on with a quiet smile.",
      "It is a rare and lovely gift when someone brings a sense of calm, effortless honesty, and warmth into your world.",
      "Before this chapter closes, there is one last envelope waiting for you."
    ],
    // EDIT HERE: Button to proceed to the letter
    buttonText: "Open The Letter",
  },

  // ----------------------------------------------------------------------------
  // SCENE 5: The Personal Letter (CRITICAL EDITABLE SECTION)
  // ----------------------------------------------------------------------------
  // TEMPORARY PLACEHOLDER NOTICE:
  // The text below is temporary example text. The website owner will write
  // the final personal message manually later.
  // 
  // You can write as many paragraphs as you like in the `body` array.
  // The layout will expand smoothly and beautifully on both desktop and mobile.
  // ----------------------------------------------------------------------------
  letter: {
    // EDIT HERE: Section tag/chapter title
    tag: "Chapter IV · A Personal Letter",

    // EDIT HERE: Replace this sample text with your own letter heading
    heading: "One Last Thing",

    // EDIT HERE: Replace this sample text with your own letter opening
    opening: "Hey, there's something I've wanted to put into words for a while.",

    // EDIT HERE: Replace this sample text with your own body paragraphs.
    // Each item in the array is a separate paragraph. Add as many as you need!
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

    // EDIT HERE: Button to proceed to the final message
    buttonText: "Continue to The End",
  },

  // ----------------------------------------------------------------------------
  // SCENE 6: Final Message & Epilogue
  // ----------------------------------------------------------------------------
  finalMessage: {
    // EDIT HERE: Section tag/chapter title
    tag: "Chapter V · Epilogue",
    // EDIT HERE: Final section heading
    heading: "Thank You for Being Here",
    // EDIT HERE: Final message text
    message: "Thank you for walking through this small space with me. Wherever life takes you, I hope today brings you peace, gentle moments, and reasons to smile.",
    // EDIT HERE: Replay / Return button text
    replayButtonText: "Return to the Beginning",
    // EDIT HERE: Footer note
    footerNote: "Crafted with warmth & care · All memories preserved",
  }
};

// Make SITE_CONTENT accessible globally on window
if (typeof window !== "undefined") {
  window.SITE_CONTENT = SITE_CONTENT;
}
