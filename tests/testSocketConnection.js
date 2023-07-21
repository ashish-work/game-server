const io =  require('socket.io-client');

const socket = io('https://fedd-122-172-82-83.ngrok-free.app');


socket.emit('joinRoom')

socket.on('chat', (msg)=>{
    console.log(msg)
})
