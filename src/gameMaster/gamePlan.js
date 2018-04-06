


$(document).ready(function () {
    
    var tournamentStartEvent = FIFA.Start();  

   
    tournamentStartEvent.watch(function(err1, res1){
     
        if (!err1) {
           $("#loading").hide();
           FIFA.getRoundRobin(function(err2, res2){

            if (!err2) {
                   
                FIFA.getPlayer
                  // alert(res2[0][0])
                  for (let c = 0; c < res2.length; c++) {
                      const gameNumber = res2[0][c];
                      const p1 = res2[1][c];
                      const p2 = res2[2][c];
                      var table = document.getElementById("gameTable");
                      var lenght = table.rows.lenght;
                      console.log(lenght)
                      var row = table.insertRow(lenght);
                      var cell1 = row.insertCell(0);
                      var cell2 = row.insertCell(1);
                      var cell3 = row.insertCell(2);
                      var cell4 = row.insertCell(3)
                      var cell5 = row.insertCell(4);
                      var cell6 = row.insertCell(5);

                      cell1.innerHTML = gameNumber;
                      cell2.innerHTML = p1;
                      cell3.innerHTML = p2;
                  }
               } else {
                   
               }
           })
           
        } else {
            
        }
    });
        
        
           



});