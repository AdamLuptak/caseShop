app.controller('ProductCatalogController', ['$scope', 'allProductsService', '$http','$location', function($scope, allProductsService, $http,$location) {
    $scope.pricee = 500;

    $scope.showModal = false;
    $scope.toggleModal = function() {
        $scope.showModal = !$scope.showModal;
    };

    /**
     *@param title, data
     *@return object form json array products
     */
    $scope.findProductInJSON = function(title, datas) {
        for (data in datas) {
            if (datas[data].product_name === title) {
                return datas[data];
            }
        }
    }

$scope.modalRedirect = function(){
    window.location.href='#orderform';
}


    allProductsService.success(function(data) {
        // $scope.products = data;

        var url = data[0].ownImgurl[0].url;
        $scope.productData = data;
        console.log(url);

        //delete actual data from owl 
        var owl = $("#owl-demo").data('owlCarousel');
        for (var i = 0; i < 7; i++) {
            owl.removeItem();
        };
        // put new data to owl slide
        for (var i = 0; i < data.length; i++) {
            content = '<div  class="item img-box"><div   class="hover-mask2">' + '</div><img id="my_picture" style="border-radius: 5px;" src="' + data[i].ownImgurl[0].url + '" alt="Owl Image" >' + '<span class="product-icon fa fa-eye fa-5x"></span>' + '<div class="product-info col-md-12"><p class="project-price">$' + data[i].price + '</p>' + '<div><h4 class="project-title text-left">' + data[i].product_name + '</h4></div></div></div>';
            owl.addItem(content);
        };

        //setup after click show modal with product
        $(".hover-mask2").on("click", function(event) {

            console.log($("#zmaz"));
            var elem = $(this).parent(),
                title = elem.find('.project-title').text();
            price = elem.find('.project-price').text();
            console.log(title)
            $scope.showModal = true;


            



            var slidesHtml = "";




            //find product in JSON
            $scope.clickedProduct = $scope.findProductInJSON(title, $scope.productData);
            //slidesHtml = '<div class="col-md-12 col-xs-12 col-sm-12 text-center slides-container">';
            for (var i = 0; i < $scope.clickedProduct.ownImgurl.length; ++i) {
                var u = i + 1;
                $('#img' + u).attr('src', $scope.clickedProduct.ownImgurl[i].url);
            }
            //  slidesHtml = slidesHtml + '</div><nav class="slides-navigation"><a href="#" class="next"><i class="glyphicon glyphicon-chevron-right"></i></a><a href="#" class="prev"><i class="glyphicon glyphicon-chevron-left"></i></a></nav>';
            console.log($scope.clickedProduct);
            $('#desc-modal').text($scope.clickedProduct.description);
            $('#sdbr-title').text( $scope.clickedProduct.product_name);
            $('#sdbr-price').text( $scope.clickedProduct.price);






            $('#myModal').modal('show');
            $('#project-modal').on('hidden.bs.modal', function() {
                $(this).find('.loader').show();
                $(this).find('.screen').removeClass('carousel-inner').removeClass('done').html('').superslides('destroy');
            });

            $('#project-modal').on('click', '#btn-order', function() {
                $('#project-modal').modal('hide');
                $(this).find('.loader').show();
                $(this).find('.screen').removeClass('slides').removeClass('done').html('').superslides('destroy');
                var aTag = $("section[id='orderform']");
                $('html,body').animate({
                    scrollTop: aTag.offset().top
                }, 'slow');
            });



        })
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