<?php
 /**��ҳ��ѯ���ݣ���main.html����**/
 header('Content-Type:application/json');
$output = [];
$count = 4; //һ������ѯ 4 ��
@$start = $_REQUEST['start'];  //@���ſ���ѹ�Ƶ�ǰ�в����Ĵ�����ʾ
//Ĭ�ϴ� 0 ��ʼ
if(empty($start)) { $start = 0; }

 $conn = mysqli_connect('127.0.0.1','root','','mc');
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT *  FROM  show_vip  LIMIT $start,$count";
 $result = mysqli_query($conn, $sql);
 while( true ){
     //�ӽ�����ж�ȡһ�м�¼
     $row = mysqli_fetch_assoc($result);
     if(! $row ){  //û�л�ȡ�������¼��
         break;
     }
     $output[] = $row;
 }
 echo json_encode($output);
 ?>