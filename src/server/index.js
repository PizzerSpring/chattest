const express = require('express');
const cors = require('cors');

const rooms = [
    {id: 1, name: 'flud'},
    {id: 2, name: 'it-chat'}
];

const app = express();

app.use(cors());
app.use(express.json());

app.get('/rooms', (req, res) => {
    res.json(rooms);
})
app.post('/rooms', (req, res) => {

    const newRoom = {id: rooms.length + 1, name: req.body.name }
    rooms.push(newRoom);

    res.json(newRoom);
})

app.listen(3000);
