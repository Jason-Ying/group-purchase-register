function getResidentList(unit, checked) {
	if (checked === null) checked = "-1";
	else checked = checked.join(",");
	let datas = { "unit": unit, "checked": checked };
	$.ajax({
		url: './assets/db/query.php',
		type: 'post',
		dataType: 'json',
		data: datas,
		async: false,
		success: function (result) {
			queryRes = [];
			for (let i = 0; i < result.split(";;;").length - 1; i++) {
				queryRes[i] = result.split(";;;")[i].split(";");
			}
		},
		error: function () {
			alert("FATAL_ERR: ERR_QUERY_PHP");
		}
	})
}
function check(n, requ, ver_all) {
	$.ajax({
		url: './assets/db/check.php',
		type: 'post',
		dataType: 'json',
		data: { "id": n, "req": requ, "ver_all": ver_all },
		async: false,
		success: function (result) {
			if (result != "success") alert("ERR: ERR_CHECK_REP");
		},
		error: function () {
			alert("FATAL_ERR: ERR_CHECK_PHP");
		}
	})
}
function reset() {
	$.ajax({
		url: './assets/db/reset.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			if (result != "success") alert("ERR: ERR_RESET_REP");
		},
		error: function () {
			alert("FATAL_ERR: ERR_RESET_PHP");
		}
	})
}