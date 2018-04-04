

$(document).ready(function () {

    const fee = [];

    // if (typeof web3 !== 'undefined') {
    //     web3 = new Web3(web3.currentProvider);
    // } else {
    //     // set the provider you want from Web3.providers
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    // }
    

    const FIFAContract = web3.eth.contract([
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
                    "name": "mP",
                    "type": "uint256"
                }
            ],
            "name": "TournamentFull",
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
        }
    ]);

    const FIFA = FIFAContract.at("0x8cdaf0cd259887258bc13a92c0a6da92698644c0");
    console.log(FIFA);

    FIFA.getTournament(function (error, result) {
        if (!error) {
            if (result[0] != "") {
                document.getElementById("opener").disabled = false;
             
                $("#tournament").html(result[0]);
                if (result[3] == result[2]) {
                    $("#tournamentCount").html("Alle " + result[2] + " Plätze sind belegt!");
                     document.getElementById("opener").disabled = true;
                } else {
                    $("#tournamentCount").html(result[3] + " von " + result[2] + " Plätzen belegt!");
                }
            } else {
                document.getElementById("opener").disabled = true;
                $("#tournament").html("KEIN TURNIER GESTARTET!");
                $("#tournamentCount").html("Bitte wende dich an den Game Master.");
            }

        }
        else
            console.error(error);
    });

    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 250
        },
        hide: {
            effect: "blind",
            duration: 250
        }
    });


    var dialog, form,

        name = $("#name"),
        club = $("#club"),
        eth_address = $("#eth_address")
    allFields = $([]).add(name).add(club).add(eth_address),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min) {
        if (o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Länge von " + n + " muss mindestens " +
                min + " betragen.");
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "Alias", 3);
        valid = valid && checkLength(club, "Verein", 3);

        if (valid) {
            //success function (register)
            dialog.dialog("close");
        }
        return valid;
    }

    dialog = $("#register").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Registrieren": addUser,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();

    });

    $("#opener").on("click", function () {
        const open = FIFA.getTournament();
        dialog.dialog("open");
    });


    //Get CMC Data
    function Get(yourUrl) {
        const Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    const cmcData = JSON.parse(Get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'));

    /* Rotate Text stuff */

    const TxtRotate = function (el, prices, period) {
        const result = FIFA.getTournament();

        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0:
                    prices[0] = (result[1] / 1000000000000000000 * cmcData[0].price_eur).toFixed(2) + " €.";
                    break;
                case 1:
                    prices.push((result[1] / 1000000000000000000 * cmcData[0].price_usd).toFixed(2) + " $.");
                    break;
                case 2:
                    prices.push((result[1] / 1000000000000000000).toFixed(2) + " ETH.");
                    break;
                case 3:
                    prices.push(result[1] + " Wei.");
                    break;
                default:

            }
        }
        this.prices = prices;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1500;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.prices.length;
        var fullTxt = this.prices[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var prices = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (prices) {
            new TxtRotate(elements[i], JSON.parse(prices), period);
        }
    }

    /* End Rotate Text stuff */
});