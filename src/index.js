
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
web3.eth.defaultAccount = web3.eth.accounts[0]

const FIFAContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [],
        "name": "gameMaster",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTournament",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getPlayerCount",
        "outputs": [
            {
                "name": "count",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_playerID",
                "type": "uint256"
            }
        ],
        "name": "getPlayerByID",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_playerAddress",
                "type": "address"
            }
        ],
        "name": "getPlayer",
        "outputs": [
            {
                "name": "pID",
                "type": "uint256"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "club",
                "type": "string"
            },
            {
                "name": "points",
                "type": "uint256"
            },
            {
                "name": "goals",
                "type": "uint256"
            },
            {
                "name": "counterGoals",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_matchID",
                "type": "uint256"
            },
            {
                "name": "_winner",
                "type": "uint256"
            },
            {
                "name": "_loser",
                "type": "uint256"
            },
            {
                "name": "_winnerGoals",
                "type": "uint256"
            },
            {
                "name": "_loserGoals",
                "type": "uint256"
            }
        ],
        "name": "decideMatch",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "fallback"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "startTournament",
        "outputs": [
            {
                "name": "gamePlan",
                "type": "uint256[15][6]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "spare",
                "type": "uint256"
            }
        ],
        "name": "FeeToHigh",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "missing",
                "type": "uint256"
            }
        ],
        "name": "InsufficientFee",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "nOM",
                "type": "uint256"
            }
        ],
        "name": "TooManyPlayers",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "mP",
                "type": "uint256"
            }
        ],
        "name": "TournamentFull",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_fee",
                "type": "uint256"
            },
            {
                "name": "_maxPlayers",
                "type": "uint256"
            },
            {
                "name": "_tournamentName",
                "type": "string"
            }
        ],
        "name": "createTournament",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_playerName",
                "type": "string"
            },
            {
                "name": "_club",
                "type": "string"
            }
        ],
        "name": "register",
        "outputs": [
            {
                "name": "reg",
                "type": "bool"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "kill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]);

const FIFA = FIFAContract.at("0x8cdaf0cd259887258bc13a92c0a6da92698644c0");

//Get CMC Data
function Get(yourUrl) {
    const Httpreq = new XMLHttpRequest();
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}
const cmcData = JSON.parse(Get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'));

$(document).ready(function () {

    
    $("#player").on("click", function () {
        window.location = "src/player/index.html"
    });
    $("#gameMaster").on("click", function () {
        window.location = "src/gameMaster/index.html"
    });
});