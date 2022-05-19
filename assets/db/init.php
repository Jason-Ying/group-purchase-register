<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));

if (mysqli_query($conn, "CREATE DATABASE gprs")) {
	echo "Database created";
} else {
	echo "Error creating database: " . mysqli_error($conn);
	return;
}

$sql = file_get_contents('init.sql');

if (mysqli_multi_query($conn, $sql)) {
	echo json_encode('init_success');
} else {
	echo json_encode('init_fail');
}