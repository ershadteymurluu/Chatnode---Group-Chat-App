const senderForm = document.querySelector('#message-sendForm'); 
const chat = document.querySelector('.chat');
const roomUsers = document.querySelector('.roomUsers');
const userCount = document.querySelector('.userCount');
const socket = io();

const {username,room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})

socket.emit('join',{username,room});

socket.on('roomUsers',users=>{
    userCount.textContent=users.length;
    let inhtml = '';
    users.forEach(element => {
        inhtml+=`<li>${element.username}</li>`;
    });
    roomUsers.innerHTML=inhtml;
})

socket.on('message',message=>{
    chat.innerHTML+= `<div class="message">
    <span class="message-sender"> ${message.username} </span> <span class="time">${message.time}</span>
    <p class="text">${message.text}</p>
    </div>`;
    chat.scrollTop = chat.scrollHeight;
})


senderForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const message = e.target.elements.message.value;
    socket.emit('chatMessage',message);
    e.target.elements.message.value = '';
    e.target.elements.message.focus();
})
