'use strict';
/**
 * @ngdoc overview
 * @name caseShop
 * @description
 * # caseShop
 *
 * Service for shoping cart
 */
app.service('cartService', ['$http', function($http) {
    /**
     * Json cart object Array with object products
     */
     this.cart = new Array();
     this.cartInstace = {};
    /**
     * add item to cart
     * @param item 
     */
     this.addProduct = function(product){

     	this.cart.push(product);

     }

    /**
     * Delete item  from cart
     * @param item 
     */
     this.deleteProduct = function(product){
     	 productName = proct.product_name; 
     	 this.cart.splice(this.cart.indexOf(product),1);
     }

     /**
     * Initialized cart
     */
     this.initCart = function(){
     	this.cart = new Array();
     }

     /**
      * Give all items from cart
      */
     this.allProducts = function(){
      	return this.cart;
      }


}]);