

$(document).ready(function () {
    var i = 1* 1
    FIFA.getPlayer((i), function(err, res){
        if (!err) {
            console.log("fuck: " + res)
         
        } else {
            console.log(err)
        }
    })

    FIFA.getTournament(function (error, parsed) {
        if (!error) {
            if (parsed[5] == true) {
                start()
                
            } else {
                console.log(error)
                $("#gamePlan").hide();
            }
        }
    })

    var tournamentStartEvent = FIFA.Start();

    tournamentStartEvent.watch(function (err1, res1) {

        if (!err1) {
            start()
        } else {

        }
    });

    function start() {
        $("#loading").hide();

        FIFA.getRoundRobin(function (err2, res2) {

            if (!err2) {


                for (let c = 0; c <= res2[0].length - 1; c++) {

                    const gameNumber = res2[0][c];
                    if (gameNumber == 0) { break; }
                    const p1 = res2[1][c];
                    var p1Name = FIFA.getPlayer(p1.toNumber())[1]
                    const p2 = res2[2][c];
                    const p2Name = FIFA.getPlayer(p2)[1];
                    var table = document.getElementById("gameTable");
                    var row = table.insertRow();
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3)
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(5);
                    var cell8 = row.insertCell(5);
                    console.log(p1Name)
                    cell1.innerHTML = gameNumber;
                    cell2.innerHTML = p1
                    cell3.innerHTML = p1Name + " a"
                    cell4.innerHTML = p2
                    cell5.innerHTML = p2Name
                    cell6.innerHTML = ""
                    cell7.innerHTML = ""
                    cell8.innerHTML = ""

                    var a = "contenteditable";
                    row.addEventListener("click", (
                        function () {
                            if (getCookie("address") === web3.eth.defaultAccount) {
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

                            if (confirm("Spielstand für Spiel " + mID + " in Blockchain speichern? \n\nSpieler 2 hat gewonnen!")) {
                                this.cells[7].innerHTML = "Spieler 2"
                            } else {
                                this.cells[5].innerHTML = ""
                                this.cells[6].innerHTML = ""
                                this.cells[7].innerHTML = ""
                            }
                        } else if (p1g > p2g && !(isNaN(p1g)) && !(isNaN(p1g))) {

                            if (confirm("Spielstand für Spiel " + mID + " in Blockchain speichern? \n\nSpieler 1 hat gewonnen!")) {
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
                $("#gamePlan").show();
            } else {
                console.log(err2)
            }
        })
    }

    //uint _matchID, uint _winner, uint _loser, uint _winnerGoals, uint _loserGoals
    function decide(mID, p1ID, p2ID, p1g, p2g) {
        FIFA.decideMatch(mID, p1ID, p2ID, (p1g * 1), (p2g * 1), { gas: 3000000 }, function (err, res) {
            if (!err) {
                alert("Success")
            } else {
                alert(err)
            }
        })
    }

});