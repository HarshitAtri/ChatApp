// use for connection eastablishment
const socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let username;
do {
    username = prompt('Please Enter Your Name :')
} while (!username)

// ******add keyup to check any key is pressed if key is enter then do
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// send msg to to user with append
function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')
    scrolltoBottom()
    // clear text area after type
    textarea.value=''
    // send to server via a websocket connection
    socket.emit('message',msg)
}
// to add msg dynamically into chat page 
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// recieve from server via a websocket connection
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrolltoBottom()
})

// scroll function to bottom
function scrolltoBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}