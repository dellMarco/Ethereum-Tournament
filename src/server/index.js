const express = require('express');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');
const bodyParser = require('body-parser');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
let FIFARumble;
let FIFA;

web3.eth.getAccounts()
    .then(accounts => {
        const content = fs.readFileSync(path.join(__dirname, '..', '..', 'build', 'contracts', 'FIFARumble.json'), 'utf8');
        FIFARumble = JSON.parse(content);
        return new web3.eth.Contract(FIFARumble.abi)
            .deploy({
                data: FIFARumble.bytecode
            })
            .send({
                from: accounts[0],
                gas: '4700000'
            });
    })
    .then(contractInstance => FIFA = contractInstance)
    .then(() => app.listen(8080, err => {

        if (err) {
            return console.error(err);
        } else {
            console.log('Server running at ', 8080);
        }
    }));

const app = express();

app.get('/api/contract', (req, res) => {
    res.json({
        abi: FIFARumble.abi,
        address: FIFA.options.address,
    });
});

const staticFilePath = path.join(__dirname, '..', 'client');

app.use(express.static(staticFilePath));

const users = [];
// POST /api/users gets JSON bodies
app.post('/api/users', bodyParser.json(), function (req, res) {
    if (!req.body) return res.sendStatus(400)
    const u = users[users.length - 1];
    console.log(req.body);
    req.body.id = u ? u.id + 1 : 0;
    users.push(req.body);
    res.status(201).json(req.body);
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    /*
    User <- find
        Param: true/false 
            <- function (user) { expression true/false user id = gesuchte user id}
    */
    const uFound = users.find(u => u.id === parseInt(req.params.id))
    if (uFound) {
        res.json(uFound)
    } else {
        res.status(404).json({
            message: "User not Found"
        })
    }

})

