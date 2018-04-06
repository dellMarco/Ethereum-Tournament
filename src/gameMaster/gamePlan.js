


$(document).ready(function () {
    
    var tournamentStartEvent = FIFA.Start();  

   
    tournamentStartEvent.watch(function(err1, res1){
     
        if (!err1) {
           $("#loading").hide();
           FIFA.getRoundRobin(function(err2, res2){

            if (!err2) {
                   console.log(res2[2][1])
                   alert(res2[0][0])
               } else {
                   
               }
           })
           
        } else {
            
        }
    });
        
        
           



});