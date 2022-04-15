<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'gprs');
$utf = mysqli_query($conn, "set names utf8");


$id = $_POST["id"];
$req = $_POST["req"];
$ver_all = $_POST["ver_all"];


$sql = mysqli_query($conn, "update purc set checked=$req where id=$id");
if ("-1" == $req) $sql = mysqli_query($conn, "update purc set checkStat=0 where id=$id");
if ($ver_all == $req) $sql = mysqli_query($conn, "update purc set checkStat=2 where id=$id");
else $sql = mysqli_query($conn, "update purc set checkStat=1 where id=$id");

if (1 == 0) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
