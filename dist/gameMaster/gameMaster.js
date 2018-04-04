

//cookie stuff
function cookie(_addr) {
    if (getCookie("addr") != "") {
        if (prompt("Passwort eingeben", "") != getCookie("password")) {
            document.getElementsByTagName('BODY')[0].innerHTML = '';
            alert("bye bye...");
            window.location = "../player/index.html"
        }
    } else {
        document.cookie = "addr=" + _addr;
        document.cookie = "password=" + prompt("Passwort festlegen", "")
        alert("Glückwunsch, du bist jetzt Game Master!");
    }
}

function resetCookie() {
    document.cookie = "addr="
    document.cookie = "password="
    window.location = "../player/index.html"
}

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

$(document).ready(function () {
   
    $("button").addClass("button");
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
    web3.eth.defaultAccount = web3.eth.accounts[0]
    cookie(web3.eth.accounts[0]);
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
        const Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }
    const cmcData = JSON.parse(Get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'));
    loadData();

    $("#decideMatch").on("click", function () {

    });

    $("#start").on("click", function () {
        if ($("#name").val() == "") {
            $("#name").effect("shake");
            return;
        }
        if ($("#fee").val() == "") {
            $("#fees").effect("shake");
            return;
        }
        
        FIFA.createTournament($("#fee").val() * '1000000000000000000', $("#slider").slider("value"), $("#name").val());           
        var wait3s = window.setTimeout(location.reload(), 3000);
            
    });

    $("#endTournament").on("click", function () {

    });

    $("#reset").on("click", function () {
        resetCookie();
    });

    $("#fee").on("keyup", function () {
        $("#fee2").val(($("#fee").val() * cmcData[0].price_eur).toFixed(2));
    });

    $("#fee2").on("keyup", function () {
        $("#fee").val(($("#fee2").val() / cmcData[0].price_eur).toFixed(2));
    });

    $("#fee").on("change", function () {
        $("#fee2").val(($("#fee").val() * cmcData[0].price_eur).toFixed(2));
    });

    $("#fee2").on("change", function () {
        $("#fee").val(($("#fee2").val() / cmcData[0].price_eur).toFixed(2));
    });

    var handle = $("#custom-handle");
    $("#slider").slider({
        value: 2,
        min: 2,
        max: 9,
        step: 1,
        create: function () {
            handle.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle.text(ui.value);
        }
    });

    var handle2 = $("#custom-handle2");
    $("#slider2").slider({
        min: 0,
        step: 1,
        disabled: true,
        create: function () {
            handle2.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle2.text(ui.value);
        }
    });
    function loadData() {
        FIFA.getTournament(function (error, parsed) {
            if (!error) {
                if (parsed[0] != "") {
                    $("#name").val(parsed[0]);
                    $('#fee2').val((parsed[1] / 1000000000000000000 * cmcData[0].price_eur).toFixed(2));
                    $('#fee').val((parsed[1] / 1000000000000000000).toFixed(2));
                    $('#slider').slider({ value: parsed[2] });
                    $('#slider2').slider({ value: parsed[3], max: parsed[2] });
                    handle.text($('#slider').slider("value"));
                    handle2.text($('#slider2').slider("value"));
                    document.getElementById("start").disabled = true;
                    document.getElementById("decideMatch").disabled = false;
                    document.getElementById("endTournament").disabled = false;
                    document.getElementById("name").disabled = true;
                    document.getElementById("fee").disabled = true;
                    document.getElementById("fee2").disabled = true;
                    $('#slider').slider({ disabled: true });
                    $("#tournament").html(parsed[0]);
                    if (parsed[3] == parsed[2]) {
                        $("#tournamentCount").html("Alle " + parsed[2] + " Plätze sind belegt!");
                    } else {
                        $("#tournamentCount").html(parsed[3] + " von " + parsed[2] + " Plätzen belegt!");
                    }
                } else {
                    document.getElementById("decideMatch").disabled = true;
                    document.getElementById("endTournament").disabled = true;
                    $('#slider2').hide();
                }
            }
            else {
                console.error(error);
                alert(error);
            }
        });
    }
});
