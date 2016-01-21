angular.module('sbAdminApp').controller('CategoriesController', ['$scope', 'categoryService', '$http', function($scope, categoryService, $http) {

    $scope.label = "Add new Category";
    $scope.name = "category";

    /**
     * Delete selected items from DB!
     * @param boolean master if true push to array or splice
     * @param String category naem of seletec category
     */
    $scope.checkBoxHandle = function(master, category) {
        console.log(master);
    };

    /**
     * Function take handle for all item view take parater all or first 10 category can show
     * @param Boolean all
     */
    $scope.limit = 10;
    $scope.allCategory = function(all) {
        $scope.all.view = all;
        $scope.limit = (all) ? $scope.categoriesData.length : 10;
    };

    /**
     * Load data from category service
     */
    categoryService.async().then(function(d) {
        var data = d;
        $scope.categoriesData = data;
        data.forEach(function(element, index) {
            element.check = false;
        });

        console.log(data);
    });

    /**
     * select all caegories for deleting
     */
    $scope.checkAllContact = function() {
        if ($scope.checkAllContact1) {
            $scope.checkAllContact1 = true;
        } else {
            $scope.checkAllContact1 = false;
        }
        angular.forEach($scope.categoriesData, function(item) {
            item.check = $scope.checkAllContact1;
        });
    };

    $scope.addNewCategory = function() {
        $scope.loggingIn = true;
        $("#loginModal").modal('show');
    };

    $scope.deleteCategories = function() {
        deleteItems = [];
       $scope.categoriesData.forEach(function(element, index) {
           
           if(element.check){
        
           deleteItems.push(element);
           }
        });
                 console.log(deleteItems);
       categoryService.postHelper('http://localhost/caseShop/index.php/deleteCategory', deleteItems,$scope);
   
    };
    $scope.edit = function(category) {

    };

    $scope.loggingIn = false;

}]);