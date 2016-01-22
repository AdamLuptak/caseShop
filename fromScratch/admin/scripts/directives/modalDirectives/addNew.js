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
                categoryService.postHelper($scope.ADDNEW, newCategoryName,$scope);
                $("#loginModal").modal('hide');
                $scope.categoryName.name = "";
            };

             $scope.editCategory = function(newCategoryName) {
                $scope.editCategoryItem.newName = newCategoryName.name;
                categoryService.postHelper($scope.UPDATE,  $scope.editCategoryItem,$scope);
                $("#loginModal").modal('hide');
                $scope.categoryName.name = "";
            };

            $scope.$watch('loggingIn', function() {
                if ($scope.loggingIn) {
                    $("#loginModal").modal('show');
                }
            });




        }
    };
});