accLoad.then(function () {
    let header;

    FIFA.methods.getPlayer(getCookie("address")).call()
        .then(player => {
            if (getCookie("address")===web3.eth.defaultAccount) {
                header = "GameMaster"
            } else  {
                header = String(player[1]);
            }
            
            return web3.eth.getBalance(getCookie("address"))
        })
        .then(bal => {
            var eth = parseFloat(web3.utils.fromWei(bal, 'ether'));
            header += " | " + eth.toFixed(4) + " ETH";
            $("#user").html(header);
        })

    $("#gamePlan").hide();

    FIFA.methods.getTournament().call(function (error, parsed) {
        if (!error) {
            if (parsed[5] == true) {
                start()

            } else {
                console.log("Not yet started")
            }
        } else {
            console.log(error)
        }
    })

    function start() {
        $("#loading").hide();
        $("#gamePlan").show();
        FIFA.methods.getRoundRobin().call()
            .then(gamePlan => {

                for (let c = 0; c <= gamePlan[0].length - 1; c++) {

                    const gameNumber = gamePlan[0][c];
                    if (gameNumber == 0) { break; }

                    //get names
                    const p1 = gamePlan[1][c];
                    const p2 = gamePlan[2][c];
                    let p1Name;
                    let p2Name;
                    let p1Goals;
                    let p2Goals;

                    FIFA.methods.getPlayerByID(p1).call()
                        .then(player1 => {
                            p1Name = player1[1];
                            return FIFA.methods.getPlayerByID(p2).call()
                        })
                        .then(player2 => {
                            p2Name = player2[1];
                            return FIFA.methods.getEncounter(gameNumber).call()
                        })
                        .then(enc => {
                            p1Goals = enc[2]
                            p2Goals = enc[3]
                            fillTable(gameNumber, p1, p1Name, p2, p2Name, p1Goals, p2Goals)
                        })
                }
            })
        $("#gamePlan").show();
    }

    function fillTable(gameNumber, p1, p1Name, p2, p2Name, p1Goals, p2Goals) {
        var table = document.getElementById("gameTable");
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        cell1.innerHTML = gameNumber;
        cell2.innerHTML = p1
        cell3.innerHTML = p1Name
        cell4.innerHTML = p2
        cell5.innerHTML = p2Name

        if (p1Goals != 0) { cell6.innerHTML = p1Goals }
        if (p2Goals != 0) { cell7.innerHTML = p2Goals }
        if (p1Goals > p2Goals) {
            cell8.innerHTML = "Spieler 1"
        }
        else if (p2Goals > p1Goals) {
            cell8.innerHTML = "Spieler 2"
        }

        var a = "contenteditable";
        row.addEventListener("click", (
            function () {

                if (getCookie("address") == web3.eth.defaultAccount) {
                    this.cells[5].setAttribute(a, 'true');
                    this.cells[6].setAttribute(a, 'true');
                } else {
                    alert("Nur der Game Master kann Spielstände eintragen!")
                }

            }));
        row.addEventListener('keyup', function () {
            var p1ID = this.cells[1].innerHTML * 1
            var p1g = parseInt(this.cells[5].innerHTML)
            var p2ID = this.cells[3].innerHTML * 1
            var p2g = parseInt(this.cells[6].innerHTML)
            var mID = this.cells[0].innerHTML * 1
            if (p1g < p2g && !(isNaN(p1g)) && !(isNaN(p1g))) {

                if (confirm("Spieler 2 hat gewonnen!\n\nSpielstand für Spiel " + mID + " in der Blockchain speichern? ")) {
                    decide(mID, p2ID, p1ID, p1g, p2g)
                    this.cells[7].innerHTML = "Spieler 2"
                } else {
                    this.cells[5].innerHTML = ""
                    this.cells[6].innerHTML = ""
                    this.cells[7].innerHTML = ""
                }
            } else if (p1g > p2g && !(isNaN(p1g)) && !(isNaN(p1g))) {

                if (confirm("Spieler 1 hat gewonnen!\n\nSpielstand für Spiel " + mID + " in der Blockchain speichern? ")) {
                    decide(mID, p1ID, p2ID, p1g, p2g)

                    this.cells[7].innerHTML = "Spieler 1"
                } else {
                    this.cells[5].innerHTML = ""
                    this.cells[6].innerHTML = ""
                    this.cells[7].innerHTML = ""
                }
            } else if (p1g == p2g || isNaN(p1g) || isNaN(p2g)) {
                this.cells[7].innerHTML = ""
            }

        })
    }
    //uint _matchID, uint _winner, uint _loser, uint _winnerGoals, uint _loserGoals
    function decide(mID, wID, lID, p1W, p2G) {
        FIFA.methods.decideMatch(mID, wID, lID, (p1W * 1), (p2G * 1)).send({ from: web3.eth.defaultAccount, gas: 3000000 }, function (err, res) {
            if (!err) {
                console.log("Success")
            } else {
                console.log(err)
            }
        })
    }

});