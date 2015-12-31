'use strict';
/**
 * @ngdoc overview
 * @name caseShop
 * @description
 * # caseShop
 *
 * Directive for products
 */
app.directive('products', [function() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directive/product/productsDirective.html',
        link: function(scope, element, attrs) {
            console.log(scope.products);
        }
    };
}]);

/**
 * @ngdoc overview
 * @name caseShop
 * @description
 * # caseShop
 *
 * Directive for single product
 */
app.directive('product', ['cartService', function(cartService) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directive/product/productDirective.html',
        scope: {
            productActual: '=',
            attr4:      '=attr4' ,
        },
        link: function(scope, element, attrs) {

            /**
             * button click put thu arrat in service product obejct
             * @param product object
             */
            scope.addItem = function(product) {
                cartService.addProduct(product);
                scope.$parent.addItemDirective();
               
           }


        }
    };
}]);