app.factory('allProductsService', ['$http', function($http) {
    return $http.get('http://localhost:80/caseShop/index.php/products')
        .success(function(data) {
            return data;
        })
        .error(function(data) {
            return data;
        });
}]);
