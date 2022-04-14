<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$select = mysqli_select_db($conn, 'srs');
$utf = mysqli_query($conn, "set names utf8");



$sql = mysqli_query($conn, "update resi set checkedInfo=0");


if (1 == 0) {
	echo json_encode('err');
} else {
	echo json_encode('success');
}
?>