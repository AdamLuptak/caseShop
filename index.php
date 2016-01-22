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

//  $shop = R::dispense( 'shop' );
//     $shop->name = 'Antiques';
// $vase = R::dispense( 'product' );
//     $vase->price = 25;
//     $shop->xownProductList[] = $vase;
//     R::store( $shop );
//       $shop = R::load( 'shop', $id );
//     $first = reset( $shop->xownProductList  ); //gets first product
//     $last = end( $shop->xownProductList  ); //gets last product
//     foreach( $shop->xownProductList as $product ) {
//     echo $product;
//     } //iterate
// //remove all
$shop = R::load( 'shop', 2 );
 R::trash( $shop );
//     $shop->xownProductList = array();
//     R::store( $shop );
 //    // R::store( $shop );
 //     R::trash( $shop );
   //  R::store($store );


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

/**
 * get catgerorie namesfor category directive
 */
$app->get('/categories', function () use ($app) {  
  // query database for all articles
  $categories = R::find('category'); 
  // send response header for JSON content type
  $app->response()->header('Content-Type', 'application/json');
  // return JSON-encoded response body with query results
  echo json_encode(R::exportAll($categories));
});

/**
 * Update product update product
 **/
$app->post("/updateProduct", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $update = $app->request();
  $updateObject = $order->getBody();
  echo "idem " . $update;
  updateProduct($updateObject);

});


/**
 * add new category
 **/
$app->post("/addCategory", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $category = $app->request();
  $updateObject = $category->getBody();
  $jsonFromPost = json_decode($updateObject);
  echo $updateObject;
  addCategory($jsonFromPost );

});

/**
 * delete category
 **/
$app->post("/deleteCategory", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $category = $app->request();
  $updateObject = $category->getBody();
  $jsonFromPost = json_decode($updateObject);
  echo $updateObject;
  deleteCategory($jsonFromPost);
});

/**
 * update category
 **/
$app->post("/updateCategory", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $category = $app->request();
  $updateObject = $category->getBody();
  $jsonFromPost = json_decode($updateObject);
  echo "servet" .  $updateObject;
  updateCategory($jsonFromPost);
});



/**
 * Delete product update product
 **/
$app->post("/deleteProduct", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $update = $app->request();
  $updateObject = $order->getBody();
  echo "idem " . $update;
  deleteProduct($updateObject);

});

/**
 * comsume post request and check if data is valid than
 * create order and store into databasem and send email to customer
 * and to admin, 
 */
$app->post("/order", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $order = $app->request();
  $orderObject = $order->getBody();
  $jsonFromPost = json_decode($orderObject);
  if(orderValidation($jsonFromPost) != 1){
    //wrong input sent error response
    echo " failed";
  }
  else{
    echo "ok";
    //validation OK sent succes response 
    createOrder($jsonFromPost);
  }

});

/**
 * email for information for sending news
 */
$app->post("/stayInTouch", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $order = $app->request();
  $orderObject = $order->getBody();
  $jsonFromPost = json_decode($orderObject);

  $order = R::dispense('stayintouch');
  $order->email = $jsonFromPost->{'email'};
  $orderId = $id = R::store($order);


});

/**
 * contact message
 */
$app->post("/contact", function () use($app, $db) {
  $app->response()->header("Content-Type", "application/json");
  $order = $app->request();
  $orderObject = $order->getBody();
  $jsonFromPost = json_decode($orderObject);
  $order = R::dispense('contact');
  $order->email = $jsonFromPost->{'email'};
  $order->name = $jsonFromPost->{'name'};
  $order->message = $jsonFromPost->{'message'};
  $orderId = $id = R::store($order);

});


$app->run();
?>
