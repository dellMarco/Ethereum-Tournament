var Web3 = require('web3');


var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
web3.eth.defaultAccount = web3.eth.accounts[0]
/* function getWeb3() {
    var fifarumbleContract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "getRoundRobin", "outputs": [{ "name": "gamePlan", "type": "uint256[36][3]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_playerName", "type": "string" }, { "name": "_club", "type": "string" }], "name": "register", "outputs": [{ "name": "reg", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_playerAddress", "type": "address" }], "name": "getPlayer", "outputs": [{ "name": "pID", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "club", "type": "string" }, { "name": "points", "type": "uint256" }, { "name": "goals", "type": "uint256" }, { "name": "counterGoals", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_matchID", "type": "uint256" }, { "name": "_winner", "type": "uint256" }, { "name": "_loser", "type": "uint256" }, { "name": "_winnerGoals", "type": "uint256" }, { "name": "_loserGoals", "type": "uint256" }], "name": "decideMatch", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_fee", "type": "uint256" }, { "name": "_maxPlayers", "type": "uint256" }, { "name": "_tournamentName", "type": "string" }], "name": "createTournament", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "gameMaster", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "startTournament", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getPlayerCount", "outputs": [{ "name": "count", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_playerID", "type": "uint256" }], "name": "getPlayer", "outputs": [{ "name": "addressP", "type": "address" }, { "name": "name", "type": "string" }, { "name": "club", "type": "string" }, { "name": "points", "type": "uint256" }, { "name": "goals", "type": "uint256" }, { "name": "counterGoals", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getTournament", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "bool" }, { "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": false, "stateMutability": "nonpayable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "missing", "type": "uint256" }], "name": "InsufficientFee", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "spare", "type": "uint256" }], "name": "FeeToHigh", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "mP", "type": "uint256" }], "name": "TournamentFull", "type": "event" }, { "anonymous": false, "inputs": [], "name": "Start", "type": "event" }, { "anonymous": false, "inputs": [{ "components": [{ "name": "winnerID", "type": "uint256" }, { "name": "loserID", "type": "uint256" }, { "name": "winnerGoals", "type": "uint256" }, { "name": "loserGoals", "type": "uint256" }], "indexed": false, "name": "", "type": "tuple" }], "name": "MatchDecided", "type": "event" }]);

    const FIFA = fifarumbleContract.new(
        {
            from: web3.eth.accounts[0],
            data: '0x6060604052341561000f57600080fd5b33600360026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061174e8061005f6000396000f3006060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632f723f05146100bf5780633ffbd47f1461013357806341c0e1b5146101825780635c12cd4b1461019757806373efabaa146102d1578063b3e8818514610318578063bdf84ae714610358578063bf559d11146103ad578063c2e52206146103c2578063e55ae4e8146103eb578063e76c293e1461053b575b34156100ba57600080fd5b600080fd5b34156100ca57600080fd5b6100d26105f4565b604051808260036000925b818410156101235782846020020151602460200280838360005b838110156101125780820151818401526020810190506100f7565b5050505090500192600101926100dd565b9250505091505060405180910390f35b6101686004808035906020019082018035906020019190919290803590602001908201803590602001919091929050506107ad565b604051808215151515815260200191505060405180910390f35b341561018d57600080fd5b610195610a5b565b005b34156101a257600080fd5b6101ce600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610aee565b604051808781526020018060200180602001868152602001858152602001848152602001838103835288818151815260200191508051906020019080838360005b8381101561022a57808201518184015260208101905061020f565b50505050905090810190601f1680156102575780820380516001836020036101000a031916815260200191505b50838103825287818151815260200191508051906020019080838360005b83811015610290578082015181840152602081019050610275565b50505050905090810190601f1680156102bd5780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b34156102dc57600080fd5b6103166004808035906020019091908035906020019091908035906020019091908035906020019091908035906020019091905050610de2565b005b341561032357600080fd5b61035660048080359060200190919080359060200190919080359060200190820180359060200191909192905050610e81565b005b341561036357600080fd5b61036b610f1e565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156103b857600080fd5b6103c0610f44565b005b34156103cd57600080fd5b6103d5611004565b6040518082815260200191505060405180910390f35b34156103f657600080fd5b61040c6004808035906020019091905050611011565b604051808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018060200180602001868152602001858152602001848152602001838103835288818151815260200191508051906020019080838360005b83811015610494578082015181840152602081019050610479565b50505050905090810190601f1680156104c15780820380516001836020036101000a031916815260200191505b50838103825287818151815260200191508051906020019080838360005b838110156104fa5780820151818401526020810190506104df565b50505050905090810190601f1680156105275780820380516001836020036101000a031916815260200191505b509850505050505050505060405180910390f35b341561054657600080fd5b61054e6112f9565b60405180806020018781526020018681526020018581526020018415151515815260200183151515158152602001828103825288818151815260200191508051906020019080838360005b838110156105b4578082015181840152602081019050610599565b50505050905090810190601f1680156105e15780820380516001836020036101000a031916815260200191505b5097505050505050505060405180910390f35b6105fc611565565b600080600080600080600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561066157600080fd5b6106696113ee565b9550610673611004565b945060019350600190505b85811115156107a1576000858281151561069457fe5b0614156106a3578492506106b2565b84818115156106ae57fe5b0692505b6000858583018115156106c157fe5b0614156106d0578491506106e1565b848482018115156106dd57fe5b0691505b808760006003811015156106f157fe5b60200201516001830360248110151561070657fe5b6020020181815250508287600160038110151561071f57fe5b60200201516001830360248110151561073457fe5b6020020181815250508187600260038110151561074d57fe5b60200201516001830360248110151561076257fe5b6020020181815250506000858281151561077857fe5b061480156107865750600181115b156107945783806001019450505b808060010191505061067e565b86965050505050505090565b6000600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415151561080c57600080fd5b6001600360006101000a81548160ff0219169083151502179055151561083157600080fd5b60015461083c611004565b101515610881577fa13de98824a467bc63f2dc9f0b3d82986798ea1074637a08dcc1bb22f2d628a56001546040518082815260200191505060405180910390a1600080fd5b600054341415610905576108f985858080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505084848080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050611418565b60019050809050610a53565b60005434101561094f577f4c4e635ca3f567e18560e4c6c2d3e2ff2faf36a078fc0b6efaeb82658057a73734600054036040518082815260200191505060405180910390a1600080fd5b600054341115610a52573373ffffffffffffffffffffffffffffffffffffffff166108fc60005434039081150290604051600060405180830381858888f19350505050151561099d57600080fd5b7ffe80ce05e5aab40521b1bcd762d2d0d53b93581678b020d05a76beb0ed8a791760005434036040518082815260200191505060405180910390a1610a4685858080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505084848080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050611418565b60019050809050610a53565b5b949350505050565b600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610aec57600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b565b6000610af8611594565b610b00611594565b6000806000600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000154600560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600560008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600560008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154600560008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154600560008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050154848054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610d2a5780601f10610cff57610100808354040283529160200191610d2a565b820191906000526020600020905b815481529060010190602001808311610d0d57829003601f168201915b50505050509450838054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610dc65780601f10610d9b57610100808354040283529160200191610dc6565b820191906000526020600020905b815481529060010190602001808311610da957829003601f168201915b5050505050935095509550955095509550955091939550919395565b6000600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610e4057600080fd5b600460008781526020019081526020016000209050848160000181905550838160010181905550828160020181905550818160030181905550505050505050565b600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610edd57600080fd5b6001600360006101000a81548160ff0219169083151502179055508360008190555082600181905550818160029190610f179291906115a8565b5050505050565b600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141515610fa057600080fd5b6000600360006101000a81548160ff0219169083151502179055506001600360016101000a81548160ff0219169083151502179055507f1b55ba3aa851a46be3b365aee5b5c140edd620d578922f3e8466d2cbd96f954b60405160405180910390a1565b6000600780549050905090565b600061101b611594565b611023611594565b60008060006006600088815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16955085600560008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600560008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600201600560008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060030154600560008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060040154600560008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050154848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112415780601f1061121657610100808354040283529160200191611241565b820191906000526020600020905b81548152906001019060200180831161122457829003601f168201915b50505050509450838054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112dd5780601f106112b2576101008083540402835291602001916112dd565b820191906000526020600020905b8154815290600101906020018083116112c057829003601f168201915b5050505050935095509550955095509550955091939550919395565b611301611594565b600080600080600080611312611004565b9050600260005460015483600360009054906101000a900460ff16600360019054906101000a900460ff16858054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113d25780601f106113a7576101008083540402835291602001916113d2565b820191906000526020600020905b8154815290600101906020018083116113b557829003601f168201915b5050505050955096509650965096509650965050909192939495565b600060016113fa611004565b036002611405611004565b81151561140e57fe5b0402905080905090565b6000806000339250600161142a611004565b019150600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050826006600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818160000181905550848160010190805190602001906114e1929190611628565b50838160020190805190602001906114fa929190611628565b506007805480600101828161150f91906116a8565b9160005260206000209001600085909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505050505050565b610d80604051908101604052806003905b61157e6116d4565b8152602001906001900390816115765790505090565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106115e957803560ff1916838001178555611617565b82800160010185558215611617579182015b828111156116165782358255916020019190600101906115fb565b5b50905061162491906116fd565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061166957805160ff1916838001178555611697565b82800160010185558215611697579182015b8281111561169657825182559160200191906001019061167b565b5b5090506116a491906116fd565b5090565b8154818355818115116116cf578183600052602060002091820191016116ce91906116fd565b5b505050565b610480604051908101604052806024905b60008152602001906001900390816116e55790505090565b61171f91905b8082111561171b576000816000905550600101611703565b5090565b905600a165627a7a723058202d4f996357968a092f180f7c92210008a7683edefd56274cd40e6bdbf030136d0029',
            gas: '4700000'
        }, function (e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
        })
} */
/* getWeb3(); */

const FIFAContract = web3.eth.contract([
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"name": "winnerID",
						"type": "uint256"
					},
					{
						"name": "loserID",
						"type": "uint256"
					},
					{
						"name": "winnerGoals",
						"type": "uint256"
					},
					{
						"name": "loserGoals",
						"type": "uint256"
					}
				],
				"indexed": false,
				"name": "",
				"type": "tuple"
			}
		],
		"name": "MatchDecided",
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
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
		"inputs": [],
		"name": "startTournament",
		"outputs": [],
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
		"inputs": [],
		"name": "Start",
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "fallback"
	},
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
		"constant": true,
		"inputs": [
			{
				"name": "_playerID",
				"type": "uint256"
			}
		],
		"name": "getPlayer",
		"outputs": [
			{
				"name": "addressP",
				"type": "address"
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
		"inputs": [],
		"name": "getRoundRobin",
		"outputs": [
			{
				"name": "gamePlan",
				"type": "uint256[36][3]"
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
			},
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}