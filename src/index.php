<?php
$server = "localhost";
$username = "root";
$password = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);  
    echo "</pre>";
}
$con = mysqli_connect($server, $username, $password);

if (!$con) {
    die("Connection to this database failed: " . mysqli_connect_error());
}

$name = $_POST['name'];
$gender = $_POST['gender'];
$age = $_POST['age'];
$desk = $_POST['desk'];
$phone = $_POST['phone'];  
$email = $_POST['email'];

$sql = "INSERT INTO `trip.trip` (`name`, `gender`, `age`, `other`, `phone`, `email`, `dt`) 
        VALUES ('$name', '$gender', '$age', '$desk', '$phone', '$email', current_timestamp())";

if ($con->query($sql) === true) {
    echo "Successfully sent";
} else {
    echo "Error: $sql <br> $con->error";
}

// Close the connection
$con->close();
?>
