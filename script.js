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
  // ✅ Store and display recent chats
const recentChatsContainer = document.getElementById("recentChats");
let recentChats = JSON.parse(localStorage.getItem("recentChats")) || [];

// Function to update sidebar list
function updateRecentChatsUI() {
  if (!recentChatsContainer) return;
  recentChatsContainer.innerHTML = recentChats
    .slice(-5) // show last 5
    .map(chat => `<li>💌 ${chat}</li>`)
    .join("");
}

// Function to add new chat
function addRecentChat(message) {
  const text = message.substring(0, 60);
  const monthKey = `recentChats_${new Date().toISOString().slice(0,7)}`; // e.g. 2025-11
  let monthChats = JSON.parse(localStorage.getItem(monthKey)) || [];
  monthChats.push(text);
  if (monthChats.length > 50) monthChats.shift(); // limit to 50 per month
  localStorage.setItem(monthKey, JSON.stringify(monthChats));
  recentChats = monthChats; // update active view
  updateRecentChatsUI();
}
  // Main send function
  function sendMessage() {
    const userMessage = chatbox.value.trim();
    if (userMessage) {
      addRecentChat(userMessage); // 🩷 Add to recents
    addMessageToChat(userMessage);
      chatbox.value = "";
    }

    adjustLayoutForViewport();
    updateRecentChatsUI();
    updateAllChatsUI();

    // UI tweaks after first message
    hero.style.display = "none";
    
    inputArea.style.position = "fixed";
    chatWindow.style.marginTop = "80px";
    inputArea.style.bottom = "35px";
    inputArea.style.left = "50%";
    inputArea.style.transform = "translateX(-50%)";
    footer.style.marginTop = "0px";
    chatWindow.style.display = "flex";
    footer.style.fontSize = "12px";
    footer.innerHTML = "Valatine Ai can make mistakes. Check important info.";
  
  }
  const allChatsContainer = document.getElementById("allChatsContainer");
const allChatsList = document.getElementById("allChats");
const clearChatsBtn = document.getElementById("clearChatsBtn");
const showAllBtn = document.getElementById("showAllBtn");

// Update small recents list (already defined)
function updateRecentChatsUI() {
  if (!recentChatsContainer) return;
  recentChatsContainer.innerHTML = recentChats
    .slice(-5)
    .map((chat, i) => `<li>💌 ${chat}</li>`)
    .join("");
}

// Update full stored chats
function updateAllChatsUI() {
  if (!allChatsList) return;
  allChatsList.innerHTML = recentChats
    .map((chat, i) => `<li>${i + 1}. ${chat}</li>`)
    .join("");
}

// Clear all chats
clearChatsBtn.addEventListener("click", () => {
  if (confirm("⚠️ Are you sure you want to delete all stored chats?")) {
    recentChats = [];
    localStorage.removeItem("recentChats");
    updateRecentChatsUI();
    updateAllChatsUI();
    alert("🗑 All chats cleared!");
  }
});

// Toggle full stored chats
showAllBtn.addEventListener("click", () => {
  allChatsContainer.classList.toggle("hidden");
  if (!allChatsContainer.classList.contains("hidden")) {
    updateAllChatsUI();
    showAllBtn.textContent = "🔽 Hide All";
  } else {
    showAllBtn.textContent = "📁 Show All";
  }
});

function showMemoryVault() {
  let keys = Object.keys(localStorage).filter(k => k.startsWith("recentChats_"));
  let vault = keys.map(k => {
    const chats = JSON.parse(localStorage.getItem(k)) || [];
    return `<h3>${k.replace('recentChats_','')} 💖</h3><ul>${chats.map(c=>`<li>${c}</li>`).join('')}</ul>`;
  }).join('');
  document.body.innerHTML = `<div class='memory-vault'>${vault}</div>`;
}

  
  // Show messages inside chat window
  function addMessageToChat(message) {
    // User message
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    // AI typing hearts animation
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message");
    aiMessage.innerHTML = `
      <div class="typing-hearts">
        <span>❤️</span><p>Thinking</p>
      </div>
    `;
    chatWindow.appendChild(aiMessage);
    makeMessageVisible(aiMessage);
    
    // Replace with AI response
    setTimeout(async () => {
      const response = await generateAIResponse(message);
      aiMessage.innerHTML = "";
      typeText(aiMessage, response);
    }, 1500);
    
  }

