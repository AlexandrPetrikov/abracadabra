<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link href="http://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" type="text/css">
	<link rel='stylesheet' href='css/global.css'>

</head>
<body>
	<header>
		<div class="logo">
				<h1><a href="index.php">Abracadabra</a></h1>
		</div>
	</header>
	<nav>
		<ul>
			<li><a href="news.php">Новости</a></li>
			<li><a href="#">Полезное</a></li>
			<li><a href="#">Каталог</a></li>
			<li><a href="#">Связь</a></li>
		</ul>
		<form action="">
			<button class="log-in">Log In</button>
			<button class="sign-up">Sign Up</button>
		</form>
	</nav>
	</header>
	<section class="content">
		<article>
			<?php
				require "select-bd-news.php";
				while($row = mysql_fetch_array($result)){
			?>
			<h1><?php echo $row['title']; ?><br></h1>
			<p><?php echo $row['text']; ?><br></p>
			<span>Дата публикации: <?php echo $row['date'];	?></span>
			<span><?php echo $row['time']; ?></span>
			<span>Автор новости: <?php echo $row['author']; ?></span>
			<hr>
			<?php
				};
			?>
		</article>
	</section>
	<footer >
		<div class="foot-box-group">
			<div class="foot-box1">
				<i><img src="http://localhost/abracadabra/images/CLCode.gif" alt=""></i>
			</div>
			<div class="foot-box2">
				<ul>
					<li><p>Contact us</p></li>
					<li>mojref@gmail.com</li>
					<li>pomo6nik@bk.ru</li>
					<li>#######@gmail.com</li>

				</ul>
			</div>
			<div class="foot-box3">
				<ul>
					<li><p>Contact us</p></li>
					<li>Александр Петриков</li>
					<li>Александр</li>
					<li>©2015 by CLCode </li>
				</ul>
			</div>
		</div>
	</footer>
</body>
</html>