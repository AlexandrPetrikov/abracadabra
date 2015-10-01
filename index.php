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
		<nav>
			<ul>
				<li><a href="#">Новости</a></li>
				<li><a href="#">Полезное</a></li>
				<li><a href="#">О авторе</a></li>
			</ul>
		</nav>
	</header>
	<section class="content">
		<?php
			require "select-bd-news.php";
			while($row = mysql_fetch_array($result)){
		?>
		<h1>           <?php echo $row['title']; ?><br></h1>
		<p><?php echo $row['text']; ?><br></p>
		<span>Дата публикации: <?php echo $row['date'];	?></span>
		<span><?php echo $row['time']; ?></span>
		<span>Автор новости: <?php echo $row['author']; ?></span>
		<hr>
		<?php
			};
		?>
	</section>
</body>
</html>