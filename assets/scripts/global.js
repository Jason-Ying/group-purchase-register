function getResidentList(unit, floor, checked, should) {
	let datas = { "unit": unit, "floor": floor, "checked": checked, "should": should };
	$.ajax({
		url: './assets/db/query.php',
		type: 'post',
		dataType: 'json',
		data: datas,
		async: false,
		success: function (result) {
			queryRes = [];
			for (let i = 0; i < result.split(";").length - 1; i++) {
				queryRes[i] = result.split(";")[i].split(",");
			} // syid unit room name gender id phone checked should
			// 0    1    2    3    4      5  6     7       8
		},
		error: function () {
			alert("FATAL_ERR: ERR_QUERY_PHP");
		}
	})
}
function check(n, requ) {
	$.ajax({
		url: './assets/db/check.php',
		type: 'post',
		dataType: 'json',
		data: { "sid": n, "req": requ },
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