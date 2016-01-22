angular
    .module('sbAdminApp').factory('categoryService', ['$http', function($http) {
        var myService = {
            async: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get('http://localhost/caseShop/index.php/categories').then(function(response) {
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            },
            postHelper: function(url, data, $scope) {
                $http({
                    url: url,
                    method: "POST",
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    myService.async().then(function(d) {
                        var data = d;
                        $scope.categoriesData = data;
                        data.forEach(function(element, index) {
                            element.check = false;
                        });
                    });
                }).error(function(data, status, headers, config) {
                    $scope.status = status + ' ' + headers;
                });
            }
        };
        return myService;

    }]);