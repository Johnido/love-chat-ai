// ----------------- MESSAGE LIMIT -----------------
let messageCount = parseInt(localStorage.getItem("msg_count")) || 0;
const MSG_LIMIT = 3;

function checkLimit() {
    if (messageCount >= MSG_LIMIT) {
        lockChat();
        return false;
    }
    return true;
}

function registerMessage() {
    messageCount++;
    localStorage.setItem("msg_count", messageCount);
    if (messageCount >= MSG_LIMIT) {
        lockChat();
    }
}

function lockChat() {
    document.getElementById("chat-input").disabled = true;
    document.getElementById("send-btn").disabled = true;
    document.getElementById("lock-message").style.display = "block";
}

function unlockChat() {
    messageCount = 0;
    localStorage.setItem("msg_count", 0);
    document.getElementById("chat-input").disabled = false;
    document.getElementById("send-btn").disabled = false;
    document.getElementById("lock-message").style.display = "none";
}

// ----------------- MONEYTAG AD -----------------
function openMoneyTagAd() {
    const adLink = "https://otieu.com/4/10223438";
    window.open(adLink, "_blank"); // opens in new tab
    // Optional: unlock immediately or after delay
    setTimeout(() => {
        alert("Chat unlocked! Thank you for watching the ad.");
        unlockChat();
    }, 3000); // 3 seconds delay
}

document.getElementById("watch-ad-btn").addEventListener("click", openMoneyTagAd);

// ----------------- CHATBOT -----------------
async function sendMessage() {
    if (!checkLimit()) return;

    const userInput = document.getElementById("chat-input").value.trim();
    if (userInput === "") return;

    addMessage(userInput, "user");
    registerMessage();
    document.getElementById("chat-input").value = "";

    // ----- AI RESPONSE (replace with your real AI call) -----
    const botReply = await getBotReply(userInput);
    addMessage(botReply, "bot");
}

// Placeholder AI function — replace this with your real AI API request
async function getBotReply(userText) {
    // Example: simple template response
    return "AI: I received your message: '" + userText + "'. (Replace this with real AI)";
}

function addMessage(text, role) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = "message " + role;
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// Button click
document.getElementById("send-btn").addEventListener("click", sendMessage);

// Optional: press Enter to send
document.getElementById("chat-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
});
