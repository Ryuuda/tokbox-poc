updateUrl = function () {
	$.getJSON('/generateSession', function (data) {
		document.getElementById("pub-room").innerHTML = window.location.origin + "/session/" + data.session + "/publisher";
		document.getElementById("pub-room").href = window.location.origin + "/session/" + data.session + "/publisher" ;

		document.getElementById("sub-room").innerHTML = window.location.origin + "/session/" + data.session + "/subscriber";
		document.getElementById("sub-room").href = window.location.origin + "/session/" + data.session + "/subscriber";

	})
}
