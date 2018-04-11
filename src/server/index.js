const express = require('express');
const path = require('path');
const fs = require('fs');
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const acc = function (err, res) {
    if (!err) {

    } else {

    }
}
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
        address: FIFA.options.address
    });
});

const staticFilePath = path.join(__dirname, '..', 'client');
app.use(express.static(staticFilePath));

