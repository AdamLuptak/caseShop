// connect to categoris service 
app.directive('categories', ['categorieService', function(categorieService) {
    return {
        restrict: 'E',
        templateUrl: 'scripts/directive/sideBar/sideBar.html',
        link: function(scope, element, attrs) {
            //load data to johson for directive
            categorieService.success(function(data) {
                scope.categoriesData = data;
                scope.actualCategory = 0;

            });
            //setup category which is clicked actual
            scope.clickCategory = function(category, index) {
                scope.actualCategory = index;
            }
        }
    };
}]);


app.service('categorieService', ['$http', function($http) {
    return $http.get('http://localhost/caseShop/index.php/categories')
        .success(function(data) {
            return data;
        })
        .error(function(data) {
            return data;
        });

}]);

