const express = require('express');
let parseJson;
const app = express();
const fs = require('fs');


app.get('/b', (req, res) => {
    fs.readFile('./backend/example.json', (err, data) => {
        if (err) throw err;
        console.log('got it:', data);
        res.json(data);
    });
    console.log('before');
});

// app.post('/b', (req, res) => {

// })



app.listen(3000, () => console.log('server run'));