function sleep(ms, callback) {
	setTimeout(callback, ms)
}
let titleModel = "<tr>" +
	"<td>楼栋</td>" +
	"<td>房间号</td>" +
	"<td style=\"width: 4rem\">姓名</td>" +
	"<td>性别</td>" +
	// "<td>身份证号</td>" +
	"<td>手机号</td>" +
	"<td>已检</td>" +
	"<td>应检</td>";
"</tr>";
let lookModel = "<tr bgcolor=\"COLOR\">" +
	"<td>BUILDING</td>" +
	"<td>ROOM</td>" +
	"<td>NAME</td>" +
	"<td>GENDER</td>" +
	// "<td>ID</td>" +
	"<td><a href=\"tel: PHONE\">PHONE</a></td>" +
	"<td><input type=\"button\" id=\"checkedNUM\" value=\"CHECKED\" onclick=\"trueOnClick(NUM, \'checkedInfo\');\"></td>" +
	"<td><input type=\"button\" id=\"shouldNUM\" value=\"SHOULD\" onclick=\"trueOnClick(NUM, \'shouldInfo\');\"></td>" +
	"</tr>";
let bgColor = ["white", "green", "yellow", "orange"];
let genderText = ["男", "女"];
let checkedText = ["未检", "已检"];
let shouldText = ["应检", "其他"];
function trueOnClick(i, type) {
	let confStr = "";
	if (type === "checkedInfo") {
		if (queryRes[i][7] === "1") confStr = "确认登记 姓名：" + queryRes[i][3] + " 为未进行检测?";
		else {
			confStr = "确认登记\n姓名：" + queryRes[i][3] + " 身份证号后四位：" + queryRes[i][5].substr(-4) + "\n为已进行检测?"
			if (queryRes[i][8] === "1") confStr += "\n【注意】此人被标记为无需检测人群。";
		}
	}
	else {
		if (queryRes[i][8] === "1") confStr = "确认标记\n姓名：" + queryRes[i][3] + "\n为需要正常进行检测?";
		else {
			confStr = "确认标记 姓名：" + queryRes[i][3] + " 为无需进行检测?"
			if (queryRes[i][7] === "1") confStr += "\n【注意】此人已被登记为已进行检测。";
		}
	}
	let conf = confirm(confStr);
	if (!conf) {
		return;
	}
	if (type === "checkedInfo") {
		queryRes[i][7] = (1 - parseInt(queryRes[i][7])).toString();
	} else if (type === "shouldInfo") {
		queryRes[i][8] = (1 - parseInt(queryRes[i][8])).toString();
	}
	updateLook();
	check(queryRes[i][0], type);

	sleep(100, () => {
		refreshDat();
	})
}
function updateLook() {
	document.getElementById("info").innerHTML = titleModel;
	for (let i = 0; i < queryRes.length; ++i) {
		let personModel = lookModel;
		personModel = personModel.replace(/NUM/g, i); // syid
		personModel = personModel.replace(/BUILDING/g, queryRes[i][1]); // buildinginfo
		personModel = personModel.replace(/ROOM/g, queryRes[i][2]); // roominfo
		personModel = personModel.replace(/NAME/g, queryRes[i][3]); // nameinfo
		personModel = personModel.replace(/GENDER/g, genderText[queryRes[i][4]]); // genderinfo
		// personModel = personModel.replace(/ID/g, queryRes[i][5]); // idinfo
		personModel = personModel.replace(/PHONE/g, queryRes[i][6]); // phoneinfo
		personModel = personModel.replace(/CHECKED/g, checkedText[queryRes[i][7]]); // checkedinfo
		personModel = personModel.replace(/SHOULD/g, shouldText[queryRes[i][8]]); // shouldinfo
		let j = 0;
		if (queryRes[i][7].toString() === "1") {
			j += 1;
		} if (queryRes[i][8].toString() === "1") {
			j += 2;
		}
		personModel = personModel.replace(/COLOR/g, bgColor[j]);

		document.getElementById("info").innerHTML += personModel;
	}
}

$("#refresh").on("click", function () { refreshDat() });
function refreshDat() {
	getResidentList($("#unit").val(), $("#floor").val(), $("#checked").val(), $("#should").val());
	updateLook();
}

$("#reset-sort").on("click", function () {
	$("#unit").val("-1");
	$("#floor").val("-1");
	$("#should").val("-1");
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
		[[-2, -2, 0, 0],
		[-2, -2, 1, 0],
		[-2, -2, 0, 1],
		[-2, -2, 1, 1]];
	if (sortPattern[n][0] != -2) $("#unit").val(sortPattern[n][0]);
	if (sortPattern[n][1] != -2) $("#floor").val(sortPattern[n][1]);
	if (sortPattern[n][2] != -2) $("#checked").val(sortPattern[n][2]);
	if (sortPattern[n][3] != -2) $("#should").val(sortPattern[n][3]);
	refreshDat();
}