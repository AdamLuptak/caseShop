angular.module('sbAdminApp').directive('igLogin', function(categoryService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'scripts/directives/modalDirectives/addNew.html',
        controller: function($scope) {

            $scope.categoryName = "";

            $scope.submit = function() {
                $scope.login();
                $("#loginModal").modal('hide');
            };

            $scope.cancel = function() {
                $scope.loggingIn = false;
                $("#loginModal").modal('hide');
            };

            $scope.addNewCategoryName = function(newCategoryName) {
                console.log(newCategoryName);
                categoryService.postHelper('http://localhost/caseShop/index.php/addCategory', newCategoryName,$scope);
                $("#loginModal").modal('hide');
            };

            $scope.$watch('loggingIn', function() {
                if ($scope.loggingIn) {
                    $("#loginModal").modal('show');
                }
            });




        }
    };
});