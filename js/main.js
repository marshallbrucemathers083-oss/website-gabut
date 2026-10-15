/**
 * ==============================================================================
 * MAIN INTERACTION SCRIPT (js/main.js)
 * ==============================================================================
 * Renders all dynamic text from SITE_CONTENT (js/content.js).
 * Handles scene navigation, transitions, envelope opening, and interactions.
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const content = window.SITE_CONTENT;
  if (!content) {
    console.error("SITE_CONTENT not found! Ensure js/content.js is loaded before js/main.js.");
    return;
  }

  // --------------------------------------------------------------------------
  // 1. DYNAMIC CONTENT INJECTION
  // --------------------------------------------------------------------------

  // Browser Title & Metadata
  if (content.meta) {
    document.title = content.meta.title || "A Space For Memories";
  }

  // Scene 1: Welcome
  if (content.welcome) {
    setText("#welcome-badge", content.welcome.badge);
    setText("#welcome-heading", content.welcome.heading);
    setText("#welcome-subtitle", content.welcome.subtitle);
    setText("#welcome-btn-text", content.welcome.buttonText);
    setText("#welcome-hint", content.welcome.hintText);
  }

  // Scene 2: Intro
  if (content.intro) {
    setText("#intro-tag", content.intro.tag);
    setText("#intro-heading", content.intro.heading);
    renderParagraphs("#intro-paragraphs", content.intro.paragraphs);
    setText("#intro-btn-text", content.intro.buttonText);
  }

  // Scene 3: Memories Gallery
  if (content.memories) {
    setText("#memories-tag", content.memories.tag);
    setText("#memories-heading", content.memories.heading);
    setText("#memories-subtitle", content.memories.subtitle);
    renderMemoryCards("#memories-grid", content.memories.cards);
    setText("#memories-btn-text", content.memories.buttonText);
  }

  // Scene 4: Reflection
  if (content.reflection) {
    setText("#reflection-tag", content.reflection.tag);
    setText("#reflection-heading", content.reflection.heading);
    setText("#reflection-quote", content.reflection.quote);
    setText("#reflection-author", content.reflection.author);
    renderParagraphs("#reflection-paragraphs", content.reflection.paragraphs);
    setText("#reflection-btn-text", content.reflection.buttonText);
  }

  // Scene 5: The Personal Letter (CRITICAL DYNAMIC RENDERING)
  if (content.letter) {
    setText("#letter-tag", content.letter.tag);
    setText("#letter-heading", content.letter.heading);
    setText("#letter-opening", content.letter.opening);
    
    // Render all body paragraphs dynamically so any number of paragraphs works flawlessly!
    renderParagraphs("#letter-body-paragraphs", content.letter.body);
    
    setText("#letter-closing", content.letter.closing);
    setText("#letter-signature", content.letter.signature);
    
    const psEl = document.querySelector("#letter-ps");
    if (psEl) {
      if (content.letter.ps && content.letter.ps.trim() !== "") {
        psEl.textContent = content.letter.ps;
        psEl.style.display = "block";
      } else {
        psEl.style.display = "none";
      }
    }

    setText("#letter-btn-text", content.letter.buttonText);
  }

  // Scene 6: Final Message
  if (content.finalMessage) {
    setText("#final-tag", content.finalMessage.tag);
    setText("#final-heading", content.finalMessage.heading);
    setText("#final-message-text", content.finalMessage.message);
    setText("#final-replay-text", content.finalMessage.replayButtonText);
    setText("#final-footer-note", content.finalMessage.footerNote);
  }

  // --------------------------------------------------------------------------
  // 2. SCENE TRANSITIONS & STEPPING
  // --------------------------------------------------------------------------
  const scenes = Array.from(document.querySelectorAll(".scene-section"));
  const navDots = Array.from(document.querySelectorAll(".nav-dot"));
  const topNav = document.getElementById("top-nav-bar");
  let currentSceneIndex = 0;

  function showScene(targetIndex, smoothScroll = true) {
    if (targetIndex < 0 || targetIndex >= scenes.length) return;

    // Update active scene classes
    scenes.forEach((scene, idx) => {
      if (idx === targetIndex) {
        scene.classList.add("active");
        scene.classList.remove("hidden-scene");
      } else {
        scene.classList.remove("active");
        // Keep hidden scenes from messing up keyboard tab focus
        if (Math.abs(idx - targetIndex) > 1) {
          scene.classList.add("hidden-scene");
        } else {
          scene.classList.remove("hidden-scene");
        }
      }
    });

    // Update navigation indicator dots
    navDots.forEach((dot, idx) => {
      if (idx === targetIndex) {
        dot.classList.add("active");
        dot.setAttribute("aria-current", "step");
      } else {
        dot.classList.remove("active");
        dot.removeAttribute("aria-current");
      }
    });

    currentSceneIndex = targetIndex;

    // Show top navigation bar once visitor leaves welcome scene
    if (topNav) {
      if (targetIndex > 0) {
        topNav.classList.add("visible");
      } else {
        topNav.classList.remove("visible");
      }
    }

    // Smooth scroll into view
    if (smoothScroll) {
      scenes[targetIndex].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Welcome Scene Start Button: Initiates audio and glides to scene 2
  const startBtn = document.getElementById("start-journey-btn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      // 1. Play music
      if (window.audioController) {
        window.audioController.start();
      }

      // 2. Create small spark particle effect around button
      createSparkleBurst(startBtn);

      // 3. Glide smoothly to Scene 2 (Intro)
      setTimeout(() => {
        showScene(1);
      }, 350);
    });
  }

  // Next Scene Buttons
  document.querySelectorAll("[data-next-scene]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const nextIdx = parseInt(btn.getAttribute("data-next-scene"), 10);
      createSparkleBurst(btn);
      showScene(nextIdx);
    });
  });

  // Nav Dot Click Handlers
  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIdx = parseInt(dot.getAttribute("data-scene-index"), 10);
      showScene(targetIdx);
    });
  });

  // Replay Button
  const replayBtn = document.getElementById("replay-btn");
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      createSparkleBurst(replayBtn);
      showScene(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --------------------------------------------------------------------------
  // 3. INTERACTIVE ENVELOPE & LETTER UNFOLDING
  // --------------------------------------------------------------------------
  const envelopeEl = document.getElementById("letter-envelope");
  const sealBtn = document.getElementById("wax-seal-btn");
  const letterPaper = document.getElementById("letter-paper");

  function openEnvelope() {
    if (envelopeEl && !envelopeEl.classList.contains("opened")) {
      envelopeEl.classList.add("opened");
      if (letterPaper) {
        letterPaper.classList.add("unfolded");
      }
      // Play a soft sparkle sound or effect
      if (sealBtn) {
        createSparkleBurst(sealBtn);
      }
    }
  }

  if (sealBtn) {
    sealBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (envelopeEl) {
    envelopeEl.addEventListener("click", () => {
      openEnvelope();
    });
  }

  // --------------------------------------------------------------------------
  // 4. MEMORY CARD MODAL / LIGHTBOX
  // --------------------------------------------------------------------------
  const modal = document.getElementById("memory-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.getElementById("modal-close");

  function openMemoryModal(cardData) {
    if (!modal) return;
    if (modalImg) modalImg.src = cardData.image;
    if (modalTitle) modalTitle.textContent = cardData.title;
    if (modalDate) modalDate.textContent = cardData.date;
    if (modalCaption) modalCaption.textContent = cardData.caption;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMemoryModal() {
    if (!modal) return;
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeMemoryModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeMemoryModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMemoryModal();
  });

  // Attach card click handlers
  window.openMemoryModal = openMemoryModal;

  // --------------------------------------------------------------------------
  // 5. HELPER UTILITIES
  // --------------------------------------------------------------------------
  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text !== undefined) {
      el.textContent = text;
    }
  }

  function renderParagraphs(containerSelector, paragraphs) {
    const container = document.querySelector(containerSelector);
    if (!container || !Array.isArray(paragraphs)) return;
    container.innerHTML = "";
    paragraphs.forEach((pText) => {
      const p = document.createElement("p");
      p.className = "narrative-paragraph";
      p.textContent = pText;
      container.appendChild(p);
    });
  }

  function renderMemoryCards(containerSelector, cards) {
    const container = document.querySelector(containerSelector);
    if (!container || !Array.isArray(cards)) return;
    container.innerHTML = "";

    cards.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "memory-card polaroid";
      cardEl.setAttribute("data-card-id", card.id || index);
      cardEl.tabIndex = 0;

      cardEl.innerHTML = `
        <div class="polaroid-pin"></div>
        <div class="polaroid-inner">
          <div class="polaroid-image-wrapper">
            <img src="${card.image}" alt="${card.title}" loading="lazy" class="polaroid-img" />
            <span class="memory-tag">${card.tag || "Moment"}</span>
          </div>
          <div class="polaroid-meta">
            <span class="polaroid-date">${card.date || ""}</span>
            <h4 class="polaroid-title">${card.title || ""}</h4>
            <p class="polaroid-caption">${card.caption || ""}</p>
          </div>
        </div>
      `;

      cardEl.addEventListener("click", () => openMemoryModal(card));
      cardEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openMemoryModal(card);
        }
      });

      container.appendChild(cardEl);
    });
  }

  function createSparkleBurst(sourceEl) {
    if (!sourceEl) return;
    const rect = sourceEl.getBoundingClientRect();
    const count = 12;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement("div");
      spark.className = "sparkle-particle";
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const dist = 35 + Math.random() * 45;
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;
      const destX = startX + Math.cos(angle) * dist;
      const destY = startY + Math.sin(angle) * dist;

      spark.style.left = `${startX}px`;
      spark.style.top = `${startY}px`;

      spark.animate([
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${destX - startX}px, ${destY - startY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 700 + Math.random() * 300,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        fill: "forwards"
      }).onfinish = () => spark.remove();
    }
  }

  // Initialize Scene 0
  showScene(0, false);
});
