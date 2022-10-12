const express = require('express')
const app = express();

const messageFormat = require('./utils/message.js');
const {userJoin,currentUser,getroomUsers,userleave} = require('./utils/users.js');

const http = require('http').Server(app);

const io = require('socket.io')(http);

const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,'public')));


io.on('connection',(socket)=>{
    socket.on('join',({username,room})=>{
        const user = userJoin(socket.id,username,room);

        socket.join(user.room);

        //to single user, welcome current user
        socket.emit('message', messageFormat('Bot','Welcome to Chatnode!'));

        //to everyone except the user connecting itself
        socket.broadcast.to(user.room).emit('message',messageFormat('Bot',`${user.username} has joined the chat!`));

        io.to(user.room).emit('roomUsers',getroomUsers(user.room));
    })

    socket.on('chatMessage',msg=>{
        const user = currentUser(socket.id);
        io.to(user.room).emit('message', messageFormat(user.username,msg));
    })

    socket.on('disconnect',()=>{
        const user = userleave(socket.id);
        if(user){
            io.to(user.room).emit('message',messageFormat('Bot',`${user.username} has left the chat!`));
            io.to(user.room).emit('roomUsers',getroomUsers(user.room));
        }
    })
})

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

app.get('/chat',(req,res)=>{
    const room = req.query.room;
    res.render('chat.ejs',{room});
})

http.listen(3000,()=>{
    console.log('Listening On Port*:3000');
})