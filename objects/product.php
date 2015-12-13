<?php
class Product{
	var $productName;
	var $description;
	var $price;
	var $images = array();

	function __construct($productName,$description, $price, $imgaes){
		$this->productName = $productName;
		$this->description = $description;
		$this->price = $price;
		$this->images =$images;
	}

	function setProductName($productName){
		$this->productName = $productName;
	}

	function getProductName(){
		echo $this->productName."<br/>";
	}
}
?>