<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'gprs');
$utf = mysqli_query($conn, "set names utf8");

$sql = mysqli_query($conn, "select room,items,checked from purc");

$i = 0;
$row = mysqli_fetch_array($sql);
if (!$row) {
	echo json_encode("empty");
	return;
}

do {
	$rows[$i] = $row;
	$i++;
} while ($row = mysqli_fetch_array($sql));
$rowall = '';
for ($i = 0; $i < count($rows); $i++) {
	for ($j = 0; $j < 2; $j++) {
		$rowall = $rowall . $rows[$i][$j] . ';';
	}
	$rowall = $rowall . $rows[$i][$j] . ';;;';
}

if (1 == 0) {
	echo json_encode('err');
} else {
	echo json_encode($rowall);
}
