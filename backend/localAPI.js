const { json } = require('express');
const express = require('express');

let i = 0;
const binName = `uniq${i}`;

const app = express();
const fs = require('fs');
const { nextTick } = require('process');

const {logger} = require('./exportFile')

app.use(logger);
app.use(express.json());


//send data to client
app.get('/b', (req, res) => {
    fs.readFile('./backend/localDataBase/example.json', 'utf8', (err, data) => {
        if (err) res.status('404');
        res.status(200).send(data);
        console.log('got it:');
    });
    console.log('before');
});

app.get('/b/:id', (req, res) => {
    const {id} = req.params;
    fs.readFile(`./backend/localDataBase/${id}.json`, 'utf8', (err, data) => {
        if (err) {
            res.status(404).json({ msg: `There is not task with that id: ${err}`})
        };
        res.send(data);
        console.log('got it:', data);
    });
    console.log('before');
});

app.post('/b', (req, res) => {
    console.log(req.body);
    // fs.access(`./backend/localDataBase/${binName}.json`, fs.constants.F_OK, (err) => {
    //     if(!err) {
    //         res.status(400).json(`The file whit this name is already exist: ${err}`);
    //         return
    //     }
        fs.writeFile(`./backend/localDataBase/${binName}.json`, JSON.stringify(req.body), (err) => {
            if(!err) {
                res.status(400).json(`unsuccess create file: ${err}`);
                return
            }
            console.log(`Success create new file with uniq id ${binName}`);
            res.json(`the uniq id of this task: ${JSON.stringify(req.body)} is ${binName}`);
            i++;
        });
    });

app.put('/b/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.body);
    fs.access(`./backend/localDataBase/${id}.json`, fs.constants.F_OK, (err) => {
        if(err) {
            res.status(404).json(`The file does not exist: ${err}`);
            return
        }
        fs.writeFile(`./backend/localDataBase/${id}.json`, JSON.stringify(req.body), () => {
            console.log('Change succeeded:');
            res.json(req.body);
        });
    })
});

app.delete('/b/:id', (req, res) => {
    const {id} = req.params;
    console.log(req.body);
    fs.access(`./backend/localDataBase/${id}.json`, fs.constants.F_OK, (err) => {
        if(err) {
            res.status(404).json(`This file does not exist: ${err}`);
            return;
        }
        fs.unlink(`./backend/localDataBase/${id}.json`, (err) => {
            if (err) {
                res.status(500).json({msg: `can not remove this file:${err}` })
                return;
            }
            res.json('Remove success');
        });
    });
});



app.listen(3000, () => console.log('server run'));