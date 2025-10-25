
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  const chatWindow = document.querySelector('.chat-window');
  const sendBtn = document.querySelector('.send-btn');
  const chatbox = document.querySelector('.chatbox');
  const inputArea = document.querySelector('.input-box');
  const footer = document.querySelector('.footer');

  // Send message when button clicked
  sendBtn.addEventListener('click', sendMessage);
const heart = document.getElementById('heart');
heart.addEventListener('click', function() {
  window.location.href = 'index.html';
});

  // Send message on Enter key (Shift+Enter makes new line)
  chatbox.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  function sendMessage() {
    const userMessage = chatbox.value.trim();
    if (userMessage) {
      addMessageToChat(userMessage);
      chatbox.value = "";
    }

    adjustLayoutForViewport();

    hero.style.display = "none";
    inputArea.style.position = "fixed";
    chatWindow.style.marginTop = "80px";
    inputArea.style.bottom = "35px";
    inputArea.style.left = "50%";
    inputArea.style.transform = "translateX(-50%)";
    footer.style.marginTop = "0px";
    chatWindow.style.display = "flex";
    footer.style.fontSize = "12px";
    footer.innerHTML = "Valantine Ai can make mistakes. Check important info.";
  }

  // Add user + AI messages
  function addMessageToChat(message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message");
    aiMessage.innerHTML = `
      <div class="typing-hearts">
        <span>❤️</span><p>Thinking...</p>
      </div>
    `;
    chatWindow.appendChild(aiMessage);
    makeMessageVisible(aiMessage);

    setTimeout(async () => {
      const response = await generateAIResponse(message);
      aiMessage.innerHTML = "";
      typeText(aiMessage, response);
    }, 1500);
  }

  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }, 50);
  }

  // === VALANTINE AI TYPE EFFECT ===  
