<?php
@header("content-type:text/html;charset=utf8");
$conn = mysqli_connect("localhost", "root", "123456") or die("FATAL_ERR" . mysqli_error($conn));
$utf = mysqli_query($conn, "set names utf8");

// Create database
if (mysqli_query($conn, "CREATE DATABASE resi")) {
	echo "Database created";
} else {
	echo "Error creating database: " . mysqli_error($conn);
}

// Create table in my_db database
$select = mysqli_select_db($conn, 'resi');
$sql = "CREATE TABLE resi
(
syid int IDENTITY(1,1),
buildingInfo varchar(3),
roomInfo varchar(5),
nameInfo varchar(15),
genderInfo tinyint(1), 
idInfo varchar(18),
phoneInfo varchar(20),
loginInfo tinyint(1),
liveInfo tinyint(1),
workInfo tinyint(1),
moveInfo tinyint(1)
)";
mysqli_query($conn, $sql);
?>