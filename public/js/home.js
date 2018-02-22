updateUrl = function () {
	$.getJSON('/generateSession', function (data) {
		document.getElementById("room").innerHTML = window.location.origin + "/session/" + data.session;
		document.getElementById("room").href = window.location.origin + "/session/" + data.session;
	})
}


var dummylinks = [
	{
		room: 1,
		url: 'https://dev2.notarycam.com/session/2_MX40NjA2NTk1Mn5-MTUxOTM0MTIzNTA1OX5JeUptZ3Mvc1IwVjRjQU1BaEJ1dGtNUTB-UH4',
	},
	{
		room: 2,
		url: 'https://dev2.notarycam.com/session/2_MX40NjA2NTk1Mn5-MTUxOTM0MTIzNTA1OX5JeUptZ3Mvc1IwVjRjQU1BaEJ1dGtNUTB-UH4',
	},
	{
		room: 3,
		url: 'https://dev2.notarycam.com/session/2_MX40NjA2NTk1Mn5-MTUxOTM0MTIzNTA1OX5JeUptZ3Mvc1IwVjRjQU1BaEJ1dGtNUTB-UH4',
	},
	{
		room: 4,
		url: 'https://dev2.notarycam.com/session/2_MX40NjA2NTk1Mn5-MTUxOTM0MTIzNTA1OX5JeUptZ3Mvc1IwVjRjQU1BaEJ1dGtNUTB-UH4',
	},
	{
		room: 5,
		url: 'https://dev2.notarycam.com/session/2_MX40NjA2NTk1Mn5-MTUxOTM0MTIzNTA1OX5JeUptZ3Mvc1IwVjRjQU1BaEJ1dGtNUTB-UH4',
	}
]