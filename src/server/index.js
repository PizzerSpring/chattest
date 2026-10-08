const express = require('express');
const cors = require('cors');

let rooms = [
    {id: 1, name: 'flud'},
    {id: 2, name: 'it-chat'}
];

let messages = []

const app = express();

app.use(cors());
app.use(express.json());

//Rooms endpoints

app.get('/rooms', (req, res) => {
    res.json(rooms);
})
app.post('/rooms', (req, res) => {

    const newRoom = {id: rooms.length + 1, name: req.body.name }
    rooms.push(newRoom);

    res.json(newRoom);
})
app.delete('/rooms/:id', (req, res) => {
    console.log('DELETE', req.params.id);
    const filteredRooms = rooms.filter(r => r.id !== +req.params.id)
    rooms = filteredRooms;
    res.json(rooms)
})

//Messages endpoints

app.get('/rooms/:roomId/messages', (req, res) => {
    const filteredMessages = messages.filter(msg => msg.roomId === +req.params.roomId);
    res.json(filteredMessages);
})

app.post('/rooms/:roomId/messages', (req, res) => {
    const room = rooms.find(room => room.id === +req.params.roomId)
    if(room) {
        const newMessage = {id: messages.length + 1,roomId: +req.params.roomId, text: req.body.text }
        messages.push(newMessage);
        res.json(newMessage);
    } else {
        res.status(404).json({message: 'Room not found'});
    }
})

app.listen(3000);
