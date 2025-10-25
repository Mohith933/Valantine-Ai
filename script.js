
document.addEventListener('DOMContentLoaded', function () {
  // ---- element refs ----
  const hero = document.querySelector('.hero');
  const chatWindow = document.querySelector('.chat-window');
  const sendBtn = document.querySelector('.send-btn');
  const chatbox = document.querySelector('.chatbox');
  const inputArea = document.querySelector('.input-box');
  const footer = document.querySelector('.footer');
  const heartLogo = document.getElementById('heart'); // optional

  // safe guards
  if (!chatWindow || !sendBtn || !chatbox) return;

  // navigate home if heart clicked (optional)
  if (heartLogo) {
    heartLogo.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // send events
  sendBtn.addEventListener('click', sendMessage);
  chatbox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  window.addEventListener('resize', adjustLayoutForViewport);
  adjustLayoutForViewport();

  // ---- main send ----
  function sendMessage() {
    const userMessage = chatbox.value.trim();
    if (!userMessage) return;

    addMessageToChat(userMessage);
    chatbox.value = "";

    // layout changes
    hero && (hero.style.display = "none");
    inputArea.style.position = "fixed";
    inputArea.style.bottom = "35px";
    inputArea.style.left = "50%";
    inputArea.style.transform = "translateX(-50%)";
    chatWindow.style.marginTop = "80px";
    chatWindow.style.display = "flex";
    footer.style.marginTop = "0px";
    footer.style.fontSize = "12px";
    footer.innerHTML = "Valantine Ai can make mistakes. Check important info.";
  }

  // ---- add messages & AI placeholder ----
  function addMessageToChat(message) {
    // user message
    const userMsg = document.createElement("div");
    userMsg.className = "message user-message";
    userMsg.textContent = message;
    chatWindow.appendChild(userMsg);
    makeMessageVisible(userMsg);

    // ai placeholder with dynamic heart + status
    const aiMsg = document.createElement("div");
    aiMsg.className = "message ai-message";
    aiMsg.innerHTML = `
      <div class="ai-typing">
        <span class="ai-heart" aria-hidden="true">❤️</span>
        <span class="ai-status">Thinking...</span>
      </div>
    `;
    chatWindow.appendChild(aiMsg);
    makeMessageVisible(aiMsg);

    // animate the heart (small rotation loop via inline CSS keyframes fallback)
    animateHeart(aiMsg.querySelector('.ai-heart'));

    // show floating heart little effect
    showFloatingHeart();

    // dynamic status: Thinking -> Generating -> done
    setTimeout(() => {
      const status = aiMsg.querySelector('.ai-status');
      if (status) status.textContent = 'Generating...';
    }, 700);

    // get response and type it
    setTimeout(async () => {
      const response = await generateAIResponse(message);
      // type response into aiMsg
      typeText(aiMsg, response, 22);
    }, 1400);
  }

  // show with animation and scroll
  function makeMessageVisible(el) {
    setTimeout(() => {
      el.classList.add('visible');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 50);
  }

  // typing effect — strips tags for pacing but restores full HTML at the end
  function typeText(element, htmlContent, speed = 20) {
    // build plain-text for typing, but keep html for final
    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;
    const text = temp.innerText;
    element.innerHTML = ''; // clear placeholder

    let i = 0;

    function typeChar() {
      if (i < text.length) {
        // show progressively (plain text while typing)
        element.textContent = text.substring(0, i + 1);
        i++;
        // punctuation rhythm
        const ch = text.charAt(i);
        let delay = speed;
        if (ch === ',' || ch === ';') delay += 80;
        if (ch === '.' || ch === '!' || ch === '?') delay += 180;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        setTimeout(typeChar, delay);
      } else {
        // final: restore full HTML content
        element.innerHTML = htmlContent;
        makeMessageVisible(element); // ensure visible class
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    }

    // small pre-typing pause for feel
    setTimeout(typeChar, 320);
  }

  // small rotating heart animation helper (uses inline transform loop)
  function animateHeart(heartEl) {
    if (!heartEl) return;
    let angle = 0;
    const id = setInterval(() => {
      angle = (angle + 6) % 360;
      heartEl.style.display = 'inline-block';
      heartEl.style.transform = `rotate(${angle}deg) scale(${1 + 0.02 * Math.sin(angle / 10)})`;
      heartEl.style.transition = 'transform 80ms linear';
    }, 80);

    // stop after a while (keeps some subtle effect)
    setTimeout(() => clearInterval(id), 3000);
  }

  // floating heart effect (simple)
  function showFloatingHeart() {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = '❤️';
    // styling inline so you don't have to change CSS
    Object.assign(el.style, {
      position: 'fixed',
      bottom: '-10px',
      left: Math.random() * 70 + 15 + '%',
      fontSize: '20px',
      opacity: '0.9',
      pointerEvents: 'none',
      zIndex: 9999,
      transform: 'translateY(0) scale(0.8)',
      transition: 'transform 2600ms cubic-bezier(.2,.9,.1,1), opacity 2600ms ease'
    });
    document.body.appendChild(el);

    // animate up + fade
    requestAnimationFrame(() => {
      el.style.transform = 'translateY(-120vh) scale(1.4)';
      el.style.opacity = '0';
    });

    setTimeout(() => el.remove(), 3000);
  }

  // safe includes helper
  function includesAny(msg, arr) {
    return arr.some(w => msg.includes(w));
  }

  // ---- AI response logic (valid template strings only) ----
  async function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase().trim();

    // helper
    const includes = (...words) => includesAny(msg, words);

    // responses (strings of HTML)
    if (includes('hello', 'hi', 'hey', 'yo', 'sup')) {
      return `<p>🌸 Hello, lovely soul! I’m <strong>Valantine AI</strong> — your calm corner of care. 💕</p>`;
    }

    if (includes('good morning', 'morning', 'gm')) {
      return `<h2>☀️ Morning Light</h2><p>May today bring soft sunlight and reasons to smile. 🌼</p>`;
    }

    if (includes('good night', 'night', 'gn', 'sleep')) {
      return `<h2>🌙 Sweet Rest</h2><p>Rest your heart tonight — peace is waiting for you in dreams. 🌙</p>`;
    }

    if (includes('love', 'crush', 'confession')) {
      return `
        <h2>💌 Heartfelt Letter</h2>
        <div class="love-block-container">
          <div class="love-toolbar">
            <span class="love-label">💖 Love Letter</span>
            <div class="btn-group">
              <button class="copy-btn">📋 Copy</button>
              <button class="share-btn">💌 Share</button>
            </div>
          </div>
          <pre class="love-content" contenteditable="true">
My Dearest [Name],

Every word I write carries a piece of my heart.
I may not always say it aloud, but you mean more than I can express.
Your smile feels like sunrise, your silence — poetry.

Forever yours,
[Your Name] 💕
          </pre>
        </div>`;
    }

    if (includes('poem', 'poetry', 'verse', 'rhymes')) {
      return `
        <h2>🌺 A Poem for You 🌺</h2>
        <div class="love-block-container">
          <div class="love-toolbar">
            <span class="love-label">🌸 Poem</span>
            <div class="btn-group">
              <button class="copy-btn">📋 Copy</button>
              <button class="share-btn">💌 Share</button>
            </div>
          </div>
          <pre class="love-content" contenteditable="true">
You're a melody wrapped in light,
A whisper turning into flight.
Even when the stars fade away,
Your warmth stays — in my heart to stay. 💫
          </pre>
        </div>`;
    }

    if (includes('song', 'lyrics', 'melody', 'compose')) {
      return `
        <h2>🎵 Love Song 🎵</h2>
        <div class="love-block-container">
          <div class="love-toolbar">
            <span class="love-label">🎶 Lyrics</span>
            <div class="btn-group">
              <button class="copy-btn">📋 Copy</button>
              <button class="share-btn">💌 Share</button>
            </div>
          </div>
          <pre class="love-content" contenteditable="true">
(Verse)
Your eyes caught me like sunrise glow,
Every word you speak, soft and slow.

(Chorus)
Hold me closer, in this dream tonight,
Your love is my rhythm, my guiding light. 💗
          </pre>
        </div>`;
    }

    if (includes('story', 'short tale')) {
      return `
        <h2>📖 Short Love Story 📖</h2>
        <div class="love-block-container">
          <div class="love-toolbar">
            <span class="love-label">💞 Story</span>
            <div class="btn-group">
              <button class="copy-btn">📋 Copy</button>
              <button class="share-btn">💌 Share</button>
            </div>
          </div>
          <pre class="love-content" contenteditable="true">
Once upon a soft sunrise, two hearts met — not by chance,
but by destiny’s whisper.
They didn’t speak much, yet the silence bloomed louder than words.
And in that quiet, love found its way home. 💕
          </pre>
        </div>`;
    }

    if (includes('sad', 'alone', 'tired', 'cry', 'empty', 'broken', 'hurt', 'low', 'lost')) {
      return `<h2>🌧 You’re Not Alone 🌧</h2><p>It’s okay to not be okay. Even gentle hearts need space to heal. If it's too heavy, please reach out — you matter deeply. 💛</p>`;
    }

    if (includes('motivate', 'inspire', 'push me')) {
      return `<h2>💪 You’ve Got This 💪</h2><p>Even slow steps are progress — you’re stronger than your yesterday. 🌷</p>`;
    }

    if (includes('bye', 'goodbye', 'see you')) {
      return `<h2>💫 Goodbye 💫</h2><p>Until next time — may your days stay warm and your heart stay calm. 💌</p>`;
    }

    // default
    return `<p>💖 I’m listening with care — tell me more if you’d like. 🌸</p>`;
  }

  // ---- copy/share/save delegation ----
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.copy-btn');
    const shareBtn = e.target.closest('.share-btn');
    const saveBtn = e.target.closest('.save-btn'); // reserved if needed

    if (copyBtn) {
      const container = copyBtn.closest('.love-block-container') || copyBtn.closest('.editable-container') || copyBtn.closest('.code-block-container');
      if (!container) return;
      const contentEl = container.querySelector('.love-content, .editable-content, .code-content, pre');
      if (!contentEl) return;
      const text = contentEl.innerText;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✅ Copied';
        setTimeout(() => (copyBtn.textContent = '📋 Copy'), 2000);
      });
    }

    if (shareBtn) {
      const container = shareBtn.closest('.love-block-container') || shareBtn.closest('.editable-container');
      if (!container) return;
      const contentEl = container.querySelector('.love-content, .editable-content, pre');
      if (!contentEl) return;
      const text = contentEl.innerText;
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }

    if (saveBtn) {
      // placeholder for save behavior (e.g., localStorage)
      const container = saveBtn.closest('.editable-container') || saveBtn.closest('.code-block-container');
      if (!container) return;
      const contentEl = container.querySelector('.editable-content, .code-content, .love-content, pre');
      if (!contentEl) return;
      localStorage.setItem('valantine_saved_' + Date.now(), contentEl.innerText);
      saveBtn.textContent = '💾 Saved';
      setTimeout(() => (saveBtn.textContent = '💾 Save'), 1500);
    }
  });

  // ---- layout responsiveness ----
  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;
    const isLandscape = window.innerWidth > window.innerHeight;
    if (viewportWidth <= 420) {
      sendBtn.style.right = isLandscape ? '50px' : '20px';
      inputArea.style.width = '90%';
    } else if (viewportWidth <= 1024) {
      sendBtn.style.right = isLandscape ? '60px' : '30px';
      inputArea.style.width = '80%';
    } else {
      sendBtn.style.right = '40px';
      inputArea.style.width = '50%';
    }
  }
}); // DOMContentLoaded
