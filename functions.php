<?php 
function createNewProduct($productName, $description, $price, $links){

	$product1 = R::dispense( 'products' );
	$product1->productName = $productName;
	$product1->description = $description;
	$product1->price= 200;

	list($url1,$url2,$url3,$url4,$url5) = R::dispense('imgurl',5);
	$url1->url=$links[0];
	$url2->url=$links[1];
	$url3->url=$links[2];
	$url4->url=$links[3];
	$url5->url=$links[4];
	$product1->ownImage = array($url1,$url2,$url3,$url4,$url5);
	$id = R::store( $product1 );
}

function deleteAllFromTable($tableName){
	R::trashAll( $tableName );
}

?>