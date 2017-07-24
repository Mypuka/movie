<?php
 /**分页查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];
$count = 4; //一次最多查询 4 条
@$start = $_REQUEST['start'];  //@符号可以压制当前行产生的错误提示
//默认从 0 开始
if(empty($start)) { $start = 0; }

 $conn = mysqli_connect('127.0.0.1','root','','mc');
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT *  FROM  show_vip  LIMIT $start,$count";
 $result = mysqli_query($conn, $sql);
 while( true ){
     //从结果集中读取一行记录
     $row = mysqli_fetch_assoc($result);
     if(! $row ){  //没有获取到更多记录行
         break;
     }
     $output[] = $row;
 }
 echo json_encode($output);
 ?>