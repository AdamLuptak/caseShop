angular.module('sbAdminApp').controller('CategoriesController', ['$scope', 'categoryService', '$http', function($scope, categoryService, $http) {

    $scope.label = "Add new Category";
    $scope.name = "category";
    $scope.editCategoryItem = {};
    $scope.loggingIn = false;
    $scope.editShow = false;
    $scope.addNewShow = false;
    $scope.mainLabel = "Categories";
    $scope.plusItem = "+ Categorie";
    $scope.minusItem = "- Delete";
    $scope.labelForTable= "Category Name";
    $scope.UPDATE = "http://localhost/caseShop/index.php/updateCategory";
    $scope.DELETE = "http://localhost/caseShop/index.php/deleteCategory";
    $scope.ADDNEW = "http://localhost/caseShop/index.php/addCategory";


    /**
     * Delete selected items from DB!
     * @param boolean master if true push to array or splice
     * @param String category naem of seletec category
     */
    $scope.checkBoxHandle = function(master, category) {

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

    /**
     * Add new category do DB
     */
    $scope.addNewCategory = function() {
        $scope.categoryName.name = "";
        $scope.name = "Add category";
        $scope.label = "Add new Category";
        $scope.addNewShow = true;
        $scope.editShow = false;
        $scope.loggingIn = true;
        $("#loginModal").modal('show');
    };

    /**
     * Delte selected categories do DB
     */
    $scope.deleteCategories = function() {
        deleteItems = [];
        $scope.categoriesData.forEach(function(element, index) {

            if (element.check) {

                deleteItems.push(element);
                element.check = false;
            }
        });
        $scope.checkAllContact1 = false;
        categoryService.postHelper($scope.DELETE, deleteItems, $scope);

    };

    /**
     * Edit category
     */
    $scope.edit = function(category) {
        $scope.editCategoryItem.oldId = category.id;
        $scope.label = "Edit Category";
        $scope.name = "Edit category";
        $scope.addNewShow = false;
        $scope.editShow = true;
        $scope.loggingIn = true;
        $("#loginModal").modal('show');
    };
}]);