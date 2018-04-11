

$(document).ready(function () {

    FIFA.methods.getTournament().call(function (error, parsed) {
        if (!error) {
            if (parsed[5] == true) {
                start()

            } else {
                console.log("not yet started")
                $("#gamePlan").hide();
            }
        } else {
            console.log(error)
        }
    })

    /* FIFA.events.Start(function (err1, res1) {

        if (!err1) {
            start()
        } else {
            console.log(err1)
        }
    });
 */
    function start() {
        $("#loading").hide();

        FIFA.methods.getRoundRobin().call(function (err2, res2) {

            if (!err2) {


                for (let c = 0; c <= res2[0].length - 1; c++) {

                    const gameNumber = res2[0][c];
                    if (gameNumber == 0) { break; }

                    //get names
                    const p1 = res2[1][c];
                    const p2 = res2[2][c];
                    let p1Name;
                    let p2Name;

                    FIFA.methods.getPlayerByID(p1).call(function (errp1, resp1) {
                        p1Name = resp1[1]
                    })
                    FIFA.methods.getPlayerByID(p2).call(function (errp2, resp2) {
                        p2Name = resp2[1]
                    })
                    
                    var table = document.getElementById("gameTable");

                    //get encounters
                    const wGoals = FIFA.methods.getEncounter(gameNumber).call()[2]
                    const lGoals = FIFA.methods.getEncounter(gameNumber).call()[3]

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

                    if (wGoals != 0) { cell6.innerHTML = wGoals }
                    if (lGoals != 0) { cell7.innerHTML = lGoals }
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
                                decide(mID, p2ID, p1ID, p1g, p2g)
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
    function decide(mID, wID, lID, wg, lg) {
        FIFA.methods.decideMatch().send(mID, wID, lID, (wg * 1), (lg * 1), { gas: 3000000 }, function (err, res) {
            if (!err) {
                alert("Success")
            } else {
                alert(err)
            }
        })
    }

});