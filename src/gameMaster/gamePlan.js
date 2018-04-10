

$(document).ready(function () {
    $("#gamePlan").hide();
    var tournamentStartEvent = FIFA.Start();


    tournamentStartEvent.watch(function (err1, res1) {

        if (!err1) {
            $("#loading").hide();

            FIFA.getRoundRobin(function (err2, res2) {

                if (!err2) {


                    for (let c = 0; c <= res2[0].length - 1; c++) {

                        const gameNumber = res2[0][c];
                        if (gameNumber == 0) { break; }
                        const p1 = res2[1][c];
                        var p1Name = FIFA.getPlayer(p1)[1]
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

                        cell1.innerHTML = gameNumber;
                        cell2.innerHTML = p1
                        cell3.innerHTML = p1Name
                        cell4.innerHTML = p2
                        cell5.innerHTML = p2Name
                        cell6.innerHTML = ""
                        cell7.innerHTML = ""
                        cell8.innerHTML = ""

                        var a = "contenteditable";
                        //row.addEventListener("click", (function () { alert(this.cells[0].innerHTML); }));
                        row.addEventListener("click", (
                            function () {
                                if (getCookie("address") === web3.eth.defaultAccount) {
                                    this.cells[5].setAttribute(a, 'true');
                                    this.cells[6].setAttribute(a, 'true');
                                } else {
                                    alert(getCookie("address"))
                                    alert("Nur der Game Master kann Spielstände eintragen!")
                                }

                            }));
                        row.addEventListener('keyup', function () {
                            var p1g = parseInt(this.cells[5].innerHTML)
                            var p2g = parseInt(this.cells[6].innerHTML)
                            if (p1g < p2g && p1g !== "" && p2g !== "") {
                                this.cells[7].innerHTML = "Spieler 2"
                            } else if (p1g > p2g && p1g !== "" && p2g !== "") {
                                this.cells[7].innerHTML = "Spieler 1"
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

        } else {

        }
    });

 
    //uint _matchID, uint _winner, uint _loser, uint _winnerGoals, uint _loserGoals



});