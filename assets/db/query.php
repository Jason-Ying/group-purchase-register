<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'gprs');
$utf = mysqli_query($conn, "set names utf8");


$unit = $_POST["unit"];
$checked = $_POST["checked"];



$query = "";
if ($unit == "-3") $query = "(substring(room,1,2) = 9 or substring(room,1,2) = 28
or substring(room,1,2) = 47 or substring(room,1,2) = 1 or substring(room,1,2) = 72
or substring(room,1,2) = 2 or substring(room,1,2) = 49 or substring(room,1,2) = 63) and ";
else if ($unit == "-2") $query = "(not (substring(room,1,2) = 9 or substring(room,1,2) = 28
or substring(room,1,2) = 47 or substring(room,1,2) = 1 or substring(room,1,2) = 72
or substring(room,1,2) = 2 or substring(room,1,2) = 49 or substring(room,1,2) = 63)) and ";
else if ($unit != "-1") $query = $query . "substring(room,1,2) = " . $unit . " and ";

if ($checked != "-1") {
	for ($i = 0; $i < sizeof(explode(",", $checked)); $i++) {
		$query = $query . "checkStat = " . explode(",", $checked)[$i] . " or ";
	}
}
if ($query != "") {
	$query = substr($query, 0, -4);
	$query = "where " . $query;
}

$sql = mysqli_query($conn, "select * from purc " . $query);

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
	for ($j = 0; $j < 7; $j++) {
		$rowall = $rowall . $rows[$i][$j] . ';';
	}
	$rowall = $rowall . $rows[$i][$j] . ';;;';
}

if (1 == 0) {
	echo json_encode('err');
} else {
	echo json_encode($rowall);
}
