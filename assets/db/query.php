<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'srs');
$utf = mysqli_query($conn, "set names utf8");


$unit = $_POST["unit"];
$floor = $_POST["floor"];
$checked = $_POST["checked"];
$should = $_POST["should"];



$query = "";
if ($unit != "-1") $query = $query . "buildingInfo = " . $unit . " and ";
if ($floor != "-1") $query = $query . "substring(roomInfo,1,length(roomInfo)-2) = " . $floor . " and ";
if ($checked != "-1") $query = $query . "checkedInfo = " . $checked . " and ";
if ($should != "-1") $query = $query . "shouldInfo = " . $should . " and ";
if ($query != "") {
	$query = substr($query, 0, -5);
	$query = "where " . $query;
}

$sql = mysqli_query($conn, "select * from resi " . $query);

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
	for ($j = 0; $j < 8; $j++) {
		$rowall = $rowall . $rows[$i][$j] . ',';
	}
	$rowall = $rowall . $rows[$i][$j] . ';';
}

if (1 == 0) {
	echo json_encode('err');
} else {
	echo json_encode($rowall);
}
