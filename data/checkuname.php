<?php
header('Content-Type: text/plain');

$user_name =$_REQUEST['user_name'];

//连接数据库，执行用户名和密码的验证
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT user_id FROM mc_users WHERE user_name='$user_name'";   
$result = mysqli_query($conn, $sql);
//上述查询结果集中可能有1/0行记录
$row = mysqli_fetch_array($result);
if($row){	//查询结果集中有一行记录
	echo 'unok';
}else{  //查询结果集中没有记录
	echo 'ok';
}
?>