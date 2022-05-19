let lockedList = new Array();
function getLockdown() {
	$.ajax({
		url: './assets/db/lockdown_query.php',
		type: 'post',
		dataType: 'json',
		async: false,
		success: function (result) {
			lockedList = result.split(",");
		},
		error: function () {
			alert("FATAL_ERR: ERR_LDQUERY_PHP");
		}
	})
}
function locked(s) {
	for (let i = 0; i < lockedList.length; ++i)
		if (parseInt(s.substring(0, 2)) == lockedList[i]) return true;
	return false;
}
function init(){
	$.ajax({
		url: './assets/db/init.php',
		type: 'post',
		async: false
	})
}