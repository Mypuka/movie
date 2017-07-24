<?php
	header("Content-Type:text/plain");
	$name=$_REQUEST['uname'];
	$pwd=$_REQUEST['upwd'];
	$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
	$sql="SET NAMES UTF8";
	mysqli_query($conn,$sql);
	$sql="INSERT INTO `mc_users` VALUES(NULL, '$name', $pwd);";
	$result=mysqli_query($conn,$sql);
	if ($result!=false){
		$str='ok';
	}else{
		$str='unok';	
	}
	echo $str;
?>