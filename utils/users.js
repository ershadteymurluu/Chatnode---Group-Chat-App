const users = [];

const userJoin = (id,username,room)=>{
    const user = {id,username,room};
    users.push(user);
    return user;
}

const currentUser = (id)=>{
    const user = users.find(user=>user.id==id);
    return user;
}

const getroomUsers = (room)=>{
    const roomUsers = users.filter(user=>user.room === room);
    return roomUsers;
}  
const userleave = (id)=>{
    const user = users.find(user=>user.id === id);
    const index = users.indexOf(user);
    if(index!==-1) return users.splice(index,1)[0];
}

module.exports = {
    userJoin,
    currentUser,
    getroomUsers,
    userleave
};