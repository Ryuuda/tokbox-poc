updateUrl = function () {
	$.getJSON('/generateSession', function (data) {
		document.getElementById("room").innerHTML = window.location.origin + "/session/" + data.session;
		document.getElementById("room").href = window.location.origin + "/session/" + data.session;
	})
}
