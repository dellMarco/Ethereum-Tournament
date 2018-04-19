

accLoad.then(function () {

    //check Cookie and PW
    FIFA.methods.getTournament().call()
        .then(tournament => {
            if (tournament[5]) {

                if (confirm("Turnier läuft, zum Spielplan wechseln?")) {
                    window.location = "../gameMaster/gameplan.html";
                }
            } else if (tournament[4]) {
                $('#rumble').prop("disabled", false);
            } else {
                $('#start').prop("disabled", false);
            }

            if (getCookie("address") === web3.eth.defaultAccount) {
                console.log("GameMaster")
                loadData();
            } else {
                if (prompt("Passwort eingeben") == getPW()) {
                    loadData();
                    document.cookie = "address=" + web3.eth.defaultAccount + ";path=/";
                } else {
                    //window.location = "../player/index.html";
                }
            }

        })

    $("#rumble").on("click", function () {
        FIFA.methods.startTournament().send(
            { from: web3.eth.defaultAccount },
            (function (err, res) {
                if (!err) {
                    console.log("Successsfully started Tournament")
                } else {
                    console.log(err)
                }
            }))
            .then(() => {
                alert("todo: location")
                //window.open("gamePlan.html", '_blank')
            })
    });

    $("button").addClass("button");

    $("#start").on("click", function () {
        if ($("#name").val() == "" || $("#name").val() == 1 ) {
            $("#name").effect("shake");
            return;
        }
        if ($("#fee").val() == "") {
            $("#fees").effect("shake");
            return;
        }

        FIFA.methods.createTournament(
            ($("#fee").val() * '1000000000000000000'),
            ($("#slider").slider("value")),
            ($("#name").val()))
            .send(
                {
                    from: web3.eth.defaultAccount,
                    gas: 1000000

                },
                function (err, res) {
                    if (!err) {
                        setGameMaster();
                    } else {
                        console.log(err)
                    }
                })
            .then(() => {
                location.reload();
            }
            )
    });

    $("#reset").on("click", function () {
        document.cookie = "address=;path=/"
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
        min: 3,
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
        max: 9,
        step: 1,
        disabled: true,
        create: function () {
            handle2.text($(this).slider("value"));
        },
        slide: function (event, ui) {
            handle2.text(ui.value);
        }
    });

    function setGameMaster() {
        document.cookie = "address=" + web3.eth.defaultAccount + ";path=/";

        $.ajax({
            url: '/api/users',
            method: 'POST',
            async: false,
            success: function (res) {

            },
            error: console.error,
            data: JSON.stringify({
                username: "GameMaster",
                password: "pass123"
            }),
            contentType: 'application/json'
        });
    }

    function getPW() {
        let pw;
        $.ajax({
            url: '/api/users/0',
            async: false,
            success: function (res) {

                pw = res.password;
            },
            error: console.error
        });
        return (pw)
    }

    function loadData() {
        FIFA.methods.getTournament().call(function (error, parsed) {
            if (!error) {
                if (parsed[0] != "") {
                    $("#name").val(parsed[0]);
                    $('#fee2').val((parsed[1] / 1000000000000000000 * cmcData[0].price_eur).toFixed(2));
                    $('#fee').val((parsed[1] / 1000000000000000000).toFixed(2));
                    $('#slider').slider({ value: parsed[2] });
                    $('#slider2').slider({ value: parsed[3], max: parsed[2] });
                    handle.text($('#slider').slider("value"));
                    handle2.text($('#slider2').slider("value"));
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
                }

            }
            else {
                console.error(error);
            }
        });
        //setHeader
        web3.eth.getBalance(web3.eth.defaultAccount)
            .then(bal => {
                var eth = parseFloat(web3.utils.fromWei(bal, 'ether'))
                $("#user").html("GameMaster | " + eth.toFixed(4) + " ETH")
            }
            );
    }

});
