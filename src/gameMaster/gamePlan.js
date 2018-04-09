

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

                        cell1.innerHTML = gameNumber;
                        cell2.innerHTML = p1 + ": " + p1Name;
                        cell3.innerHTML = p2 + ": " + p2Name;;
                 

                    }
                    $("#gamePlan").show();
                } else {
                    console.log(err2)
                }
            })

        } else {

        }
    });






});