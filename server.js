const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuid } = require('uuid');
//Setting view engine
app.set('view engine', 'ejs');

//Static File
app.use(express.static('public'))


app.get('/', (req, res) => { 
    res.redirect(`/:${uuid()}`)
})

app.get('/:roomId', (req, res) => {
    res.render('room', {roomId:req.params.room})
})

server.listen(3030, () => {
    console.log('Server running on port 3000')
})

