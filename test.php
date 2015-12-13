<?php
require 'Slim/Slim.php';
require 'rb.php';
try{
  R::setup('mysql:host=localhost;dbname=caseShop',
        'root','admin');
 
}
catch(Exception $e){
 echo 'Caught exception: ',  $e->getMessage(), "\n";
}

  // $user = R::dispense('user');
  // $book->title = 'Gifted Programmers';
  // $book->author = 'Charles Xavier';
   
  // $id = R::store($book);
$pages = R::load('products',1);
echo $pages;

// $servername = "localhost";
// $username = "root";
// $password = "admin";
// $dbname = "caseShop";

// // Create connection
// $conn = mysqli_connect($servername, $username, $password, $dbname);
// // Check connection
// if (!$conn) {
//     die("Connection failed: " . mysqli_connect_error());
// }

// $sql = "SELECT * FROM products";
// $result = mysqli_query($conn, $sql);

// if (mysqli_num_rows($result) > 0) {
   
//     while($row = mysqli_fetch_assoc($result)) {
//         echo "id: " . $row["id"]. " - Name: " . $row["ProductName"]. " " . $row["Description"]. " " .$row["Price"] ."". "<br>";
//     }
// } else {
//     echo "0 results";
// }

// mysqli_close($conn);




\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->get('/hello/:name', function ($name) {
    echo "Hello, " . $name ;
});

$app->run();





?>

