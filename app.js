var txtInput = document.getElementById("input");
var voiceList = document.getElementById("voiceList");
var btnSpeak = document.getElementById("buttonOne");
var synth = window.speechSynthesis;
var voices = [];

PopulateVoices();

if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

btnSpeak.addEventListener("click", () => {
  var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
  var selectedVoiceName = voiceList.selectedOptions[0].getAttribute(
    "data-name"
  );
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
});

function PopulateVoices() {
  voices = synth.getVoices();
  var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
  voiceList.innerHTML = "";
  let selectedCounter = 0;

  voices.forEach((voice) => {
    var listItem = document.createElement("option");
    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
    // Set the first option as default
    if (selectedCounter === 45) {
      setTimeout(() => {
        listItem.selected = true;
        voiceList.selectedIndex = index;
      }, 0);
    }
    selectedCounter++;
  });

  voiceList.selectedIndex = selectedIndex;
  // Hide the dropdown
  voiceList.style.display = "none";
}













// @ts-nocheck

const yogiSelectorBtn = document.querySelector('#yogi-selector')
const vickySelectorBtn = document.querySelector('#vicky-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []



const readMessage = (event) => {
  const clickedMessage = event.target.closest('.message');

  if (clickedMessage) {
    const messageText = clickedMessage.querySelector('.message-text').textContent;

    if (messageText) {
      const toSpeak = new SpeechSynthesisUtterance(messageText);
      var selectedVoiceName = voiceList.selectedOptions[0].getAttribute(
        "data-name"
      );
      voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
          toSpeak.voice = voice;
        }
      });
      synth.speak(toSpeak);
    }
  }
};

chatMessages.addEventListener('click', readMessage);





const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'yogi' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'yogi'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'yogi') {
    yogiSelectorBtn.classList.add('active-person')
    vickySelectorBtn.classList.remove('active-person')
  }
  if (name === 'vicky') {
    vickySelectorBtn.classList.add('active-person')
    yogiSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  chatInput.focus()
}

yogiSelectorBtn.onclick = () => updateMessageSender('yogi')
vickySelectorBtn.onclick = () => updateMessageSender('vicky')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})







