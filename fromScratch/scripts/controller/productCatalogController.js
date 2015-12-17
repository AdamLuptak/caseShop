app.controller('ProductCatalogController', ['$scope', 'allProductsService', '$http', function($scope, allProductsService, $http) {

    

    allProductsService.success(function(data) {
        // $scope.products = data;

        var url = data[0].ownImgurl[0].url;
        console.log(url);
        var owl = $("#owl-demo").data('owlCarousel');
        for (var i = 0; i < 7; i++) {
            owl.removeItem();
        };
        // var content = "<div class=\"item dodgerBlue\"><h1>"+i+"</h1></div>";
        for (var i = 0; i < data.length; i++) {
            content = '<div class="item img-box"><div class="hover-mask2">' + '</div><img id="my_picture" style="border-radius: 5px;" src="' + data[i].ownImgurl[0].url + '" alt="Owl Image">' + '<span class="product-icon fa fa-eye fa-5x"></span>' + '<div class="product-info col-md-12"><p class="project-price">$' + data[i].price + '</p>' + '<div><h4 class="project-title text-left">' + data[i].product_name + '</h4></div></div></div>';
            owl.addItem(content);
        };
        console.log($scope.products)
        $(".hover-mask2").on("click", function(event){ 
            var elem = $(this).parent(),
            title = elem.find('.project-title').text()

            console.log(title) })
    });

}]);



app.controller('orderController', ['$scope', function($scope) {

    $scope.options = [{
        label: '0',
        value: 0
    }, {
        label: '1',
        value: 1
    }, {
        label: '2',
        value: 2
    }, {
        label: '3',
        value: 3
    }, {
        label: '4',
        value: 4
    }, {
        label: '5',
        value: 5
    }];

    $scope.myBed = $scope.options[0];
    $scope.myNightstand = $scope.options[0];
    $scope.myHammock = $scope.options[0];
}]);