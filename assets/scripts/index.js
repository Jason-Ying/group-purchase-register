function sleep(ms, callback) {
	setTimeout(callback, ms);
}



let queryRes = new Array();



function getOrders(unit, checked) {
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



let titleModel =
	"<tr>" +
	"<td style=\"width: 4rem\">接龙号</td>" +
	"<td style=\"width: 5rem\">房间号</td>" +
	"<td style=\"width: 4rem\">姓名</td>" +
	"<td style=\"width: 7rem\">手机号</td>" +
	"<td>商品列表</td>" +
	"<td style=\"width: 3rem\">领取</td>" +
	"<td style=\"width: 4rem\">状态</td>" +
	"</tr>";
let lookModel =
	"<tr bgcolor=\"COLOR\">" +
	"<td>ID</td>" +
	"<td>ROOM</td>" +
	"<td>NAME</td>" +
	"<td><a href=\"tel: PHONE\">PHONE</a></td>" +
	"<td>ITEMS</td>" +
	"<td><select style=\"width: 4rem\" multiple=\"multiple\" id=\"checkedNUM\" onblur=\"trueOnClick(NUM);\">OPTIONS</select></td>" +
	"<td>CHECKED</td>" +
	"</tr>";
let checkedText = ["未领", "已领"];



function trueOnClick(i) {
	if ($("#checked" + i.toString()).val() === null) {
		check(queryRes[i][0], 0, ((1 << (queryRes[i][5].split(",").length - 1)) - 1));
		queryRes[i][7] = "0";
	} else {
		let checkReq = 0;
		for (let j = 0; j < $("#checked" + i.toString()).val().length; j++) {
			checkReq |= (1 << parseInt($("#checked" + i.toString()).val()[j]));
		}
		check(queryRes[i][0], checkReq, ((1 << (queryRes[i][5].split(",").length - 1)) - 1));
		queryRes[i][7] = checkReq.toString();
	}
	updateLook();

	sleep(100, () => {
		refreshDat();
	})
}
function updateLook() {
	document.getElementById("info").innerHTML = titleModel;
	for (let i = 0; i < queryRes.length; ++i) {
		let orderModel = lookModel;
		let optionsRepl;
		for (let j = 0; j < queryRes[i][5].split(",").length - 1; j++) {
			optionsRepl += "<option value=\"" + j.toString() + "\">" + queryRes[i][5].split(",")[j] + "</option>";
		}
		orderModel = orderModel.replace(/OPTIONS/g, optionsRepl);
		orderModel = orderModel.replace(/NUM/g, i); // id
		orderModel = orderModel.replace(/ID/g, queryRes[i][1]); // sid
		orderModel = orderModel.replace(/ROOM/g, queryRes[i][2]); // room
		orderModel = orderModel.replace(/NAME/g, queryRes[i][3]); // name
		orderModel = orderModel.replace(/PHONE/g, queryRes[i][4]); // phone
		orderModel = orderModel.replace(/ITEMS/g, queryRes[i][5].split(",").join("<br>"))
		if (locked(queryRes[i][2])) {
			orderModel = orderModel.replace(/COLOR/g, "red");
		}
		if (queryRes[i][7] == "0") { // checked
			orderModel = orderModel.replace(/CHECKED/g, "未领");
			orderModel = orderModel.replace(/COLOR/g, "white");
		} else if (parseInt(queryRes[i][7]) < (1 << (queryRes[i][5].split(",").length - 1)) - 1) {
			orderModel = orderModel.replace(/CHECKED/g, "未领完");
			orderModel = orderModel.replace(/COLOR/g, "orange");
		} else {
			orderModel = orderModel.replace(/CHECKED/g, "已领");
			orderModel = orderModel.replace(/COLOR/g, "green");
		}
		document.getElementById("info").innerHTML += orderModel;
	}
	for (let i = 0; i < queryRes.length; i++) {
		let chosen = [];
		for (let j = 0; j < queryRes[i][5].split(",").length - 1; j++) {
			if ((1 << j) & parseInt(queryRes[i][7])) {
				chosen.push(j.toString());
			}
		}
		$("#checked" + i.toString()).val(chosen);
	}
}



$("#refresh").on("click", function () { refreshDat() });
function refreshDat() {
	getLockdown();
	getOrders($("#unit").val(), $("#checked").val());
	updateLook();
}
$("#reset-sort").on("click", function () {
	$("#unit").val("-1");
	$("#checked").val("-1");
	refreshDat();
})

function setSort(n) {
	let sortPattern =
		[[-1, [0, 1]],
		[-1, [2]],
		[-3, [-1]],
		[-2, [-1]]];
	$("#unit").val(sortPattern[n][0]);
	$("#checked").val(sortPattern[n][1]);
	refreshDat();
}



refreshDat();