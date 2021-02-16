const express = require('express');
let parseJson;
const app = express();
const fs = require('fs');


app.get('/b', (req, res) => {
    fs.readFile('./backend/example.json', (err, data) => {
        if (err) throw err;
        parseJson = JSON.parse(data)
        console.log('got it:', parseJson);
    });
    console.log('before');
    res.send(parseJson);
});




app.listen(3000, () => console.log('server run'));