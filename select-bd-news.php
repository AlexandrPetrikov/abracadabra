<?php

$connection = mysql_connect("localhost", "mybd_user", "123456");
$bd = mysql_select_db("my_bd");
mysql_query(" SET NAMES 'utf8' ");//mysql_set_charset("utf8");

	if(!$connection || !$bd){ 
		exit(mysql_error());
	};

$result = mysql_query(" SELECT * FROM news ");

mysql_close();
?>