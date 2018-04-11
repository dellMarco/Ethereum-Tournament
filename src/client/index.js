var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
var allAccounts = {};

web3.eth.getAccounts()
	.then(accounts => {
		web3.eth.defaultAccount = accounts[0];
		allAccounts = accounts;
	})

var FIFA = {};
var defaultAcc;

$.ajax({
	url: '/api/contract',
	async: false,
	success: function (res) {
		FIFA = new web3.eth.Contract(res.abi, res.address);
	},
	error: console.error
});


//Get CMC Data
function Get(yourUrl) {
	const Httpreq = new XMLHttpRequest();
	Httpreq.open("GET", yourUrl, false);
	Httpreq.send(null);
	return Httpreq.responseText;
}
const cmcData = JSON.parse(Get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR'));

$(document).ready(function () {

	$("#player").on("click", function () {
		window.location = "/player/index.html"
	});
	$("#gameMaster").on("click", function () {
		window.location = "/gameMaster/index.html"
	});


});

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";

}