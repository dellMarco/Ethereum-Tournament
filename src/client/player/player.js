

$(document).ready(function () {
    if (getCookie("address") !== "") {
        alert("Der Game Master kann nicht selbst mitspielen!")
        window.location = "../gameMaster/gamePlan.html";
    }
    var fee = null;

    FIFA.methods.getTournament().call(function (error, result) {
        if (!error) {
            if (result[0] != "") {
                document.getElementById("opener").disabled = false;
                fee = result[1];
                rotate();
                $("#tournament").html(result[0]);

                if (parseInt(result[3]) === parseInt(result[2])) {
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
    $("#opener").on("click", function () {
        if ($("#name").val() == "") {
            $("#name").effect("shake");
            return;
        }

        addUser()

    });

    function addUser() {

        FIFA.methods.getPlayerCount().call(function (error, result) {

            if (!error) {
                count = result * 1 + 1;
                var name = $("#name").val()

                FIFA.methods.register(
                    name
                )
                    .send(
                        {
                            from: allAccounts[count],
                            value: fee, gas: 500000
                        },
                        function (err) {
                            if (!err) {
                                document.cookie = "address=" + allAccounts[count] + ";path=/";
                            }
                        })
                console.log(name + " registriert")
                return;

                //windows.location = "../gameMaster/gamePlan.html";

            } else {
                alert(error)
            }
        })
    }

    /* Rotate Text stuff */
    function rotate() {
        const TxtRotate = function (el, prices, period) {


            for (let index = 0; index < 4; index++) {
                switch (index) {
                    case 0:
                        prices[0] = (fee / 1000000000000000000 * cmcData[0].price_eur).toFixed(2) + " €.";
                        break;
                    case 1:
                        prices.push((fee / 1000000000000000000 * cmcData[0].price_usd).toFixed(2) + " $.");
                        break;
                    case 2:
                        prices.push((fee / 1000000000000000000).toFixed(2) + " ETH.");
                        break;
                    case 3:
                        prices.push(fee + " Wei.");
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
    }
    /* End Rotate Text stuff */
});

