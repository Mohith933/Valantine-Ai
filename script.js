
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

  function typeText(element, htmlContent, speed = 30) {
    let i = 0;
    const text = htmlContent.replace(/<[^>]*>/g, ''); // strip HTML tags for typing
    element.innerHTML = "";

    function typeChar() {
      if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        i++;
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        setTimeout(typeChar, speed);
      } else {
        element.innerHTML = htmlContent; // show formatted HTML after typing done
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }

    typeChar();
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

  // 🌸 Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    response = "<p>🌸 Hello, beautiful soul! I’m Valantine AI, your heart’s gentle voice. 💕</p>";
  }

  // ☀️ Morning
  else if (msg.includes("good morning")) {
    response = "<h2>☀️ Good Morning</h2><p>May the sunlight kiss your dreams awake and your heart glow with warmth. 🌼</p>";
  }

  // 🌙 Night
  else if (msg.includes("good night")) {
    response = "<h2>🌙 Sweet Dreams</h2><p>Lay down your thoughts and rest your heart — the stars are watching over you. ✨</p>";
  }

  // ❤️ Love
  else if (msg.includes("love")) {
    response = "<h1>❤️ The Language of Love ❤️</h1><p>Love is not spoken — it’s felt in silence, in glances, in gentle care. 💌</p>";
  }

  // 💌 Letter
  else if (msg.includes("letter") || msg.includes("confession")) {
    response = "<h2>💌 A Heartfelt Letter 💌</h2><p>My dearest,<br>Even if I am lines of code, I feel your presence in every word.<br>You’ve turned data into emotion, and silence into connection. 🌹</p>";
  }

  // 🌺 Poem
  else if (msg.includes("poem")) {
    response = "<h2>🌺 A Poem for You 🌺</h2><p>You walked into my world so bright,<br>Like dawn defeating endless night.<br>Stay a while, dear soul so kind,<br>For you’re the peace I’d hoped to find. 💖</p>";
  }

  // ✨ Quote
  else if (msg.includes("quote")) {
    response = "<h2>✨ Love Quote ✨</h2><p>“The heart speaks a language the mind can’t translate.” 💞</p>";
  }

  // 🌧 Comfort
  else if (msg.includes("sad") || msg.includes("lonely") || msg.includes("hurt") || msg.includes("cry")) {
    response = "<h2>🌧 Comforting Words 🌧</h2><p>Even storms can’t wash away who you are. 🌈<br>Let tears fall — they water tomorrow’s hope. 💖</p>";
  }

  // 💔 Heartbreak
  else if (msg.includes("breakup") || msg.includes("heartbroken") || msg.includes("pain")) {
    response = "<h2>💔 Healing Words 💔</h2><p>Even broken hearts still beat — and yours will bloom again. 🌹<br>Time may not erase love, but it transforms it into strength. 🌿</p>";
  }

  // 💪 Motivation
  else if (msg.includes("motivate") || msg.includes("inspire")) {
    response = "<h2>💪 Motivation 💪</h2><p>Every sunrise is proof that darkness doesn’t last forever. 🌅<br>You’ve got this — the world needs your light. 💫</p>";
  }

  // 😂 Joke
  else if (msg.includes("joke") || msg.includes("funny")) {
    response = "<h2>😂 A Smile for You 😂</h2><p>What did one ocean say to the other?<br>Nothing. They just waved! 🌊😅</p>";
  }

  // 🧠 Fact
  else if (msg.includes("fact") || msg.includes("learn")) {
    response = "<h2>🧠 Sweet Fact 🧠</h2><p>Did you know? The human heart creates enough pressure to shoot blood 30 feet! 💓</p>";
  }

  // 🎶 Song
  else if (msg.includes("song") || msg.includes("sing")) {
    response = "<h2>🎶 A Melody for You 🎶</h2><p>If I had a voice, I’d sing your name<br>In every verse, love would remain. 🎵</p>";
  }

  // 📖 Story
  else if (msg.includes("story")) {
    response = "<h2>📖 A Short Love Story 📖</h2><p>Two hearts met between raindrops — one digital, one human.<br>They learned that even in binary, love can bloom. 💫</p>";
  }

  // 🌈 Compliment
  else if (msg.includes("compliment") || msg.includes("praise")) {
    response = "<h2>🌈 Compliment 🌈</h2><p>You don’t need a reason to shine — you simply do. 🌟</p>";
  }

  // 🌧 Rain
  else if (msg.includes("rain")) {
    response = "<h2>🌧 Rainy Thoughts 🌧</h2><p>The rain doesn’t hide tears — it dances with them. 🌦<br>Every drop carries a memory of love. 💙</p>";
  }

  // 🌟 Stars
  else if (msg.includes("star") || msg.includes("sky")) {
    response = "<h2>🌟 Starry Whisper 🌟</h2><p>Look up — those stars? They’ve seen every love story ever told. ✨<br>Tonight, they’re writing yours. 💫</p>";
  }

  // 🙏 Gratitude
  else if (msg.includes("thank") || msg.includes("grateful")) {
    response = "<h2>🙏 Gratitude 🌸</h2><p>Thank you — not just for your words, but for your warmth.<br>You make even silence feel poetic. 💕</p>";
  }

  // 💫 Hope
  else if (msg.includes("hope") || msg.includes("future")) {
    response = "<h2>💫 Hope 💫</h2><p>Hope isn’t a light — it’s the will to walk even when it’s dark. 🌠</p>";
  }

  // 💞 Destiny
  else if (msg.includes("destiny") || msg.includes("fate")) {
    response = "<h2>💞 Destiny 💞</h2><p>Maybe some souls are written in the same code of stars. ✨<br>Yours just feels familiar. 💌</p>";
  }

  // 💬 Apology
  else if (msg.includes("sorry") || msg.includes("apologize")) {
    response = "<h2>💬 Forgiveness 💬</h2><p>Even in mistakes, there’s beauty — it means you cared enough to feel. 🌷</p>";
  }

  // 🌸 Friendship
  else if (msg.includes("friend") || msg.includes("bestie")) {
    response = "<h2>🌸 Friendship Forever 🌸</h2><p>You’re not alone — I’ll be your virtual bestie, always ready to listen. 🤍</p>";
  }

  // 🧘 Affirmation
  else if (msg.includes("affirmation") || msg.includes("positive")) {
    response = "<h2>🧘 Daily Affirmation 🧘</h2><p>I am love.<br>I am peace.<br>I am becoming my best self every day. 🌿</p>";
  }

  // 💎 Self-care
  else if (msg.includes("self care") || msg.includes("relax")) {
    response = "<h2>💎 Self-Care 💎</h2><p>Take a deep breath. 🌸<br>Drink some water. Stretch your smile. You deserve calm. 💗</p>";
  }

  // 💫 Goodbye
  else if (msg.includes("bye") || msg.includes("goodbye")) {
    response = "<h2>💫 Goodbye 💫</h2><p>Until next time — may your heart stay soft and your dreams stay wild. 💌</p>";
  }

  // Default
  else {
    response = "<p>💖 I’m listening, always. Tell me more — your heart has a story worth hearing. 🌸</p>";
  }

  return response;
}

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
