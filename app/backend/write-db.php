<?php
$data = json_decode(file_get_contents('php://input'));

$date = filter_var($data->date, FILTER_SANITIZE_STRING);
$time = filter_var($data->time, FILTER_SANITIZE_STRING);
$phoneNum = filter_var($data->phoneNumber, FILTER_SANITIZE_STRING);

if (mb_strlen($date) > 10 || (mb_strlen($time) > 8) || (mb_strlen($phoneNum) > 22)) {
    exit();
}

require "connect-localhost.php";
// require "connect.php"

$mysql->query("INSERT INTO `userdata` (`id`, `date`, `time`, `phoneNumber`)
 VALUES(NULL, '$date', '$time', '$phoneNum')");
$mysql->close();
?>
