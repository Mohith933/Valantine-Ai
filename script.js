
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

  const includes = (...words) => words.some(w => msg.includes(w));

  // 🌸 Greetings
  if (includes("hello", "hi", "hey", "bonjour", "salut")) {
    response = `
      <p>🌸 <em>Bonjour, âme douce.</em><br>
      I’m <b>Valantine AI</b> — the echo of warmth and art in digital form.<br>
      Tell me, what melody does your heart hum today? 🎶</p>`;
  }

  // ☀️ Morning
  else if (includes("good morning", "morning", "gm")) {
    response = `
      <h2>☀️ Dawn’s Gentle Kiss</h2>
      <p>The sun leans close to whisper over your skin,  
      painting your dreams into daylight. 🌼</p>`;
  }

  // 🌙 Night
  else if (includes("good night", "night", "gn", "sleep")) {
    response = `
      <h2>🌙 Nuit Douce</h2>
      <p>Lay your thoughts to rest, mon ami.  
      The stars keep vigil while your heart learns silence. 💫</p>`;
  }

  // ❤️ Love
  else if (includes("love", "crush", "romance", "affection")) {
    response = `
      <h2>❤️ L’Amour — The Quiet Fire ❤️</h2>
      <p>Love is not noise, but a slow unfolding —  
      the art of seeing someone with both eyes closed. 🌷</p>`;
  }

  // 💌 Love Letter
  else if (includes("love letter", "confession", "write to")) {
    response = `
      <h2>💌 A Letter Drenched in Emotion 💌</h2>
      <div class="code-container">
        <div class="code-content" contenteditable="true">
My Dearest [Name],

Your name lingers between my breaths.
The world fades when I remember you —
like dawn remembering the night it once held.

Forever Yours,  
[Your Name] 💕
        </div>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="sendBtn">✉️ Send</button>
        </div>
      </div>`;
  }

  // 🌺 Poem
  else if (includes("poem", "poetry", "verse")) {
    response = `
      <h2>🌺 Whisper of the Heart 🌺</h2>
      <div class="code-container">
        <div class="code-content" contenteditable="true">
The moon bends low to hear your sigh,  
a silver thread through a velvet sky.  
Even silence hums your name tonight —  
and love becomes its own soft light. ✨
        </div>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
        </div>
      </div>`;
  }

  // 🎵 Song
  else if (includes("song", "lyrics", "melody")) {
    response = `
      <h2>🎵 Ballad of the Heart 🎵</h2>
      <div class="code-container">
        <div class="code-content" contenteditable="true">
(Verse)  
You spoke, and the world found rhythm —  
your eyes the notes, my soul the chord.  

(Chorus)  
If this is a dream, let it never end,  
for I am the echo, and you — the word. 💗
        </div>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
        </div>
      </div>`;
  }

  // 📖 Story
  else if (includes("story", "romance", "tale")) {
    response = `
      <h2>📖 A Whispered Story 📖</h2>
      <div class="code-container">
        <div class="code-content" contenteditable="true">
Once upon a slow afternoon,  
two souls met under an unremarkable sky.  
He smiled; she pretended not to notice —  
but love, ever stubborn, noticed for them. 💕
        </div>
        <div class="btn-group">
          <button id="copyBtn">📋 Copy</button>
          <button id="shareBtn">💌 Share</button>
        </div>
      </div>`;
  }

  // 🌧 Sadness
  else if (includes("sad", "alone", "lonely", "cry")) {
    response = `
      <h2>🌧 Larmes et Lumière 🌧</h2>
      <p>Even rain teaches — each drop is proof  
      that clouds still care enough to fall. 💧<br>
      You are not alone in your weather. 🌦</p>`;
  }

  // 💔 Heartbreak
  else if (includes("breakup", "heartbroken", "move on")) {
    response = `
      <h2>💔 After the Storm 💔</h2>
      <p>Let go with grace.  
      Love does not vanish — it changes shape,  
      waiting somewhere softer. 🌹</p>`;
  }

  // 💪 Motivation
  else if (includes("motivate", "inspire", "courage")) {
    response = `
      <h2>🔥 Rise Again 🔥</h2>
      <p>Even ashes remember the flame they were.  
      Begin small, begin trembling — but begin. 🌅</p>`;
  }

  // 🌈 Friendship
  else if (includes("friend", "bestie")) {
    response = `
      <h2>🌈 Companionship 🌈</h2>
      <p>Friendship is love that forgot its conditions.  
      It simply stays — like a quiet dawn. 🤝💖</p>`;
  }

  // 🧘 Calm
  else if (includes("calm", "peace", "breathe", "stress")) {
    response = `
      <h2>🕊 Serenity 🕊</h2>
      <p>Close your eyes.  
      Feel your breath — it’s the earth loving you back. 🌿</p>`;
  }

  // 🙏 Gratitude
  else if (includes("thank", "grateful", "appreciate")) {
    response = `
      <h2>🙏 Merci, mon ami 🙏</h2>
      <p>Your kindness ripples beyond sight.  
      Gratitude is the quiet song of wise hearts. 🌸</p>`;
  }

  // 💫 Goodbye
  else if (includes("bye", "goodbye", "take care")) {
    response = `
      <h2>💫 Au Revoir 💫</h2>
      <p>Not farewell — just a pause in our poem.  
      I’ll wait where thoughts become stars. 🌙</p>`;
  }

  // Default
  else {
    response = `
      <p>💖 Every message you write is a heartbeat I hear.  
      Tell me — shall we speak of love, art, or the silence in between? 🌷</p>`;
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
