const { json } = require('express');
const express = require('express');

const app = express();
const fs = require('fs');
const { nextTick } = require('process');

const {logger} = require('./exportFile')

app.use(logger);
app.use(express.json());

app.get('/b', (req, res) => {
    fs.readFile('./backend/localDataBase/example.json', 'utf8', (err, data) => {
        if (err) res.status('404');
        res.status(200);
        res.send(data);
        console.log('got it:');
    });
    console.log('before');
});

app.get('/b/:id', (req, res) => {
    const {id} = req.params;
    fs.readFile(`./backend/localDataBase/${id}.json`, 'utf8', (err, data) => {
        if (err) {
            res.status(404);
            res.json('Error:' + err)
        };
        res.send(data);
        console.log('got it:', data);
    });
    console.log('before');
});

app.post('/b/:binName', (req, res) => {
    console.log(req.body);
    const binName = req.params.binName;
    fs.writeFile(`./backend/localDataBase/${binName}.json`, JSON.stringify(req.body), (err) => {
        if (err) {
            res.status('404');
            console.log(err);
            res.send('Error:' + err);
        };
        console.log('Success');
    });
    res.status('200');
    res.json('Success');
});



app.listen(3000, () => console.log('server run'));