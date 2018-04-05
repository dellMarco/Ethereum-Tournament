

$(document).ready(function () {

    const fee = [];

    // if (typeof web3 !== 'undefined') {
    //     web3 = new Web3(web3.currentProvider);
    // } else {
    //     // set the provider you want from Web3.providers

    // }


    FIFA.getTournament(function (error, result) {
        if (!error) {
            if (result[0] != "") {
                document.getElementById("opener").disabled = false;

                $("#tournament").html(result[0]);
                if (result[3] == result[2]) {
                    $("#tournamentCount").html("Alle " + result[2] + " Plätze sind belegt!");
                    document.getElementById("opener").disabled = true;
                } else {
                    $("#tournamentCount").html(result[3] + " von " + result[2] + " Plätzen belegt!");
                }
            } else {
                document.getElementById("opener").disabled = true;
                $("#tournament").html("KEIN TURNIER GESTARTET!");
                $("#tournamentCount").html("Bitte wende dich an den Game Master.");
            }

        }
        else
            console.error(error);
    });

    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 250
        },
        hide: {
            effect: "blind",
            duration: 250
        }
    });


    var dialog, form,

        name = $("#name"),
        club = $("#club"),
        eth_address = $("#eth_address")
    allFields = $([]).add(name).add(club).add(eth_address),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min) {
        if (o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Länge von " + n + " muss mindestens " +
                min + " betragen.");
            return false;
        } else {
            return true;
        }
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "Alias", 3);
        valid = valid && checkLength(club, "Verein", 3);

        if (valid) {
            //success function (register)
            dialog.dialog("close");
        }
        return valid;
    }

    dialog = $("#register").dialog({
        autoOpen: false,
        resizable: false,
        modal: true,
        buttons: {
            "Registrieren": addUser,
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {
            form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();

    });

    $("#opener").on("click", function () {
        const open = FIFA.getTournament();
        dialog.dialog("open");
    });


    //Get CMC Data
    function Get(yourUrl) {
        const Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }

    const cmcData = JSON.parse(Get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'));

    /* Rotate Text stuff */

    const TxtRotate = function (el, prices, period) {
        const result = FIFA.getTournament();

        for (let index = 0; index < 4; index++) {
            switch (index) {
                case 0:
                    prices[0] = (result[1] / 1000000000000000000 * cmcData[0].price_eur).toFixed(2) + " €.";
                    break;
                case 1:
                    prices.push((result[1] / 1000000000000000000 * cmcData[0].price_usd).toFixed(2) + " $.");
                    break;
                case 2:
                    prices.push((result[1] / 1000000000000000000).toFixed(2) + " ETH.");
                    break;
                case 3:
                    prices.push(result[1] + " Wei.");
                    break;
                default:

            }
        }
        this.prices = prices;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1500;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.prices.length;
        var fullTxt = this.prices[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var prices = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (prices) {
            new TxtRotate(elements[i], JSON.parse(prices), period);
        }
    }

    /* End Rotate Text stuff */
});