$(document).ready(function () {

    $("button").addClass("button");

    loadData();

    $("#rumble").on("click", function () {
        FIFA.methods.startTournament().send(
            { from: web3.eth.defaultAccount },
            (function (err, res) {
                if (!err) {
                    console.log("Successsfully started Tournament")
                } else {
                    console.log(err)
                }
            }));
        //window.open("gamePlan.html", '_blank')
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

        FIFA.methods.createTournament(
            ($("#fee").val() * '1000000000000000000'),
            ($("#slider").slider("value")),
            ($("#name").val()))
            .send(
                { from: web3.eth.defaultAccount },
                function (err, res) {
                    if (!err) {
                        document.cookie = "address=" + web3.eth.defaultAccount + ";path=/"
                        var wait3s = window.setTimeout(location.reload(), 3000);

                    } else {
                        console.log(err)
                    }
                });

    });

    $("#reset").on("click", function () {
        document.cookie = "address=" + web3.eth.defaultAccount + ";path=/"
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
                    document.getElementById("start").disabled = true;
                    document.getElementById("rumble").disabled = false;

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
                    document.getElementById("rumble").disabled = true;

                    $('#slider2').hide();
                }
            }
            else {
                console.error(error);
                alert("Wrong Contract Address, see Console log for more Information");
            }
        });
    }
});
