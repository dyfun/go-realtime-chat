const messages = document.querySelector('#list-group')
const input = document.querySelector('#messages')
const username = document.querySelector('#username')
const send = document.querySelector('#send')

const url = "ws://" + window.location.host + "/ws";
const ws = new WebSocket(url);

ws.onmessage = function (msg) {
    insertMessage(JSON.parse(msg.data))
};

send.onclick = () => {
    const message = {
		username: username.value,
		content: input.value,
	}

    ws.send(JSON.stringify(message));
    input.value = "";
};

function insertMessage(messageObj) {
	const message = document.createElement('li')
    const flex = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')

	message.setAttribute('class', 'list-group-item')
    messages.appendChild(message)
    message.appendChild(flex)
    flex.setAttribute('class', 'flex')
    flex.appendChild(span)
    flex.appendChild(p)

	span.textContent = `${messageObj.username}`
    p.textContent = `${messageObj.content}`
}