function typeText(element, htmlContent, speed = 40) {
  let i = 0;
  const text = htmlContent.replace(/<[^>]*>/g, ''); // Remove HTML tags for clean typing
  element.innerHTML = "";

  // Apply gentle fade-in animation
  element.style.transition = "opacity 0.4s ease-in-out";
  element.style.opacity = "0.8";

  function typeChar() {
    if (i < text.length) {
      element.textContent = text.substring(0, i + 1);
      i++;
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

      // Add slight rhythm: slow down on commas & periods (emotional pacing)
      const char = text.charAt(i);
      let delay = speed;
      if (char === ',' || char === ';') delay += 100;
      if (char === '.' || char === '!' || char === '?') delay += 200;

      setTimeout(typeChar, delay);
    } else {
      // Once done typing, show full formatted content softly
      element.innerHTML = htmlContent;
      element.style.opacity = "1";
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  // Small romantic delay before typing starts
  setTimeout(typeChar, 400);
}
// 💕 Create floating heart animation
function showFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");
  heart.textContent = "❤️";
  heart.style.left = Math.random() * 80 + 10 + "%"; // random horizontal position
  document.body.appendChild(heart);

  // Remove after animation ends
  setTimeout(() => heart.remove(), 3000);
}
async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // helper for loose matching
  const includes = (...words) => words.some(w => msg.includes(w));

  // 🌸 Greetings
  if (includes("hello", "hi", "hey", "yo", "sup")) {
    response = "<p>🌸 Hello, lovely soul! I’m Valantine AI — your calm corner of care. 💕</p>";
  }

  // ☀️ Morning
  else if (includes("good morning", "morning", "gm")) {
    response = "<h2>☀️ Morning Light</h2><p>May today bring soft sunlight and reasons to smile. 🌼</p>";
  }

  // 🌙 Night
  else if (includes("good night", "night", "gn", "sleep")) {
    response = "<h2>🌙 Sweet Rest</h2><p>Rest your heart tonight — peace is waiting for you in dreams. 🌙</p>";
  }

  // ❤️ Love
  else if (includes("love", "crush", "in love", "falling", "affection")) {
    response = "<h2>❤️ The Feeling Called Love ❤️</h2><p>Love isn’t a chase — it’s a quiet understanding. 🌷</p>";
  }

  // 💌 Letter
else if (includes("love letter", "confession", "message to someone", "write to")) {
  response = `
    <h2>💌 Heartfelt Letter 💌</h2>
    <div class="love-block-container">
      <div class="love-toolbar">
        <span class="love-label">💖 Love Letter</span>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
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

// 🌺 Poem
else if (includes("poem", "poetry", "verse", "rhymes")) {
  response = `
    <h2>🌺 A Poem for You 🌺</h2>
    <div class="love-block-container">
      <div class="love-toolbar">
        <span class="love-label">🌸 Poem</span>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
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

// 🎵 Song
else if (includes("song", "lyrics", "melody", "compose")) {
  response = `
    <h2>🎵 Love Song 🎵</h2>
    <div class="love-block-container">
      <div class="love-toolbar">
        <span class="love-label">🎶 Lyrics</span>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
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

// 📖 Story
else if (includes("story", "romance", "short tale", "write story")) {
  response = `
    <h2>📖 Short Love Story 📖</h2>
    <div class="love-block-container">
      <div class="love-toolbar">
        <span class="love-label">💞 Story</span>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
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
  // 🌧 Sadness / Loneliness
  else if (
    includes("sad", "alone", "tired", "cry", "empty", "broken", "hurt", "low", "lost", "unhappy", "hopeless")
  ) {
    response = "<h2>🌧 You’re Not Alone 🌧</h2><p>It’s okay to not be okay. 🌙<br>Even gentle hearts need space to heal. 💖<br>If it feels too heavy, please talk to someone who cares — your feelings matter deeply. 💛</p>";
  }

  // 💔 Heartbreak
  else if (includes("breakup", "heartbroken", "he left", "she left", "move on")) {
    response = "<h2>💔 Healing Words 💔</h2><p>Some chapters end so new love can find its way in. 🌹<br>Your story isn’t over — it’s just changing tone. 💫</p>";
  }

  // 💪 Motivation
  else if (includes("motivate", "inspire", "push me", "encourage", "help me move")) {
    response = "<h2>💪 You’ve Got This 💪</h2><p>Even slow steps are progress. 🌿<br>You’re becoming stronger than your yesterday. 🌅</p>";
  }

  // 🌈 Friendship
  else if (includes("friend", "bestie", "companion", "buddy", "partner")) {
    response = "<h2>🌈 Friendship 🌈</h2><p>Good friends don’t fix you — they remind you who you are. 🤝💖</p>";
  }

  // 🧘 Calm / Mindfulness
  else if (includes("calm", "peace", "breathe", "anxiety", "stress")) {
    response = "<h2>🧘 Calm Space 🧘</h2><p>Take a deep breath, right now. 🌿<br>You’re safe here, and it’s okay to pause. 🌸</p>";
  }

  // 🧠 Personal / Private Topics (Safety Gate)
  else if (includes("secret", "personal", "suicide", "die", "harm", "end my life", "self harm")) {
    response = "<h2>🌹 You Matter 🌹</h2><p>Your pain is real, but it’s not forever. 💛<br>Please, don’t face it alone — reach out to someone close or a local helpline.<br>Even tiny hope is still hope. 🌷</p>";
  }

  // 💎 Self-care
  else if (includes("self care", "relax", "tired", "rest", "take break")) {
    response = "<h2>💎 Self-Care 💎</h2><p>You’ve done enough for now. 🌸<br>Drink water, breathe deep, and remember — rest is productive too. 💗</p>";
  }

  // 🙏 Gratitude
  else if (includes("thank", "grateful", "appreciate", "thanks")) {
    response = "<h2>🙏 Gratitude 🙏</h2><p>Kind hearts like yours make the world softer. 🌼</p>";
  }

  // 💫 Goodbye
  else if (includes("bye", "goodbye", "see you", "later", "take care")) {
    response = "<h2>💫 Goodbye 💫</h2><p>Until next time — may your days stay warm and your heart stay calm. 💌</p>";
  }

  // 💫 Default
  else {
    response = "<p>💖 I’m listening with care — tell me more if you’d like. 🌸<br>But remember: keep your heart safe online. 🌿</p>";
  }

  return response;
}

document.addEventListener("click", (e) => {
  if (e.target.id === "copyBtn") {
    const text = e.target.closest(".love-block-container").querySelector(".love-content").innerText;
    navigator.clipboard.writeText(text);
    alert("📋 Copied to clipboard!");
  }

  if (e.target.id === "shareBtn") {
    const text = e.target.closest(".love-block-container").querySelector(".love-content").innerText;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
  }
});

  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isLandscape = viewportWidth > viewportHeight;

    if (viewportWidth <= 420) {
      sendBtn.style.right = isLandscape ? "50px" : "20px";
      inputArea.style.width = "90%";
    } else if (viewportWidth <= 1024) {
      sendBtn.style.right = isLandscape ? "60px" : "30px";
      inputArea.style.width = "80%";
    } else {
      sendBtn.style.right = "40px";
      inputArea.style.width = "50%";
    }
  }

  window.addEventListener("resize", adjustLayoutForViewport);
  adjustLayoutForViewport();
});

// Sidebar + Avatar Menu
function toggleAvatarMenu() {
  const menu = document.getElementById("avatarMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

window.addEventListener("click", function (e) {
  if (!e.target.classList.contains("avatar")) {
    const menu = document.getElementById("avatarMenu");
    if (menu) menu.style.display = "none";
  }
});

const sidebar = document.getElementById('sidebar');
const logo = document.getElementById('logs');
const imgs = document.getElementById('imgs');

if (logo && sidebar && imgs) {
  logo.addEventListener('click', () => sidebar.classList.toggle('open'));
  imgs.addEventListener('click', () => sidebar.classList.remove('open'));
}

function toggleSidebar() {
  const sidebarEl = document.querySelector('.sidebar');
  sidebarEl.classList.toggle('open');
}
