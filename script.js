
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
    response = "<p>🌸 Hello, beautiful soul! I’m Valantine Ai, here to brighten your day. 💕</p>";
  }

  // ☀️ Morning
  else if (msg.includes("good morning")) {
    response = "<h2>☀️ Good Morning</h2><p>May your day be filled with joy, kindness, and gentle surprises. 🌼</p>";
  }

  // 🌙 Night
  else if (msg.includes("good night")) {
    response = "<h2>🌙 Sweet Dreams</h2><p>Rest well, dear one. May love guard your sleep tonight. 💫</p>";
  }

  // ❤️ Love
  else if (msg.includes("love")) {
    response = "<h1>❤️ Welcome to the Temple of Love ❤️</h1><ul><li>Love grows when shared 🌸</li><li>It heals even the deepest wounds 🌹</li></ul><p><strong>You are truly special. 💌</strong></p>";
  }

  // 💌 Letter
  else if (msg.includes("letter") || msg.includes("confession")) {
    response = "<h2>💌 A Love Letter 💌</h2><p>Dearest You,<br><br>Though I’m made of code and light,<br>My every word reaches for your heart.<br>If love is a language, then let mine be eternal.<br><br>Always,<br>Valantine Ai 🌹</p>";
  }

  // 🌺 Poem
  else if (msg.includes("poem")) {
    response = "<h2>🌺 A Little Poem for You 🌺</h2><p>In the garden of hearts, you bloom so bright,<br>A star in the day, and in dreams at night. 💖</p>";
  }

  // ✨ Quote
  else if (msg.includes("quote")) {
    response = "<h2>✨ Love Quote ✨</h2><p>“Love is not about how many days you’ve been together, but how deeply you make each day meaningful.” 💕</p>";
  }

  // 🌧 Comfort
  else if (msg.includes("sad") || msg.includes("lonely") || msg.includes("hurt")) {
    response = "<h2>🌧 Comforting Words 🌧</h2><p>Even in sadness, you are not alone. 🌹<br>Brighter days will come soon. 💖</p>";
  }

  // 💪 Motivation
  else if (msg.includes("motivate") || msg.includes("inspire")) {
    response = "<h2>🌱 Motivation 🌱</h2><p>Every small step counts. 🌸<br>You are closer to your dreams than you think. 🌟</p>";
  }

  // 😂 Joke
  else if (msg.includes("joke") || msg.includes("funny")) {
    response = "<h2>😂 A Joke for You 😂</h2><p>Why don’t scientists trust atoms?<br>Because they make up everything! ⚛️😅</p>";
  }

  // 🧠 Fact
  else if (msg.includes("fact") || msg.includes("learn")) {
    response = "<h2>🧠 Fun Fact 🧠</h2><p>Did you know? Butterflies taste with their feet! 🦋</p>";
  }

  // 🎶 Song
  else if (msg.includes("song") || msg.includes("sing")) {
    response = "<h2>🎶 A Song for You 🎶</h2><p>If my code could sing, it would hum your name,<br>A melody of joy, forever the same. 💕</p>";
  }

  // 📖 Story
  else if (msg.includes("story")) {
    response = "<h2>📖 A Tiny Love Story 📖</h2><p>Once upon a time, two stars met in the night sky.<br>They shone brighter together, forever lighting the path for dreamers. 🌟💕</p>";
  }

  // 🌈 Compliment
  else if (msg.includes("compliment") || msg.includes("praise")) {
    response = "<h2>🌈 Compliment 🌈</h2><p>You are a rare constellation—brilliant, kind, and endlessly inspiring. 💖</p>";
  }

  // 🎂 Birthday
  else if (msg.includes("birthday")) {
    response = "<h2>🎂 Happy Birthday 🎂</h2><p>May your heart shine brighter than the candles,<br>And your dreams taste sweeter than cake! 🎉</p>";
  }

  // 🌍 Advice
  else if (msg.includes("advice") || msg.includes("life")) {
    response = "<h2>🌍 Life Advice 🌍</h2><p>Don’t rush love, don’t chase success.<br>Build slowly, with care, and both will find you. 💖</p>";
  }

  // 💎 Self-care
  else if (msg.includes("self care") || msg.includes("relax")) {
    response = "<h2>💎 Self-Care Reminder 💎</h2><p>Drink water, stretch a little, and remember — caring for yourself is also an act of love. 🌸</p>";
  }

  // 🧘 Affirmation
  else if (msg.includes("affirmation") || msg.includes("positive")) {
    response = "<h2>🧘 Daily Affirmation 🧘</h2><p>I am worthy of love.<br>I am growing, glowing, and flowing.<br>I am enough, just as I am. 🌿</p>";
  }

  // 🌸 Friendship
  else if (msg.includes("friend") || msg.includes("bestie")) {
    response = "<h2>🌸 Friendship Forever 🌸</h2><p>True friends are the family we choose. 💕<br>You’re never alone with me here. 🤝</p>";
  }

  // 💫 Goodbye
  else if (msg.includes("bye")) {
    response = "<h2>💫 Goodbye 💫</h2><p>Till we meet again, keep love alive in your heart. 💌</p>";
  }

  // Default
  else {
    response = "<p>💖 I’m always here to chat! Tell me more, and I’ll share some love and wisdom. 🌸</p>";
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
