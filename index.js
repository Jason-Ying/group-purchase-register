function sleep(ms, callback) {
	setTimeout(callback, ms);
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
		let personModel = lookModel;
		let optionsRepl;
		for (let j = 0; j < queryRes[i][5].split(",").length - 1; j++) {
			optionsRepl += "<option value=\"" + j.toString() + "\">" + queryRes[i][5].split(",")[j] + "</option>";
		}
		personModel = personModel.replace(/OPTIONS/g, optionsRepl);
		personModel = personModel.replace(/NUM/g, i); // id
		personModel = personModel.replace(/ID/g, queryRes[i][1]); // sid
		personModel = personModel.replace(/ROOM/g, queryRes[i][2]); // room
		personModel = personModel.replace(/NAME/g, queryRes[i][3]); // name
		personModel = personModel.replace(/PHONE/g, queryRes[i][4]); // phone
		personModel = personModel.replace(/ITEMS/g, queryRes[i][5].split(",").join("<br>"))
		if (queryRes[i][2].substring(0, 2) == "09" || queryRes[i][2].substring(0, 2) == "28" ||
		queryRes[i][2].substring(0, 2) == "47" || queryRes[i][2].substring(0, 2) == "01" ||
		queryRes[i][2].substring(0, 2) == "72" || queryRes[i][2].substring(0, 2) == "02" ||
		queryRes[i][2].substring(0, 2) == "49" || queryRes[i][2].substring(0, 2) == "63") {
			personModel = personModel.replace(/COLOR/g, "red");
		}
		if (queryRes[i][7] == "0") { // checked
			personModel = personModel.replace(/CHECKED/g, "未领");
			personModel = personModel.replace(/COLOR/g, "white");
		} else if (parseInt(queryRes[i][7]) < (1 << (queryRes[i][5].split(",").length - 1)) - 1) {
			personModel = personModel.replace(/CHECKED/g, "未领完");
			personModel = personModel.replace(/COLOR/g, "orange");
		} else {
			personModel = personModel.replace(/CHECKED/g, "已领");
			personModel = personModel.replace(/COLOR/g, "green");
		}
		document.getElementById("info").innerHTML += personModel;
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
	getResidentList($("#unit").val(), $("#checked").val());
	updateLook();
}

$("#reset-sort").on("click", function () {
	$("#unit").val("-1");
	$("#checked").val("-1");
	refreshDat();
})
$("#reset").on("click", function () {
	let conf = prompt("将要重置所有已检记录数据，此操作不可撤销，若要继续请输入当前日期");
	if (parseInt(conf) === new Date().getDate()) {
		reset();
		refreshDat();
		alert("已重置！");
		window.location.reload();
	}
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