<?php
header('Content-Type: application/json');
$user_name =$_REQUEST['username']; 
$output=[];
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "select * from mc_orders where user_name='$user_name'";   
$result = mysqli_query($conn, $sql);
//$row = mysqli_fetch_assoc($result);
while($row = mysqli_fetch_assoc($result)){
	$output[]=$row;
}
echo json_encode($output);
?>