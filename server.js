const express = require('express');

const app = express();
const server = require('http').Server(app);

app.get('/', (req, res) => {
    
})


server.listen(process.env.PORT || 3030, () => {
    console.log('Server running!!')
})



