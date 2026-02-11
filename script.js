document.addEventListener("DOMContentLoaded", () => {
  // === Time greeting in sidebar ===
  const timeGreeting = document.getElementById("timeGreeting");
  if (timeGreeting) {
    const hour = new Date().getHours();
    let msg = "FOR YOU, FROM ME";
    if (hour >= 5 && hour < 12) msg = "GOOD MORNING, LOVE";
    else if (hour >= 12 && hour < 18) msg = "GOOD AFTERNOON, LOVE";
    else msg = "GOOD EVENING, LOVE";
    timeGreeting.textContent = msg;
  }

  // === Smooth scroll for nav links ===
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // === Typewriter effect for any .typewriter ===
  const typewriterElements = document.querySelectorAll(".typewriter");
  const typedOnce = new WeakSet();

  function runTypewriter(el) {
    if (!el || typedOnce.has(el)) return;
    const fullText = (el.getAttribute("data-text") || "").trim();
    el.textContent = "";
    typedOnce.add(el);

    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 25);
      }
    }
    typeChar();
  }

  // Run intro typewriter immediately
  typewriterElements.forEach(el => {
    if (el.closest("#intro")) runTypewriter(el);
  });

  // Also trigger typewriters when their section becomes visible
  const typeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          runTypewriter(el);
        }
      });
    },
    { threshold: 0.7 }
  );

  typewriterElements.forEach(el => {
    if (!el.closest("#intro")) typeObserver.observe(el);
  });

  // === Tiny heart secret toast ===
  const tinyHeart = document.getElementById("tinyHeart");
  const secretToast = document.getElementById("secretToast");
  const dimOverlay = document.getElementById("dimOverlay");
  let toastTimeout = null;

  function showToast() {
    if (!secretToast || !dimOverlay) return;
    secretToast.classList.add("show");
    dimOverlay.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(hideToast, 3200);
  }

  function hideToast() {
    if (!secretToast || !dimOverlay) return;
    secretToast.classList.remove("show");
    dimOverlay.classList.remove("show");
  }

  if (tinyHeart) tinyHeart.addEventListener("click", showToast);
  if (dimOverlay) dimOverlay.addEventListener("click", hideToast);

  // === Mood buttons logic ===
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodResponse = document.getElementById("moodResponse");

  const moodTexts = {
    loved:
      "Good. That’s exactly how I want you to feel. You deserve to feel chosen, every day.",
    curious:
      "Stay curious. There’s more I feel than I usually say out loud. This is me trying to say a little more.",
    calm:
      "If this makes you feel calm, I like that. I want to be one of the soft places your mind can land.",
  };

  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      moodButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (moodResponse && mood && moodTexts[mood]) {
        moodResponse.textContent = moodTexts[mood];
      }
    });
  });

  // === Memory card reveal ===
  const memoryCards = document.querySelectorAll(".memory-card");
  memoryCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("revealed");
    });
  });

  // === Audio buttons ===
  const audioButtons = document.querySelectorAll(".audio-btn");
  const audios = Array.from(document.querySelectorAll("audio"));

  audioButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-audio");
      const audio = id ? document.getElementById(id) : null;
      if (!audio) return;

      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        btn.classList.remove("playing");
        return;
      }

      audios.forEach(a => {
        a.pause();
        a.currentTime = 0;
      });
      audioButtons.forEach(b => b.classList.remove("playing"));

      audio.play().catch(() => {});
      btn.classList.add("playing");
    });
  });

  // === Reveal button ===
  const revealButton = document.getElementById("revealButton");
  const revealMessage = document.getElementById("revealMessage");

  if (revealButton && revealMessage) {
    revealButton.addEventListener("click", () => {
      revealMessage.classList.toggle("show");
      revealButton.textContent = revealMessage.classList.contains("show")
        ? "Hide the reveal 💌"
        : "Tap for your Valentine’s reveal 💌";
    });
  }

  // === "Us together" button ===
  const usButton = document.getElementById("usButton");
  if (usButton) {
    usButton.addEventListener("click", () => {
      showToast();
    });
  }

  // === Upward floating hearts ===
  const heartsLayer = document.getElementById("floatingHeartsLayer");

  function createFloatingHeart() {
    if (!heartsLayer) return;
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💗";

    const duration = 8 + Math.random() * 6; // 8–14s
    const left = Math.random() * 100; // 0–100vw

    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;

    // BIGGER hearts now
    const size = 22 + Math.random() * 20; // 22–42px
    heart.style.fontSize = `${size}px`;

    heartsLayer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, duration * 1000 + 500);
  }

  // More hearts initially
  for (let i = 0; i < 18; i++) {
    setTimeout(createFloatingHeart, i * 400); // closer together
  }
  // And more often overall
  setInterval(createFloatingHeart, 1000); // every 1s

  // === Random photo effect with scroll-floating ===
  const photosLayer = document.getElementById("randomPhotosLayer");

  // Up to 24 photos. Make sure these filenames exist in /photos/
  const photoSources = [
    "photos/photo1.jpg",
    "photos/photo2.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo5.jpg",
    "photos/photo6.jpg",
    "photos/photo7.jpg",
    "photos/photo8.jpg",
    "photos/photo9.jpg",
    "photos/photo10.jpg",
    "photos/photo11.jpg",
    "photos/photo12.jpg",
    "photos/photo13.jpg",
    "photos/photo14.jpg",
    "photos/photo15.jpg",
    "photos/photo16.jpg",
    "photos/photo17.jpg",
    "photos/photo18.jpg",
    "photos/photo19.jpg",
    "photos/photo20.jpg",
    "photos/photo21.jpg",
    "photos/photo22.jpg",
    "photos/photo23.jpg",
    "photos/photo24.jpg"
  ];

  // === Scroll-based floating offset ===
  let lastScrollY = window.scrollY;
  let scrollOffset = 0; // shared offset, but clamped

  function applyScrollTransformToPhoto(img) {
    const rotation = parseFloat(img.dataset.rotation || "0");
    img.style.transform = `translateY(${scrollOffset}px) rotate(${rotation}deg)`;
  }

  function handleScroll() {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    lastScrollY = currentY;

    // Float opposite the scroll direction
    scrollOffset -= delta * 0.5;

    // Clamp so offset never gets huge (so new photos don't spawn offscreen)
    if (scrollOffset > 100) scrollOffset = 100;
    if (scrollOffset < -100) scrollOffset = -100;

    document.querySelectorAll(".random-photo").forEach(img => {
      applyScrollTransformToPhoto(img);
    });
  }

  window.addEventListener("scroll", handleScroll);

  // === Center "no-photo" zone based on content width ===
  let forbiddenLeftStart = 0;
  let forbiddenLeftEnd = 0;

  function updateForbiddenZone() {
    const content = document.querySelector(".content");
    if (!content) return;

    const rect = content.getBoundingClientRect();
    // This is the central card column; pad in a bit so photos don't hug it
    forbiddenLeftStart = rect.left + 40;
    forbiddenLeftEnd = rect.right - 40;
  }

  updateForbiddenZone();
  window.addEventListener("resize", updateForbiddenZone);

  // Pick a left position:
  // - Not in the center card column
  // - Not hugging the screen edges (to avoid cut-off)
  function getSafeLeftVW() {
    const viewportWidth = window.innerWidth;
    const edgeMargin = 100; // ⬅️ keep photos far from borders
    const gapFromCard = 24; // horizontal gap from card area

    // Left side region: from edgeMargin to just before the card
    const leftRegionStart = edgeMargin;
    const leftRegionEnd = Math.max(edgeMargin, forbiddenLeftStart - gapFromCard);

    // Right side region: from just after the card to viewportWidth - edgeMargin
    const rightRegionStart = Math.min(
      viewportWidth - edgeMargin,
      forbiddenLeftEnd + gapFromCard
    );
    const rightRegionEnd = viewportWidth - edgeMargin;

    const regions = [];

    if (leftRegionEnd - leftRegionStart > 40) {
      regions.push([leftRegionStart, leftRegionEnd]);
    }
    if (rightRegionEnd - rightRegionStart > 40) {
      regions.push([rightRegionStart, rightRegionEnd]);
    }

    let leftPx;
    if (regions.length > 0) {
      const region = regions[Math.floor(Math.random() * regions.length)];
      leftPx = region[0] + Math.random() * (region[1] - region[0]);
    } else {
      // Fallback: anywhere with edge margin
      leftPx = edgeMargin + Math.random() * (viewportWidth - edgeMargin * 2);
    }

    return (leftPx / viewportWidth) * 100; // px → vw
  }

  function spawnRandomPhoto() {
    if (!photosLayer || photoSources.length === 0) return;

    const img = document.createElement("img");
    img.className = "random-photo";

    const src = photoSources[Math.floor(Math.random() * photoSources.length)];
    img.src = src;

    // Vertical placement somewhere on screen
    const top = 8 + Math.random() * 70; // 8–78vh
    const leftVW = getSafeLeftVW();     // sides only, away from card + edges

    img.style.top = `${top}vh`;
    img.style.left = `${leftVW}vw`;

    // Random rotation
    const rotation = (Math.random() - 0.5) * 16; // -8 to +8 deg
    img.dataset.rotation = rotation.toFixed(2);

    // Do NOT apply scrollOffset on spawn: they appear where we place them
    photosLayer.appendChild(img);

    // Remove after fade animation (matches CSS ~9s)
    setTimeout(() => {
      img.remove();
    }, 9500);
  }

  // === Ambient photos (slower, fewer) ===
  setTimeout(() => {
    spawnRandomPhoto();
    setInterval(spawnRandomPhoto, 20000); // every ~20s
  }, 3000);

  // === Section-based photos (each section gets a couple when first seen) ===
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionsWithPhotos = new Set();

  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.id;

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Nav active state
          navLinks.forEach(link => {
            const sec = link.getAttribute("data-section");
            if (sec === id) link.classList.add("active");
            else link.classList.remove("active");
          });

          // First time this section is seen → spawn just a couple photos
          if (!sectionsWithPhotos.has(id)) {
            sectionsWithPhotos.add(id);
            spawnRandomPhoto();
            setTimeout(spawnRandomPhoto, 1200);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(section => sectionObserver.observe(section));
});