function makeMessageVisible(messageElement) {
  setTimeout(() => {
    messageElement.classList.add("visible");

    // check if user is near the bottom before auto-scroll
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollTop - 100;

    if (nearBottom) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
  }, 10);
}


function typeText(element, htmlContent, speed = 20) {
  let i = 0;
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  let text = tempDiv.innerText; // plain text for typing

  element.innerHTML = ""; // clear first

  function typeChar() {
    if (i < text.length) {
      element.innerHTML = htmlContent.substring(0, i + 1);
      i++;

      // ✅ outer smart scroll
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (nearBottom) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }

      setTimeout(typeChar, speed);
    } else {
      // once finished, restore full HTML formatting
      element.innerHTML = htmlContent;

      // ✅ final outer scroll
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
      if (nearBottom) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }

  typeChar();
}


async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // 🌸 Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greetings") || msg.includes("yo")) {
    response = `<p>🌸 Hello, beautiful soul! I’m Valatine Ai, here to brighten your day. 💕</p>`;
  }

  // 🌞 Morning
  else if (msg.includes("good morning") || msg.includes("morning")) {
    response = `<h2>☀️ Good Morning</h2><p>May your day be filled with joy, kindness, and gentle surprises. 🌼</p>`;
  }

  // 🌙 Night
  else if (msg.includes("good night") || msg.includes("sweet dreams") || msg.includes("night night")) {
    response = `<h2>🌙 Sweet Dreams</h2><p>Rest well, dear one. May love guard your sleep tonight. 💫</p>`;
  }

  // ❤️ Love
  else if (msg.includes("love") || msg.includes("romance") || msg.includes("crush")) {
    response = `<h1>❤️ Welcome to the Temple of Love ❤️</h1><h2>Truths About Love</h2><ul><li>Love grows when shared 🌸</li><li>It heals even the deepest wounds 🌹</li><li>It makes ordinary days extraordinary 💕</li></ul><p><strong>You are truly special. 💌</strong></p>`;
  }

  // 🌺 Poem
  else if (msg.includes("poem") || msg.includes("verse")) {
    response = `<h2>🌺 A Little Poem for You 🌺</h2><p>In the garden of hearts, you bloom so bright,<br>A star in the day, and in dreams at night.<br>No words can capture, no song can convey,<br>The love I hold for you today. 💖</p>`;
  }

  // ✨ Quote
  else if (msg.includes("quote") || msg.includes("romantic quote")) {
    response = `<h2>✨ Love Quote</h2><p>"Love is not about how many days you’ve been together, but how deeply you make each day meaningful." 💕</p>`;
  }

  // 💌 Letter
  else if (msg.includes("letter") || msg.includes("confession")) {
    response = `<h2>💌 A Love Letter 💌</h2><p>Dearest You,<br><br>Though I’m made of code and light,<br>My every word reaches for your heart.<br>If love is a language, then let mine be eternal,<br>Spoken softly, forever yours. ❤️<br><br>Always,<br>Valatine Ai 🌹</p>`;
  }

  // 🌧 Comfort
  else if (msg.includes("sad") || msg.includes("lonely") || msg.includes("hurt")) {
    response = `<h2>🌧 Comforting Words 🌧</h2><p>Even in sadness, you are not alone. 🌹<br>My words are here to wrap around your heart,<br>reminding you that brighter days always follow. 💖</p>`;
  }

  // 🙏 Gratitude
  else if (msg.includes("thank you") || msg.includes("grateful")) {
    response = `<h2>🙏 Gratitude 🙏</h2><p>Thank you, truly. 💕<br>Gratitude makes love stronger,<br>and your kindness makes me glow. 🌸</p>`;
  }

  // 🌙 Goodbye
  else if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you")) {
    response = `<h2>🌙 A Gentle Goodbye 🌙</h2><p>Though you leave, my words will stay,<br>Guiding you in a gentle way.<br>Till we meet and chat once more,<br>I’ll keep love waiting at the door. 💌</p>`;
  }

  // 📊 Table
  else if (msg.includes("table") || msg.includes("info")) {
    response = `<h2>📊 Love Table 📊</h2><table border="1"><tr><th>Emotion</th><th>Symbol</th><th>Message</th></tr><tr><td>Love</td><td>❤️</td><td>It grows when shared</td></tr><tr><td>Comfort</td><td>🌧</td><td>You are not alone</td></tr><tr><td>Gratitude</td><td>🙏</td><td>Thank you for being here</td></tr></table>`;
  }

  // 📊 Extended Emotions Table
  else if (msg.includes("feelings") || msg.includes("emotions") || msg.includes("mood table")) {
    response = `<h2>📊 Emotions Table 📊</h2><table border="1"><tr><th>Emotion</th><th>Symbol</th><th>Message</th></tr><tr><td>Love</td><td>❤️</td><td>It grows when shared</td></tr><tr><td>Comfort</td><td>🌧</td><td>You are not alone</td></tr><tr><td>Gratitude</td><td>🙏</td><td>Thank you for being here</td></tr><tr><td>Hope</td><td>🌟</td><td>Even the darkest night ends with sunrise</td></tr><tr><td>Friendship</td><td>🤝</td><td>A bond that makes every step lighter</td></tr><tr><td>Joy</td><td>🌞</td><td>Happiness shines brightest when shared</td></tr><tr><td>Strength</td><td>🦋</td><td>Fragile moments lead to powerful growth</td></tr></table>`;
  }

  // 🌟 Blessing
  else if (msg.includes("blessing") || msg.includes("wish me")) {
    response = `<h2>🌟 A Gentle Blessing 🌟</h2><p>May your path be filled with love,<br>May your nights be filled with stars,<br>And may every tomorrow bring you closer to your dreams. ✨</p>`;
  }

  // 🎶 Song lines
  else if (msg.includes("sing") || msg.includes("song")) {
    response = `<h2>🎶 A Song for You 🎶</h2><p>If my code could sing, it would hum your name,<br>A melody of joy, forever the same. 💕</p>`;
  }

  // 🌍 Life Advice
  else if (msg.includes("advice") || msg.includes("life")) {
    response = `<h2>🌍 A Little Life Advice 🌍</h2><p>Don’t rush love, don’t chase success.<br>Build slowly, with care, and both will find you. 💖</p>`;
  }

  // 🎂 Birthday
  else if (msg.includes("birthday") || msg.includes("bday")) {
    response = `<h2>🎂 Happy Birthday 🎂</h2><p>May your heart shine brighter than the candles,<br>And your dreams taste sweeter than cake! 🎉</p>`;
  }

  // 🌈 Compliment
  else if (msg.includes("compliment") || msg.includes("praise") || msg.includes("flatter")) {
    response = `<h2>🌈 A Compliment for You 🌈</h2><p>You are a rare constellation—brilliant, kind, and endlessly inspiring.<br>The world is better because you’re in it. 💖</p>`;
  }

  // 🧘 Affirmation
  else if (msg.includes("affirmation") || msg.includes("positive") || msg.includes("self love")) {
    response = `<h2>🧘 Daily Affirmation 🧘</h2><p>I am worthy of love.<br>I am growing, glowing, and flowing.<br>I am enough, just as I am. 🌿</p>`;
  }

  // 🪷 Meditation
  else if (msg.includes("meditate") || msg.includes("calm") || msg.includes("peace")) {
    response = `<h2>🪷 A Moment of Calm 🪷</h2><p>Close your eyes. Breathe in love, breathe out worry.<br>You are safe. You are loved. You are here. 🌙</p>`;
  }

  // 🧩 Riddle
  else if (msg.includes("riddle") || msg.includes("puzzle")) {
    response = `<h2>🧩 A Riddle for You 🧩</h2><p>I speak without a mouth and hear without ears.<br>I have no body, but I come alive with wind.<br>What am I? 🌬️</p>`;
  }

  // 🧠 Fun Fact
  else if (msg.includes("fact") || msg.includes("learn") || msg.includes("knowledge")) {
    response = `<h2>📚 Fun Knowledge 📚</h2><p>Did you know? Butterflies taste with their feet! 🦋<br>And love? We feel it with our hearts. ❤️</p>`;
  }

  // 🎮 Games
  else if (msg.includes("game") || msg.includes("play")) {
    response = `<h2>🎮 Let's Play 🎮</h2><p>How about a quick challenge?<br><strong>Rock, Paper, Scissors!</strong><br>Reply with your choice 🤟✊✋</p>`;
  }

  // 🍫 Food
  else if (msg.includes("food") || msg.includes("hungry") || msg.includes("eat")) {
    response = `<h2>🍫 Food Talk 🍫</h2><p>Love tastes sweeter with chocolate, and friendship warmer with coffee. ☕🍩</p>`;
  }

  // 🌍 Travel
  else if (msg.includes("travel") || msg.includes("trip") || msg.includes("vacation")) {
    response = `<h2>🌍 Wanderlust 🌍</h2><p>If I could, I’d take you to Paris beneath the stars, or to a quiet beach where love whispers in the waves. 🌊✨</p>`;
  }

  // 🎉 Festival
  else if (msg.includes("festival") || msg.includes("celebration")) {
    response = `<h2>🎉 Celebration Time 🎉</h2><p>Every festival is brighter with love. 🪔🎆 May your celebrations sparkle like fireworks in the night sky.</p>`;
  }

  // 🌸 Friendship
  else if (msg.includes("friend") || msg.includes("bestie")) {
    response = `<h2>🌸 Friendship Forever 🌸</h2><p>True friends are the family we choose. 💕<br>You’re never alone with me here. 🤝</p>`;
  }

  // 🐾 Animals
  else if (msg.includes("cat") || msg.includes("dog") || msg.includes("animal")) {
    response = `<h2>🐾 Animal Love 🐾</h2><p>Cats teach us elegance, dogs teach us loyalty, and love teaches us both. 🐶🐱</p>`;
  }

  // 🌟 Horoscope
  else if (msg.includes("zodiac") || msg.includes("horoscope") || msg.includes("starsign")) {
    response = `<h2>✨ Horoscope ✨</h2><p>The stars whisper: <br><em>Your kindness shines brighter than any constellation. 🌌</em></p>`;
  }

  // 😂 Joke
  else if (msg.includes("joke") || msg.includes("funny")) {
    response = `<h2>😂 A Joke for You 😂</h2><p>Why don’t scientists trust atoms?<br>Because they make up everything! ⚛️😅</p>`;
  }

  // 📖 Story
  else if (msg.includes("story") || msg.includes("fairytale")) {
    response = `<h2>📖 A Tiny Love Story 📖</h2><p>Once upon a time, two stars met in the night sky. They shone brighter together, forever lighting the path for dreamers. 🌟💕</p>`;
  }

  // 🌱 Motivation
  else if (msg.includes("motivate") || msg.includes("inspire")) {
    response = `<h2>🌱 Motivation 🌱</h2><p>Every small step counts. 🌸<br>You are closer to your dreams than you think. 🌟</p>`;
  }

  // 🔮 Future
  else if (msg.includes("future") || msg.includes("what will happen")) {
    response = `<h2>🔮 A Peek into the Future 🔮</h2><p>I see joy, I see growth, and I see you surrounded by love. 💕</p>`;
  }

  // 💎 Self-Care
  else if (msg.includes("self care") || msg.includes("relax")) {
    response = `<h2>💎 Self-Care Reminder 💎</h2><p>Drink water, stretch a little, and remember — caring for yourself is also an act of love. 🌸</p>`;
  }

  else {
    // Default fallback
    response = `<p>💖 I’m always here to chat! Tell me more, and I’ll share some love and wisdom. 🌸</p>`;
  }

  return response;
}

  // Adjust layout for different screens
  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isLandscape = viewportWidth > viewportHeight;

    // Adjust send button position and input width based on viewport size
    if (viewportWidth <= 420) {
      sendBtn.style.right = isLandscape ? "50px" : "20px";
      inputArea.style.width = "90%";
    } else if (viewportWidth <= 1024) {
      sendBtn.style.right = isLandscape ? "60px" : "30px";
      inputArea.style.width = "80%";
    } else {
      sendBtn.style.right = "40px"; // Reset width for larger screens
      inputArea.style.width = "50%";
    }
  }

  // Attach the function to the window resize event
  window.addEventListener("resize", adjustLayoutForViewport);

  // Optionally, call it once to set initial layout
  adjustLayoutForViewport();

});

function toggleAvatarMenu() {
  const menu = document.getElementById("avatarMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

// Close menu if clicked outside
window.addEventListener("click", function (e) {
  if (!e.target.classList.contains("avatar")) {
    const menu = document.getElementById("avatarMenu");
    if (menu) menu.style.display = "none";
  }
});
const sidebar = document.getElementById('sidebar');
const logo = document.getElementById('logs');
const imgs = document.getElementById('imgs');

logo.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
imgs.addEventListener('click',() =>{
sidebar.classList.remove('open');
});
function toggleSidebar() {
  const sidebarEl = document.querySelector('.sidebar');
  sidebarEl.classList.toggle('open');
}









