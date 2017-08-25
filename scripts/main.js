
$('select[name="dropdown"]').change(function() {
	Papa.parse("data/ortaanadolu-azot.csv", {
		download: true,
		complete: function(results) {
			console.log(results);
		}
	});
});