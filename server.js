const express = require('express');
const {v4:uuidv4 }  = require('uuid');
const app = express();
const server = require('http').Server(app);


//Setting Public folder
app.use(express.static('public'));

//Setting view engine
app.set('view engine', 'ejs');


//Route
app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`)
});


//Room Id added to url
app.get('/:room', (req, res) => {
    res.render('room', {roomId:req.params.room})
})




server.listen(process.env.PORT || 3030, () => {
    console.log('Server running!!')
})



