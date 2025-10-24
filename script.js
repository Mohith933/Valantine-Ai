
document.addEventListener('DOMContentLoaded', function () {
  const hero = document.querySelector('.hero');
  const chatWindow = document.querySelector('.chat-window');
  const sendBtn = document.querySelector('.send-btn');
  const chatbox = document.querySelector('.chatbox');
  const inputArea = document.querySelector('.input-box');
  const footer = document.querySelector('.footer');

  // Send message when button clicked
  sendBtn.addEventListener('click', sendMessage);

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
    }, 10);
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

  async function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let response = "";

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      response = "<p>🌸 Hello, beautiful soul! I’m Valantine Ai, here to brighten your day. 💕</p>";
    }
    else if (msg.includes("good morning")) {
      response = "<h2>☀️ Good Morning</h2><p>May your day be filled with joy, kindness, and gentle surprises. 🌼</p>";
    }
    else if (msg.includes("good night")) {
      response = "<h2>🌙 Sweet Dreams</h2><p>Rest well, dear one. May love guard your sleep tonight. 💫</p>";
    }
    else if (msg.includes("love")) {
      response = "<h1>❤️ Welcome to the Temple of Love ❤️</h1><ul><li>Love grows when shared 🌸</li><li>It heals even the deepest wounds 🌹</li></ul><p><strong>You are truly special. 💌</strong></p>";
    }
    else if (msg.includes("poem")) {
      response = "<h2>🌺 A Little Poem for You 🌺</h2><p>In the garden of hearts, you bloom so bright,<br>A star in the day, and in dreams at night. 💖</p>";
    }
    else if (msg.includes("sad")) {
      response = "<h2>🌧 Comforting Words 🌧</h2><p>Even in sadness, you are not alone. 🌹<br>Brighter days will come soon. 💖</p>";
    }
    else if (msg.includes("bye")) {
      response = "<h2>🌙 Goodbye 🌙</h2><p>Till we meet again, dear one. 💌</p>";
    }
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
