<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel='stylesheet' href='css/index.css'>
</head>
<body>
<header>
	<h1>Abracadabra</h1>
</header>
<?php

$connection = mysql_connect("localhost", "mybd_user", "123456");
$bd = mysql_select_db("my_bd");
mysql_query(" SET NAMES 'utf8' ");//mysql_set_charset("utf8");

	if(!$connection || !$bd){ 
		exit(mysql_error());
	};

$result = mysql_query(" SELECT * FROM news ");

mysql_close();

while($row = mysql_fetch_array($result)){
?>
	<h1><?php echo $row['title']; ?><br></h1>
	<p><?php echo $row['text']; ?><br></p>
	<span>Дата публикации: <?php echo $row['date'];	?></span>
	<span><?php echo $row['time']; ?></span>
	<span>Автор новости: <?php echo $row['author']; ?></span>
	<hr>
<?php
}
?>
<p>your luck</p>
</body>
</html>