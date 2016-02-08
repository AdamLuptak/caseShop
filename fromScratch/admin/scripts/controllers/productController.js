angular.module('sbAdminApp').controller('ProductController', ['$scope', 'productsService', '$http', function($scope, productsService, $http) {

    $scope.label = "Add new product";
    $scope.name = "product";
    $scope.editCategoryItem = {};
    $scope.loggingIn = false;
    $scope.editShow = false;
    $scope.addNewShow = false;
    $scope.mainLabel = "Products";
    $scope.plusItem = "+ Product";
    $scope.minusItem = "- Delete";
    $scope.labelForTable= "Product Name";
    $scope.UPDATE = "http://localhost/caseShop/index.php/updateCategory";
    $scope.DELETE = "http://localhost/caseShop/index.php/deleteCategory";
    $scope.ADDNEW = "http://localhost/caseShop/index.php/addCategory";
    $scope.GETPRODUCTS = "http://localhost/caseShop/index.php/products";
    $scope.limit = 10;

    // /**
    //  * Delete selected items from DB!
    //  * @param boolean master if true push to array or splice
    //  * @param String category naem of seletec category
    //  */
    // $scope.checkBoxHandle = function(master, category) {

    // };

    // /**
    //  * Function take handle for all item view take parater all or first 10 category can show
    //  * @param Boolean all
    //  */
    // $scope.limit = 10;
    // $scope.allCategory = function(all) {
    //     $scope.all.view = all;
    //     $scope.limit = (all) ? $scope.categoriesData.length : 10;
    // };

    /**
     * Load data from product service
     */
     productsService.async().then(function(d) {
        var data = d;
        $scope.productsData = data;
        data.forEach(function(element, index) {
            element.check = false;
        });
        console.log(data)
    });

    // /**
    //  * select all caegories for deleting
    //  */
    // $scope.checkAllContact = function() {
    //     if ($scope.checkAllContact1) {
    //         $scope.checkAllContact1 = true;
    //     } else {
    //         $scope.checkAllContact1 = false;
    //     }
    //     angular.forEach($scope.categoriesData, function(item) {
    //         item.check = $scope.checkAllContact1;
    //     });
    // };

    // /**
    //  * Add new category do DB
    //  */
    // $scope.addNewCategory = function() {
    //     $scope.categoryName.name = "";
    //     $scope.name = "Add category";
    //     $scope.label = "Add new Category";
    //     $scope.addNewShow = true;
    //     $scope.editShow = false;
    //     $scope.loggingIn = true;
    //     $("#loginModal").modal('show');
    // };

    // /**
    //  * Delte selected categories do DB
    //  */
    // $scope.deleteCategories = function() {
    //     deleteItems = [];
    //     $scope.categoriesData.forEach(function(element, index) {

    //         if (element.check) {

    //             deleteItems.push(element);
    //             element.check = false;
    //         }
    //     });
    //     $scope.checkAllContact1 = false;
    //     categoryService.postHelper($scope.DELETE, deleteItems, $scope);

    // };

    // /**
    //  * Edit category
    //  */
    // $scope.edit = function(category) {
    //     $scope.editCategoryItem.oldId = category.id;
    //     $scope.label = "Edit Category";
    //     $scope.name = "Edit category";
    //     $scope.addNewShow = false;
    //     $scope.editShow = true;
    //     $scope.loggingIn = true;
    //     $("#loginModal").modal('show');
    // };
}]);


angular
.module('sbAdminApp').factory('productsService', ['$http', function($http) {
    var myService = {
        async: function() {
                // $http returns a promise, which has a then function, which also returns a promise
                var promise = $http.get("http://localhost/caseShop/index.php/products").then(function(response) {
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