function sleep(ms, callback) {
	setTimeout(callback, ms);
}



let queryRes = new Array();



function getItems() {
	$.ajax({
		url: './assets/db/list_query.php',
		type: 'post',
		dataType: 'json',
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



let titleModel =
	"<tr>" +
	"<td style=\"width: 4rem\">商品号</td>" +
	"<td style=\"width: 5rem\">商品名称</td>" +
	"<td style=\"width: 4rem\">数量</td>" +
	"<td style=\"width: 7rem\">已领数量</td>" +
	"<td style=\"width: 7rem\">非封控楼数量</td>" +
	"<td style=\"width: 7rem\">非封控楼已领数量</td>" +
	"</tr>";
let lookModel =
	"<tr bgcolor=\"COLOR\">" +
	"<td>NUM</td>" +
	"<td>NAME</td>" +
	"<td>CNT</td>" +
	"<td>OK</td>" +
	"<td>NO_CNT</td>" +
	"<td>NO_OK</td>" +
	"</tr>";

let itemCnt = function () {
	let self = this;
	self.cntAll = 0;
	self.cntNonLockdown = 0;
	self.okAll = 0;
	self.okNonLockdown = 0;
}
let itemsName = new Set();
let itemsCnt = new Array();
let itemsId = new Map();
function transformDat() {
	itemsName.clear();
	itemsCnt = [];
	itemsId.clear();
	let tmpId = -1;
	for (let i = 0; i < queryRes.length; ++i) {
		for (let j = 0; j < queryRes[i][1].split(",").length - 1; j++) {
			if (!itemsName.has(queryRes[i][1].split(",")[j].split("*")[0])) itemsCnt[++tmpId] = new itemCnt;
			itemsName.add(queryRes[i][1].split(",")[j].split("*")[0]);
		}
	}
	let tmp = 0;
	itemsName.forEach(function (v) {
		itemsId.set(v, tmp);
		tmp++;
		console.log(tmp);
	});
	for (let i = 0; i < queryRes.length; ++i) {
		for (let j = 0; j < queryRes[i][1].split(",").length - 1; j++) {
			let thisCnt = parseInt(queryRes[i][1].split(",")[j].split("*")[1]);
			let id = itemsId.get(queryRes[i][1].split(",")[j].split("*")[0]);
			itemsCnt[id].cntAll += thisCnt;
			if (!locked(queryRes[i][0])) itemsCnt[id].cntNonLockdown += thisCnt;
			if ((1 << j) & parseInt(queryRes[i][2])) {
				itemsCnt[id].okAll += thisCnt;
				if (!locked(queryRes[i][0])) itemsCnt[id].okNonLockdown += thisCnt;
			}
		}
	}
}
function updateLook() {
	document.getElementById("info").innerHTML = titleModel;
	let tmpId = -1;
	itemsName.forEach(function (v) {
		let itemModel = lookModel;
		itemModel = itemModel.replace(/NUM/g, (++tmpId) + 1); // id
		itemModel = itemModel.replace(/NAME/g, v); // item name
		itemModel = itemModel.replace(/NO_OK/g, itemsCnt[tmpId].okNonLockdown);
		itemModel = itemModel.replace(/NO_CNT/g, itemsCnt[tmpId].cntNonLockdown);
		itemModel = itemModel.replace(/OK/g, itemsCnt[tmpId].okAll);
		itemModel = itemModel.replace(/CNT/g, itemsCnt[tmpId].cntAll);
		itemModel = itemModel.replace(/COLOR/g, "");
		document.getElementById("info").innerHTML += itemModel;
	});
}



$("#refresh").on("click", function () { refreshDat() });
function refreshDat() {
	getItems();
	transformDat();
	updateLook();
}



refreshDat();