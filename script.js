// script.js
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // TIME GREETING
  // =========================
  const timeGreeting = document.getElementById("timeGreeting");
  if (timeGreeting) {
    const hour = new Date().getHours();
    let msg = "FOR YOU, FROM ME";
    if (hour >= 5 && hour < 12) msg = "GOOD MORNING, LOVE";
    else if (hour >= 12 && hour < 18) msg = "GOOD AFTERNOON, LOVE";
    else msg = "GOOD EVENING, LOVE";
    timeGreeting.textContent = msg;
  }

  // =========================
  // SMOOTH NAV SCROLL
  // =========================
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // =========================
  // TYPEWRITER
  // =========================
  const typewriterElements = document.querySelectorAll(".typewriter");
  const typedOnce = new WeakSet();

  function runTypewriter(el) {
    if (!el || typedOnce.has(el)) return;
    const fullText = (el.getAttribute("data-text") || "").trim();
    el.textContent = "";
    typedOnce.add(el);

    let i = 0;
    const step = () => {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i++;
        setTimeout(step, 22);
      }
    };
    step();
  }

  typewriterElements.forEach((el) => {
    if (el.closest("#intro")) runTypewriter(el);
  });

  const typeObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && runTypewriter(entry.target)),
    { threshold: 0.7 }
  );

  typewriterElements.forEach((el) => {
    if (!el.closest("#intro")) typeObserver.observe(el);
  });

  // =========================
  // SECRET TOAST
  // =========================
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

  // =========================
  // MOOD BUTTONS
  // =========================
  const moodButtons = document.querySelectorAll(".mood-btn");
  const moodResponse = document.getElementById("moodResponse");

  const moodTexts = {
    loved: "Good. That’s exactly how I want you to feel. You deserve to feel chosen, every day.",
    curious: "Stay curious. There’s more I feel than I usually say out loud. This is me trying to say a little more.",
    calm: "If this makes you feel calm, I like that. I want to be one of the soft places your mind can land.",
  };

  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      moodButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (moodResponse && mood && moodTexts[mood]) moodResponse.textContent = moodTexts[mood];
    });
  });

  // =========================
  // MEMORY REVEAL
  // =========================
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("revealed"));
  });

  // =========================
  // AUDIO BUTTONS (voice notes)
  // =========================
  const audioButtons = document.querySelectorAll(".audio-btn");
  const audios = Array.from(document.querySelectorAll("audio")).filter(a => a.id !== "audioPlayer");

  audioButtons.forEach((btn) => {
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

      audios.forEach((a) => { a.pause(); a.currentTime = 0; });
      audioButtons.forEach((b) => b.classList.remove("playing"));

      audio.play().catch(() => {});
      btn.classList.add("playing");
    });
  });

  // =========================
  // REVEAL BUTTON
  // =========================
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

  // =========================
  // "US TOGETHER" BUTTON
  // =========================
  const usButton = document.getElementById("usButton");
  if (usButton) usButton.addEventListener("click", showToast);

  // =========================
  // UPWARD FLOATING HEARTS
  // =========================
  const heartsLayer = document.getElementById("floatingHeartsLayer");
  function createFloatingHeart() {
    if (!heartsLayer) return;
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💗";

    const duration = 8 + Math.random() * 6;
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.fontSize = `${24 + Math.random() * 22}px`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }
  for (let i = 0; i < 18; i++) setTimeout(createFloatingHeart, i * 400);
  setInterval(createFloatingHeart, 900);

  // =========================
  // RANDOM PHOTOS (SAFE + NON-OVERLAP CENTER)
  // =========================
  const photosLayer = document.getElementById("randomPhotosLayer");
  const photoSources = Array.from({ length: 24 }, (_, i) => `photos/photo${i + 1}.jpg`);
  const PHOTO_MAX_WIDTH = 400;
  const MAX_PHOTOS_ON_SCREEN = 5;

  let lastScrollY = window.scrollY;
  let scrollOffset = 0;

  function applyScrollTransformToPhoto(img) {
    const rotation = parseFloat(img.dataset.rotation || "0");
    img.style.transform = `translateY(${scrollOffset}px) rotate(${rotation}deg)`;
  }

  function handleScroll() {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    lastScrollY = currentY;

    scrollOffset -= delta * 0.5;
    if (scrollOffset > 100) scrollOffset = 100;
    if (scrollOffset < -100) scrollOffset = -100;

    document.querySelectorAll(".random-photo").forEach(applyScrollTransformToPhoto);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });

  let forbiddenLeftStart = 0;
  let forbiddenLeftEnd = 0;

  function updateForbiddenZone() {
    const content = document.querySelector(".content");
    if (!content) return;
    const rect = content.getBoundingClientRect();
    forbiddenLeftStart = rect.left + 40;
    forbiddenLeftEnd = rect.right - 40;
  }
  updateForbiddenZone();
  window.addEventListener("resize", updateForbiddenZone);

  function getSafeLeftVW() {
    const viewportWidth = window.innerWidth;
    const edgeMargin = 40;
    const gapFromCard = 24;
    const w = Math.min(PHOTO_MAX_WIDTH, viewportWidth - edgeMargin * 2);

    const leftRegionStart = edgeMargin;
    const leftRegionEnd = Math.max(edgeMargin, forbiddenLeftStart - gapFromCard - w);

    const rightRegionStart = Math.min(
      viewportWidth - edgeMargin - w,
      forbiddenLeftEnd + gapFromCard
    );
    const rightRegionEnd = viewportWidth - edgeMargin - w;

    const regions = [];
    if (leftRegionEnd - leftRegionStart > 40) regions.push([leftRegionStart, leftRegionEnd]);
    if (rightRegionEnd - rightRegionStart > 40) regions.push([rightRegionStart, rightRegionEnd]);

    let leftPx;
    if (regions.length > 0) {
      const region = regions[Math.floor(Math.random() * regions.length)];
      leftPx = region[0] + Math.random() * (region[1] - region[0]);
    } else {
      leftPx = edgeMargin + Math.random() * (viewportWidth - edgeMargin * 2 - w);
      leftPx = Math.max(edgeMargin, Math.min(leftPx, viewportWidth - edgeMargin - w));
    }
    return (leftPx / viewportWidth) * 100;
  }

  function spawnRandomPhoto() {
    if (!photosLayer || photoSources.length === 0) return;
    const existing = document.querySelectorAll(".random-photo");
    if (existing.length >= MAX_PHOTOS_ON_SCREEN) return;

    const currentSrcs = new Set(Array.from(existing).map((img) => img.getAttribute("src")));
    const unusedSources = photoSources.filter((src) => !currentSrcs.has(src));
    const pool = unusedSources.length ? unusedSources : photoSources;

    const src = pool[Math.floor(Math.random() * pool.length)];
    const img = document.createElement("img");
    img.className = "random-photo";
    img.src = src;

    img.style.top = `${8 + Math.random() * 70}vh`;
    img.style.left = `${getSafeLeftVW()}vw`;

    const rotation = (Math.random() - 0.5) * 16;
    img.dataset.rotation = rotation.toFixed(2);

    photosLayer.appendChild(img);
    setTimeout(() => img.remove(), 9500);
  }

  setTimeout(() => {
    spawnRandomPhoto();
    setTimeout(spawnRandomPhoto, 3500);
    setInterval(spawnRandomPhoto, 8500);
  }, 1200);

  // =========================
  // SECTION OBSERVER (FADE IN + NAV ACTIVE + section photo burst)
  // =========================
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionsWithPhotos = new Set();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          navLinks.forEach((link) => {
            const sec = link.getAttribute("data-section");
            link.classList.toggle("active", sec === id);
          });

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
  sections.forEach((section) => sectionObserver.observe(section));

  // =========================
  // VALENTINE MINI GAME (RUNAWAY NO)
  // =========================
  document.querySelectorAll("[data-valentine]").forEach((widget) => {
    const wrap = widget.querySelector(".valentine-buttons");
    const yesBtn = widget.querySelector(".val-btn.val-yes");
    const noBtn = widget.querySelector(".val-btn.val-no");
    const result = widget.querySelector(".valentine-result");
    const continueBtn = widget.querySelector(".val-continue");
    const sub = widget.querySelector(".valentine-sub");
    if (!wrap || !yesBtn || !noBtn) return;

    let locked = false;

    function setInitialPositions() {
      yesBtn.style.left = "10px";
      yesBtn.style.top = "12px";

      const approxNoWidth = 120;
      noBtn.style.left = `calc(100% - 10px - ${approxNoWidth}px)`;
      noBtn.style.top = "12px";
      noBtn.style.transform = "none";
    }

    function moveNoButton() {
      if (locked) return;

      const wrapRect = wrap.getBoundingClientRect();
      const btnRect = noBtn.getBoundingClientRect();
      const padding = 8;

      const maxX = Math.max(padding, wrapRect.width - btnRect.width - padding);
      const maxY = Math.max(padding, wrapRect.height - btnRect.height - padding);

      const x = padding + Math.random() * (maxX - padding);
      const y = padding + Math.random() * (maxY - padding);

      noBtn.style.left = `${x}px`;
      noBtn.style.top = `${y}px`;

      const rot = (Math.random() - 0.5) * 10;
      noBtn.style.transform = `rotate(${rot}deg)`;

      if (result) result.textContent = "Not happening 😌";
    }

    function isPointerNearNo(clientX, clientY) {
      const r = noBtn.getBoundingClientRect();
      const buffer = 45;
      return (
        clientX >= r.left - buffer &&
        clientX <= r.right + buffer &&
        clientY >= r.top - buffer &&
        clientY <= r.bottom + buffer
      );
    }

    setInitialPositions();
    window.addEventListener("resize", setInitialPositions);

    noBtn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        moveNoButton();
      },
      true
    );

    ["pointerenter", "mouseenter", "mouseover", "focus", "touchstart"].forEach((evt) => {
      noBtn.addEventListener(
        evt,
        (e) => {
          e.preventDefault();
          moveNoButton();
        },
        { passive: false }
      );
    });

    widget.addEventListener("pointermove", (e) => {
      if (locked) return;
      if (isPointerNearNo(e.clientX, e.clientY)) moveNoButton();
    });

    yesBtn.addEventListener("click", () => {
      if (locked) return;
      locked = true;

      widget.classList.add("yes-chosen");
      setTimeout(() => widget.classList.remove("yes-chosen"), 600);

      if (result) result.textContent = "Knew it. 💘";

      yesBtn.textContent = "Always 💚";
      yesBtn.disabled = true;
      yesBtn.style.opacity = "0.9";
      yesBtn.style.cursor = "default";
      yesBtn.style.transform = "none";

      noBtn.textContent = "Never 😌";
      noBtn.disabled = true;
      noBtn.style.opacity = "0.55";
      noBtn.style.cursor = "default";
      noBtn.style.transform = "none";

      if (continueBtn) continueBtn.style.display = "inline-flex";
      if (sub) sub.style.display = "block";
    });

    if (continueBtn) {
      continueBtn.addEventListener("click", () => {
        const next = document.querySelector("#future");
        if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  // =========================
  // APPLE MUSIC STYLE PLAYER + "NOW PLAYING FOR INDYA" ANIMATION
  // =========================
  const musicPlayer = document.getElementById("musicPlayer");
  const audioPlayer = document.getElementById("audioPlayer");
  const playPause = document.getElementById("playPause");
  const prevTrack = document.getElementById("prevTrack");
  const nextTrack = document.getElementById("nextTrack");
  const progressBar = document.getElementById("progressBar");
  const playerTitle = document.getElementById("playerTitle");
  const playerArt = document.getElementById("playerArt");
  const trackList = document.getElementById("trackList");

  // 🔧 Update these paths/titles to YOUR uploads
  const tracks = [
    { title: "Our Song", src: "audio/song1.mp3", cover: "images/cover1.jpg" },
    { title: "Late Night Drive", src: "audio/song2.mp3", cover: "images/cover2.jpg" },
    { title: "Forever Type", src: "audio/song3.mp3", cover: "images/cover3.jpg" },
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  function setNowPlayingState(playing) {
    if (!musicPlayer) return;
    musicPlayer.classList.toggle("paused", !playing);
  }

  function loadTrack(index) {
    const t = tracks[index];
    if (!t) return;
    audioPlayer.src = t.src;
    playerTitle.textContent = t.title;
    playerArt.src = t.cover;

    // Update active list item
    Array.from(trackList.querySelectorAll(".track-item")).forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    // Reset progress
    if (progressBar) progressBar.style.width = "0%";
  }

  async function play() {
    try {
      await audioPlayer.play();
      isPlaying = true;
      if (playPause) playPause.textContent = "⏸";
      setNowPlayingState(true);
    } catch (e) {
      // If browser blocks, user must click again (still fine)
    }
  }

  function pause() {
    audioPlayer.pause();
    isPlaying = false;
    if (playPause) playPause.textContent = "▶";
    setNowPlayingState(false);
  }

  function togglePlay() {
    if (!audioPlayer) return;
    if (isPlaying) pause();
    else play();
  }

  function next() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    play();
  }

  function prev() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    play();
  }

  if (trackList) {
    trackList.innerHTML = "";
    tracks.forEach((t, i) => {
      const item = document.createElement("div");
      item.className = "track-item";
      item.textContent = t.title;
      item.addEventListener("click", () => {
        currentTrackIndex = i;
        loadTrack(i);
        play();
      });
      trackList.appendChild(item);
    });
  }

  if (playPause) playPause.addEventListener("click", togglePlay);
  if (nextTrack) nextTrack.addEventListener("click", next);
  if (prevTrack) prevTrack.addEventListener("click", prev);

  audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.duration) return;
    const pct = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    if (progressBar) progressBar.style.width = `${pct}%`;
  });

  audioPlayer.addEventListener("ended", () => next());

  // Start paused animation until user plays
  setNowPlayingState(false);
  loadTrack(currentTrackIndex);
});
