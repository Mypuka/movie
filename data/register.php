<?php
header('Content-Type: text/plain');

$user_name = $_REQUEST['username'];
$user_pwd = $_REQUEST['userpwd'];

//�������ݿ⣬ִ���û������������֤
$conn = mysqli_connect(SAE_MYSQL_HOST_M, SAE_MYSQL_USER, SAE_MYSQL_PASS,  SAE_MYSQL_DB, SAE_MYSQL_PORT);
$sql = "SET NAMES UTF8";
mysqli_query($conn, $sql);
$sql = "SELECT user_id FROM mc_users WHERE user_name='$user_name' AND user_pwd='$user_pwd'";   
$result = mysqli_query($conn, $sql);
//������ѯ������п�����1/0�м�¼
$row = mysqli_fetch_array($result);
if($row){	//��ѯ���������һ�м�¼
	echo $row['user_id'];
}else{  //��ѯ�������û�м�¼
	echo '-1';
}
?>