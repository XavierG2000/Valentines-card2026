document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // Time greeting in sidebar
  // =========================
  const timeGreeting = document.getElementById("timeGreeting");
  if (timeGreeting) {
    const hour = new Date().getHours();
    let msg = "FOR INDYA, FROM XAVIER";
    if (hour >= 5 && hour < 12) msg = "GOOD MORNING,🤎";
    else if (hour >= 12 && hour < 18) msg = "HAPPY VALENTINE'S DAY!";
    else msg = "GOOD EVENING,🤎";
    timeGreeting.textContent = msg;
  }

  // =========================
  // Smooth scroll for nav links
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
  // Typewriter effect
  // =========================
  const typewriterElements = document.querySelectorAll(".typewriter");
  const typedOnce = new WeakSet();

  function runTypewriter(el) {
    if (!el || typedOnce.has(el)) return;
    const fullText = (el.getAttribute("data-text") || "").trim();
    el.textContent = "";
    typedOnce.add(el);

    let i = 0;
    (function typeChar() {
      if (i <= fullText.length) {
        el.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typeChar, 20);
      }
    })();
  }

  // Run intro typewriter immediately
  typewriterElements.forEach((el) => {
    if (el.closest("#intro")) runTypewriter(el);
  });

  // Run others when visible
  const typeObserver = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && runTypewriter(entry.target)),
    { threshold: 0.65 }
  );
  typewriterElements.forEach((el) => {
    if (!el.closest("#intro")) typeObserver.observe(el);
  });

  // =========================
  // Secret toast
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

  // "Us together" button uses toast
  const usButton = document.getElementById("usButton");
  if (usButton) usButton.addEventListener("click", showToast);

  // =========================
  // Mood buttons
  // =========================
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

  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mood = btn.getAttribute("data-mood");
      moodButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (moodResponse && mood && moodTexts[mood]) {
        moodResponse.textContent = moodTexts[mood];
      }
    });
  });

  // =========================
  // Memory card reveal
  // =========================
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("revealed"));
  });

  // =========================
  // Voice notes ONLY (prevents music player from being paused)
  // =========================
  const voiceButtons = document.querySelectorAll(".audio-btn");
  const voice1 = document.getElementById("voice1");
  const voice2 = document.getElementById("voice2");
  const voiceAudios = [voice1, voice2].filter(Boolean);

  voiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-audio");
      const audio = id ? document.getElementById(id) : null;
      if (!audio) return;

      // toggle off
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        btn.classList.remove("playing");
        return;
      }

      // stop other voice notes
      voiceAudios.forEach((a) => {
        a.pause();
        a.currentTime = 0;
      });
      voiceButtons.forEach((b) => b.classList.remove("playing"));

      audio.play().catch(() => {});
      btn.classList.add("playing");
    });
  });

  // =========================
  // Reveal button
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
  // Floating hearts
  // =========================
  const heartsLayer = document.getElementById("floatingHeartsLayer");
  function createFloatingHeart() {
    if (!heartsLayer) return;
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "💗";

    const duration = 8 + Math.random() * 6;
    const left = Math.random() * 100;

    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.fontSize = `${22 + Math.random() * 20}px`;

    heartsLayer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000 + 500);
  }
  for (let i = 0; i < 18; i++) setTimeout(createFloatingHeart, i * 350);
  setInterval(createFloatingHeart, 900);

  // =========================
  // Random photos
  // =========================
  const photosLayer = document.getElementById("randomPhotosLayer");
  const photoSources = [
    "photos/photo1.jpg","photos/photo2.jpg","photos/photo3.jpg","photos/photo4.jpg",
    "photos/photo5.jpg","photos/photo6.jpg","photos/photo7.jpg","photos/photo8.jpg",
    "photos/photo9.jpg","photos/photo10.jpg","photos/photo11.jpg","photos/photo12.jpg",
    "photos/photo13.jpg","photos/photo14.jpg","photos/photo15.jpg","photos/photo16.jpg",
    "photos/photo17.jpg","photos/photo18.jpg","photos/photo19.jpg","photos/photo20.jpg",
    "photos/photo21.jpg","photos/photo22.jpg","photos/photo23.jpg","photos/photo24.jpg",
  ];

  const PHOTO_MAX_WIDTH = 260;
  let lastScrollY = window.scrollY;
  let scrollOffset = 0;

  function applyScrollTransformToPhoto(img) {
    const rotation = parseFloat(img.dataset.rotation || "0");
    img.style.transform = `translateY(${scrollOffset}px) rotate(${rotation}deg)`;
  }

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY;
    lastScrollY = currentY;

    scrollOffset -= delta * 0.5;
    scrollOffset = Math.max(-100, Math.min(100, scrollOffset));

    document.querySelectorAll(".random-photo").forEach(applyScrollTransformToPhoto);
  });

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
    const vw = window.innerWidth;
    const edge = 40;
    const gap = 24;
    const w = Math.min(PHOTO_MAX_WIDTH, vw - edge * 2);

    const leftStart = edge;
    const leftEnd = Math.max(edge, forbiddenLeftStart - gap - w);

    const rightStart = Math.min(vw - edge - w, forbiddenLeftEnd + gap);
    const rightEnd = vw - edge - w;

    const regions = [];
    if (leftEnd - leftStart > 40) regions.push([leftStart, leftEnd]);
    if (rightEnd - rightStart > 40) regions.push([rightStart, rightEnd]);

    let leftPx;
    if (regions.length) {
      const [a, b] = regions[Math.floor(Math.random() * regions.length)];
      leftPx = a + Math.random() * (b - a);
    } else {
      leftPx = edge + Math.random() * (vw - edge * 2 - w);
      leftPx = Math.max(edge, Math.min(vw - edge - w, leftPx));
    }

    return (leftPx / vw) * 100;
  }

  function spawnRandomPhoto() {
    if (!photosLayer || !photoSources.length) return;

    const currentSrcs = new Set(
      Array.from(document.querySelectorAll(".random-photo")).map((img) => img.getAttribute("src"))
    );

    const pool = photoSources.filter((s) => !currentSrcs.has(s));
    const pickFrom = pool.length ? pool : photoSources;
    const src = pickFrom[Math.floor(Math.random() * pickFrom.length)];

    const img = document.createElement("img");
    img.className = "random-photo";
    img.src = src;

    img.style.top = `${8 + Math.random() * 70}vh`;
    img.style.left = `${getSafeLeftVW()}vw`;

    const rotation = (Math.random() - 0.5) * 12;
    img.dataset.rotation = rotation.toFixed(2);

    photosLayer.appendChild(img);
    setTimeout(() => img.remove(), 9500);
  }

  setTimeout(() => {
    spawnRandomPhoto();
    setTimeout(spawnRandomPhoto, 3500);
    setInterval(spawnRandomPhoto, 9000);
  }, 1200);

  // =========================
  // Section observer (fade in + nav active)
  // =========================
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");
  const sectionsWithPhotos = new Set();

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("data-section") === id);
        });

        if (!sectionsWithPhotos.has(id)) {
          sectionsWithPhotos.add(id);
          spawnRandomPhoto();
          setTimeout(spawnRandomPhoto, 1100);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  // ==========================================================
  // Valentine Mini-Game: NO runs away (impossible)
  // ==========================================================
  const mini = document.querySelector(".valentine-mini");
  const btnBox = mini ? mini.querySelector(".valentine-buttons") : null;
  const yesBtn = mini ? mini.querySelector(".val-yes") : null;
  const noBtn = mini ? mini.querySelector(".val-no") : null;
  const resultEl = mini ? mini.querySelector(".valentine-result") : null;

  if (mini && btnBox && yesBtn && noBtn) {
    btnBox.style.position = "relative";
    yesBtn.style.position = "absolute";
    noBtn.style.position = "absolute";

    // Initial positions so they never stack
    function placeInitial() {
      const box = btnBox.getBoundingClientRect();
      const pad = 10;

      yesBtn.style.left = `${pad}px`;
      yesBtn.style.top = `12px`;

      const noW = noBtn.getBoundingClientRect().width || 100;
      noBtn.style.left = `${Math.max(pad, box.width - noW - pad)}px`;
      noBtn.style.top = `12px`;
    }

    function overlaps(a, b) {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return !(ar.right < br.left || ar.left > br.right || ar.bottom < br.top || ar.top > br.bottom);
    }

    let runawayLock = false;

    function moveNoButton() {
      if (runawayLock) return;
      runawayLock = true;

      const box = btnBox.getBoundingClientRect();
      const noR = noBtn.getBoundingClientRect();
      const pad = 10;

      const maxX = Math.max(pad, box.width - noR.width - pad);
      const maxY = Math.max(pad, box.height - noR.height - pad);

      let x = pad, y = pad, tries = 0;

      do {
        x = pad + Math.random() * (maxX - pad);
        y = pad + Math.random() * (maxY - pad);
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        tries++;
      } while (tries < 25 && overlaps(noBtn, yesBtn));

      setTimeout(() => (runawayLock = false), 120);
    }

    ["mouseenter", "pointerenter", "mouseover", "touchstart", "focus"].forEach((evt) => {
      noBtn.addEventListener(
        evt,
        (e) => {
          if (evt === "touchstart") e.preventDefault();
          moveNoButton();
        },
        { passive: false }
      );
    });

    btnBox.addEventListener("mousemove", (e) => {
      const noR = noBtn.getBoundingClientRect();
      const cx = noR.left + noR.width / 2;
      const cy = noR.top + noR.height / 2;
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < 80) moveNoButton();
    });

    yesBtn.addEventListener("click", () => {
      if (resultEl) resultEl.textContent = "Correct answer 😌💗 (I love you.)";
      showToast();
    });

    noBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      moveNoButton();
      if (resultEl) resultEl.textContent = "Nice try 😭";
    });

    // place + kick away a bit so it feels alive
    setTimeout(() => {
      placeInitial();
      moveNoButton();
    }, 0);

    window.addEventListener("resize", () => {
      placeInitial();
      moveNoButton();
    });
  }

  // ==========================================================
  // Apple Music Elite Player (NO DROPDOWN / NO QUEUE)
  // ==========================================================
  const musicPlayer = document.getElementById("musicPlayer");
  const audioA = document.getElementById("audioA");
  const audioB = document.getElementById("audioB");

  const playPause = document.getElementById("playPause");
  const prevTrack = document.getElementById("prevTrack");
  const nextTrack = document.getElementById("nextTrack");

  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");
  const progressKnob = document.getElementById("progressKnob");
  const timeLeft = document.getElementById("timeLeft");
  const timeRight = document.getElementById("timeRight");

  const volumeSlider = document.getElementById("volumeSlider");
  const playerTitle = document.getElementById("playerTitle");
  const playerArtist = document.getElementById("playerArtist");
  const playerStatus = document.getElementById("playerStatus");
  const playerArt = document.getElementById("playerArt");
  const artGlow = document.getElementById("artGlow");

  if (musicPlayer && audioA && audioB) {
    let tracks = [
      { title: "Somebody's Son", artist: "Ella Mai", src: "audio/song1.mp3", cover: "images/cover1.jpg" },
      { title: "Burning Blue", artist: "Mariah the Scientist", src: "audio/song2.mp3", cover: "images/cover2.jpg" },
      { title: "Next To You", artist: "Bryson Tiller", src: "audio/song3.mp3", cover: "images/cover3.jpg" },
      { title: "Yes It Is", artist: "Leon Thomas", src: "audio/song4.mp3", cover: "images/cover4.jpg" },
      { title: "I Need Her", artist: "Bryson Tiller", src: "audio/song5.mp3", cover: "images/cover5.jpg" },
      { title: "I Want You Around", artist: "Snoh Aalegra", src: "audio/song6.mp3", cover: "images/cover6.jpg" },
      { title: "Blessed", artist: "Daniel Caesar", src: "audio/song7.mp3", cover: "images/cover7.jpg" },
      { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", src: "audio/song8.mp3", cover: "images/cover8.jpg" },
      { title: "YUKON", artist: "Justin Bieber", src: "audio/song9.mp3", cover: "images/cover9.jpg" },
    ];

    // Shuffle tracks
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    let currentIndex = Math.floor(Math.random() * tracks.length);
    let active = "A";
    let isPlaying = false;

    // Crossfade + WebAudio
    const CROSSFADE_SEC = 1.1;
    let audioCtx = null;
    let analyser = null;
    let gainA = null;
    let gainB = null;
    let sourceA = null;
    let sourceB = null;

    const viz = document.getElementById("viz");

    function ensureAudioGraph() {
      if (audioCtx) return;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      gainA = audioCtx.createGain();
      gainB = audioCtx.createGain();
      gainA.gain.value = 0;
      gainB.gain.value = 0;

      sourceA = audioCtx.createMediaElementSource(audioA);
      sourceB = audioCtx.createMediaElementSource(audioB);

      sourceA.connect(gainA);
      sourceB.connect(gainB);

      gainA.connect(analyser);
      gainB.connect(analyser);

      analyser.connect(audioCtx.destination);
    }

    function fmtTime(s) {
      if (!isFinite(s) || s < 0) return "0:00";
      const m = Math.floor(s / 60);
      const r = Math.floor(s % 60);
      return `${m}:${r.toString().padStart(2, "0")}`;
    }

    function setStatus(t) {
      if (playerStatus) playerStatus.textContent = t || "";
    }

    function setUIPlaying(playing) {
      isPlaying = playing;
      musicPlayer.classList.toggle("paused", !playing);
      if (playPause) playPause.textContent = playing ? "⏸" : "▶";
    }

    function getActiveAudio() {
      return active === "A" ? audioA : audioB;
    }
    function getInactiveAudio() {
      return active === "A" ? audioB : audioA;
    }
    function activeGain() {
      return active === "A" ? gainA : gainB;
    }
    function inactiveGain() {
      return active === "A" ? gainB : gainA;
    }

    function applyCoverGlowFromImage(imgEl) {
      if (!imgEl || !artGlow) return;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgEl.src;

      img.onload = () => {
        try {
          const c = document.createElement("canvas");
          const ctx = c.getContext("2d", { willReadFrequently: true });
          const w = 48, h = 48;
          c.width = w; c.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          const data = ctx.getImageData(0, 0, w, h).data;

          let r = 0, g = 0, b = 0, n = 0;
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
          }
          r = Math.round(r / n);
          g = Math.round(g / n);
          b = Math.round(b / n);

          artGlow.style.background =
            `radial-gradient(circle at 30% 30%, rgba(${r},${g},${b},0.45), rgba(${r},${g},${b},0.08) 60%, rgba(0,0,0,0) 70%)`;
        } catch {}
      };
    }

    function setNowPlaying(t) {
      if (playerTitle) playerTitle.textContent = t.title || "";
      if (playerArtist) playerArtist.textContent = t.artist || "";
      if (playerArt) {
        playerArt.src = t.cover || "";
        applyCoverGlowFromImage(playerArt);
      }
    }

    function loadInto(audioEl, t) {
      audioEl.src = t.src;
      audioEl.load();
    }

    function crossfadeTo(incomingEl, outgoingEl, vol) {
      const incomingG = incomingEl === audioA ? gainA : gainB;
      const outgoingG = outgoingEl === audioA ? gainA : gainB;

      const start = performance.now();
      const dur = CROSSFADE_SEC * 1000;

      incomingG.gain.value = 0;
      outgoingG.gain.value = vol;

      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        incomingG.gain.value = vol * p;
        outgoingG.gain.value = vol * (1 - p);

        if (p < 1) requestAnimationFrame(tick);
        else {
          outgoingEl.pause();
          outgoingEl.currentTime = 0;
        }
      };
      requestAnimationFrame(tick);
    }

    async function playIndex(index, userInitiated = false) {
      currentIndex = (index + tracks.length) % tracks.length;
      const t = tracks[currentIndex];
      setNowPlaying(t);

      ensureAudioGraph();
      if (audioCtx && audioCtx.state === "suspended") {
        // iOS/Safari needs user gesture sometimes
        if (userInitiated) await audioCtx.resume().catch(() => {});
      }

      const incoming = getInactiveAudio();
      const outgoing = getActiveAudio();
      loadInto(incoming, t);

      const vol = volumeSlider ? parseFloat(volumeSlider.value || "0.55") : 0.55;

      try {
        await incoming.play();
        setUIPlaying(true);
        setStatus("");

        crossfadeTo(incoming, outgoing, vol);

        // swap active
        active = active === "A" ? "B" : "A";
      } catch {
        setUIPlaying(false);
        setStatus("Tap ▶ once to enable sound");
      }
    }

    function next(userInitiated = true) {
      playIndex(currentIndex + 1, userInitiated);
    }

    function prev(userInitiated = true) {
      const a = getActiveAudio();
      if (a.currentTime > 3) {
        a.currentTime = 0;
        return;
      }
      playIndex(currentIndex - 1, userInitiated);
    }

    function updateProgress() {
      const a = getActiveAudio();
      const dur = a.duration || 0;
      const cur = a.currentTime || 0;

      if (timeLeft) timeLeft.textContent = fmtTime(cur);
      if (timeRight) timeRight.textContent = fmtTime(dur);

      const pct = dur > 0 ? (cur / dur) * 100 : 0;
      if (progressBar) progressBar.style.width = `${pct}%`;
      if (progressKnob) progressKnob.style.left = `${pct}%`;
    }

    function seekTo(clientX) {
      const a = getActiveAudio();
      if (!progressContainer || !a.duration) return;
      const rect = progressContainer.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const pct = x / rect.width;
      a.currentTime = pct * a.duration;
      updateProgress();
    }

    let scrubbing = false;

    if (progressContainer) {
      progressContainer.addEventListener("pointerdown", (e) => {
        scrubbing = true;
        seekTo(e.clientX);
      });
      window.addEventListener("pointermove", (e) => {
        if (!scrubbing) return;
        seekTo(e.clientX);
      });
      window.addEventListener("pointerup", () => (scrubbing = false));
    }

    if (nextTrack) nextTrack.addEventListener("click", () => next(true));
    if (prevTrack) prevTrack.addEventListener("click", () => prev(true));

    if (playPause) {
      playPause.addEventListener("click", async () => {
        ensureAudioGraph();
        if (audioCtx && audioCtx.state === "suspended") await audioCtx.resume().catch(() => {});

        const a = getActiveAudio();
        const vol = volumeSlider ? parseFloat(volumeSlider.value || "0.55") : 0.55;

        if (a.paused) {
          try {
            await a.play();
            activeGain().gain.value = vol;
            inactiveGain().gain.value = 0;
            setUIPlaying(true);
            setStatus("");
          } catch {
            setUIPlaying(false);
            setStatus("Tap ▶ once to enable sound");
          }
        } else {
          a.pause();
          setUIPlaying(false);
        }
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener("input", () => {
        if (!gainA || !gainB) return;
        const vol = parseFloat(volumeSlider.value || "0.55");
        activeGain().gain.value = isPlaying ? vol : 0;
        inactiveGain().gain.value = 0;
      });
    }

    // keep progress UI in sync
    audioA.addEventListener("timeupdate", updateProgress);
    audioB.addEventListener("timeupdate", updateProgress);
    audioA.addEventListener("loadedmetadata", updateProgress);
    audioB.addEventListener("loadedmetadata", updateProgress);

    // auto-next when the active one ends
    audioA.addEventListener("ended", () => next(false));
    audioB.addEventListener("ended", () => next(false));

    // Viz tick (real analyzer)
    function tickViz() {
      if (!viz) return requestAnimationFrame(tickViz);
      if (!analyser || !isPlaying) return requestAnimationFrame(tickViz);

      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      const bars = Array.from(viz.querySelectorAll("span"));
      const step = Math.floor(data.length / bars.length) || 1;

      bars.forEach((bar, i) => {
        const v = data[i * step] / 255;
        bar.style.height = `${4 + v * 18}px`;
        bar.style.opacity = `${0.45 + v * 0.55}`;
      });

      requestAnimationFrame(tickViz);
    }
    requestAnimationFrame(tickViz);

    // INIT
    setUIPlaying(false);
    setStatus("Loading…");

    // Load first track into audioA, then try autoplay
    const first = tracks[currentIndex];
    setNowPlaying(first);
    loadInto(audioA, first);
    active = "A";

    setTimeout(async () => {
      setStatus("");
      ensureAudioGraph();

      const vol = volumeSlider ? parseFloat(volumeSlider.value || "0.55") : 0.55;
      gainA.gain.value = 0;
      gainB.gain.value = 0;

      try {
        await audioA.play();
        gainA.gain.value = vol;
        setUIPlaying(true);
      } catch {
        setUIPlaying(false);
        setStatus("Tap ▶ once to enable sound");
      }
    }, 450);
  }
});

