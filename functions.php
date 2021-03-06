<?php 
function createNewProduct($productName, $description, $price, $links){

	$product1 = R::dispense( 'products' );
	$product1->productName = $productName;
	$product1->description = $description;
	$product1->price= 200;

    // create one to many relation
	list($url1,$url2,$url3,$url4,$url5) = R::dispense('imgurl',5);
	$url1->url=$links[0];
	$url2->url=$links[1];
	$url3->url=$links[2];
	$url4->url=$links[3];
	$url5->url=$links[4];
	$product1->ownImage = array($url1,$url2,$url3,$url4,$url5);
	//store to DB
	$id = R::store( $product1 );
}

/**
 * create order with user data, unique order number
 * @param $jsonFromPost
 */
function createOrder($jsonFromPost){

	$order = R::dispense('orders');
	$order->email = $jsonFromPost->{'email'};
	$order->firstName = $jsonFromPost->{'firstName'};
	$order->lastName = $jsonFromPost->{'lastName'};
	$order->streetAddress =  $jsonFromPost->{'adress'};
	$order->city =  $jsonFromPost->{'city'};
	$order->country =  $jsonFromPost->{'country'};
	$order->postCode =  $jsonFromPost->{'postCode'};
	$orderId = $id = R::store($order);


	$maxId = R::getRow('select MAX(id) from products');
	$orders = $jsonFromPost->{'products'};
	echo "idem je: " . $orders[0]->{'id'};
	//var_dump($orders);
    //one to many relation ship
	if(isThereProduct($orders,$maxId["MAX(id)"])){
		for ($i=0; $i < sizeof($orders) ; $i++){
			$ordersProduct = R::dispense('orderproducts');
			$ordersProduct->productNumber = $orders[$i]->{'id'};
			$ordersProduct->orderNumber = $orderId;
			$id = R::store($ordersProduct);
		}  
		echo "OK";
	};
}

function deleteAllFromTable($tableName){
	R::trashAll( $tableName );
}

/**
 * function chceck if there is product with not bigger id number  
 * @param array for checking and value for check
 * @return Boolean
 */
function isThereProduct($array,$valueCheck){
	//echo "\n sdfs" . $array[0];
	for ($i=0; $i < sizeof($array) ; $i++) { 
		if(($array[$i]->{'id'}) > $valueCheck){
			return false;
		}
	}

	return true;
}

/**
 * processes POST request if valid tha true
 *@param $Json data from post request
 *@return Boolean validation
 */
function orderValidation($jsonFromPost){
	//protect from NULL
	try{
		$email = $jsonFromPost->{'email'};
		$firstName = $jsonFromPost->{'firstName'};
		$lastName = $jsonFromPost->{'lastName'};
		$streetAddress =  $jsonFromPost->{'adress'};
		$city =  $jsonFromPost->{'city'};
		$country =  $jsonFromPost->{'country'};
		$postCode =  $jsonFromPost->{'postCode'};
		$orders = $jsonFromPost->{'products'};
	}catch(Exception $e) {
		echo 'Message: ' .$e->getMessage();
		return false;
	}
	//email ^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$ a plus menej ako 50 znakov
	if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email ) > 50) {
		return false; 
	}

	// //firstName only charcaters first uppercase, len < 15
	if (!preg_match("/(^[A-Z]{1})([a-z]{1,15})/",$firstName) || strlen($firstName ) > 15) {
		return false;
	}
	// //lastName only charcaters first uppercase, len < 15
	if (!preg_match("/(^[A-Z]{1})([a-z]{1,15})/",$lastName) || strlen($lastName) > 15) {
		return false; 
	}
	// //streetAdress only charcaters first uppercase and number, len < 50
	if (!preg_match("/(^[A-Z]{1})([a-z]{1,50})/",$streetAddress) || strlen($streetAddress) > 15) {
		return false; 
	}
	//city only characters first uppercase , len < 20
	if (!preg_match("/(^[A-Z]{1})([a-z]{1,20})/",$city) || strlen($city) > 15) {
		return false; 
	}
	//country only characters first uppercase , len < 20
	if (!preg_match("/(^[A-Z]{1})([a-z]{1,20})/",$country) || strlen($country) > 20) {
		return false; 
	}
	//postcode only numbers  len < 9
	if (!preg_match("/^\d{1,9}/",$postCode) || strlen($postCode) > 9) {
		return false; 
	}
	//max product count 20, only numbers
	if(sizeof($orders) > 20){
		return false;       
	}else{
		for ($x = 0; $x < sizeof($orders); $x++) {
			// if (!preg_match("/[0-9]{1,10}/", $orders[$x])) {
			// 	return false; 
			// }
		}
	}
    //if everything is correct return true
	return true; 
}

/**
 * Insert new category
 * @param newCategoryName
 */
function addCategory($newCategory){
	$category = R::dispense("category");
	$category->category = $newCategory->{'name'};
	$id = R::store($category);
}

/**
 * Delte category
 * @param deleteCategory
 */
function deleteCategory($DeleteCategory){
	for ($i=0; $i <sizeof($DeleteCategory); $i++) { 
		
		$category = R::load( 'category', $DeleteCategory[$i]->{'id'} );
        if($category->id == $DeleteCategory[$i]->{'id'} ){
        	echo "fas rovnake su";
        	  R::trash( $category );
        }

	}
   
}

/**
 * update name of category find by ID
 * @param obejct with old name and category id which you wanna update
 */
function  updateCategory($ItemForUpdate){
    $ItemForUpdate->{"oldId"};
    //fin in database category with Id
    $category = R::load( 'category', $ItemForUpdate->{"oldId"} );
    $category->category =  $ItemForUpdate->{"newName"};
    $id = R::store($category);
}

/**
 * Insert new Product
 * @param newProduct
 */
function addProduct($newProduct){
	echo "addCategory";
	/* prodcutName, description, price, category*/
}

/**
 * Delte category
 * @param deleteProduct
 */
function deleteProduct($DeleteProduct){
	echo "delete product";
   
}

/**
 * update product
 * @param obejct for update
 */
function  updateProduct($ItemForUpdate){
   echo "update Product";
}



?>