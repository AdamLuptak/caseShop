<?php
require 'Slim/Slim.php';
require 'rb.php';
require 'objects/product.php';
require 'functions.php';

\Slim\Slim::registerAutoloader();

//connect to DB 
R::setup('mysql:host=localhost;dbname=caseShop',
    'root','admin');
//first must Connect to DB create data
//require 'insertProducts.php';

// initialize app
$app = new \Slim\Slim();

/**
 * get all item products
 */
$app->get('/products', function () use ($app) {  
  // query database for all articles
  $products = R::find('products'); 
  // send response header for JSON content type
  $app->response()->header('Content-Type', 'application/json');
  // return JSON-encoded response body with query results
  echo json_encode(R::exportAll($products));
});

/**
 * get item from database by name
 * @param  $name  product name*
 */
$app->get('/products/:name', function ($name) use ($app) {  
  // query database for all articles
    if($name != null){
      $product = R::find( 'products', ' product_name LIKE ? ', [ $name ] );
      if($product !=null){
  // send response header for JSON content type
          $app->response()->header('Content-Type', 'application/json');
  // return JSON-encoded response body with query results
          echo json_encode(R::exportAll($product));
      }else{
        $app->response()->status(404);
    }
}else{
}
});
//updateProduct

//insertProduct

//deleteProduct

// run
$app->run();



//     $images = R::find('images'); 
// $village = R::load('products',1);
//     list($mill,$tavern) = R::dispense('img',2);
//     $mill->url="img/011.jpg";
//     $tavern->url="img/012.jpg";
//     //replaces entire list
//     $village->ownBuilding = array($mill,$tavern);

//   //  R::store($village);    
//    $bottles = R::find( 'products' );

//   if ( !count( $bottles ) ) die( "The cellar is empty!\n" );
//   foreach( $bottles as $b ) {
//      $jset = json_decode($b, true);
//      echo $jset["ProductName"] . "\n";
//     //echo $b. "Product1\n";
//   }


?>
