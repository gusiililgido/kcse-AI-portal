const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const chatBox = document.getElementById("chat-box");

askBtn.addEventListener("click", askAI);

async function askAI() {

const question = questionInput.value.trim();

if (!question) {
alert("Please enter a question");
return;
}

chatBox.innerHTML += `
<div class="user-message">
${question}
</div>
`;

questionInput.value = "";

chatBox.scrollTop = chatBox.scrollHeight;

chatBox.innerHTML += `
<div class="ai-message" id="loading">
🤖 Thinking...
</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

try {

const response = await fetch("/api/chat", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
question: question
})
});

const data = await response.json();

document.getElementById("loading").remove();

chatBox.innerHTML += `
<div class="ai-message">
${data.answer}
</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

} catch (error) {

document.getElementById("loading").remove();

chatBox.innerHTML += `
<div class="ai-message">
❌ Error connecting to AI.
</div>
`;

}

}
