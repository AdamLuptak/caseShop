app.controller('ProductCatalogController', ['$scope', 'allProductsService', '$http', '$location', 'cartService', 'clickedModal', function($scope, allProductsService, $http, $location, cartService, clickedModal) {


    /**
     * Constant for http requests
     */
    $scope.pricee = 500;

    $scope.productOrderNumber = 0;

    $scope.showModal = false;

    $scope.totalSumCost = 0;

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
    };

    /**
     * calculate how many page I need for pagin products
     */
    $scope.pagaCalculator = function(productData) {
        var pageArray = new Array();
        var counter = 0;
        var page = 0;
        for (productIndex in productData) {
            counter++;
            if (counter >= 7) {
                pageArray.push(page++);
                counter = 0;
            }
        };
        return pageArray;
    }

    /**
     * actual page 7 item on 1 page
     */
    $scope.actualPage = function() {

    }

    /**
     * order Item from Modal and redirect to orderForm
     */
    $scope.modalRedirect = function() {
            cartService.addProduct(clickedModal.getItem());
            console.log(cartService.allProducts());
            $scope.orderedProducts = cartService.allProducts();
            $scope.productOrderNumber = $scope.orderedProducts.length;
            if ($scope.productOrderNumber > 0) {
                angular.element("#shopingCartIcon").css('color', '#23A657')
            }
            $scope.totalSumCost += parseInt(clickedModal.getItem().price);
            window.location.href = '#orderform';

        }
        /*
         * Add item to array in service
         */
    $scope.addItemDirective = function(product) {
        $scope.orderedProducts = cartService.allProducts();
        $scope.productOrderNumber = $scope.orderedProducts.length;
        if ($scope.productOrderNumber > 0) {
            angular.element("#shopingCartIcon").css('color', '#23A657')
        }
        $scope.totalSumCost += parseInt(product.price);
    }

    /*
     * Delete data from cart thrue cart service 
     * @param product
     */
    $scope.deleteDataFromCart = function(product, price) {
        cartService.deleteProduct(product);
        if ($scope.productOrderNumber > 0) {
            $scope.productOrderNumber--;
            $scope.totalSumCost -= parseInt(price.value) * parseInt(product.price);
        }
        if ($scope.productOrderNumber == 0)
            angular.element("#shopingCartIcon").css('color', '#CCC')
    }

    /*
     * Post data to orderService and send to backend
     * @param order order object with all information
     */
    $scope.postOrder = function(order) {
        //order.concat($scope.orderedProducts);
        // $scope.orderMerged = $scope.merge(order, $scope.orderedProducts);
        // POST data
        for (i in $scope.orderedProducts) {
            if ($scope.orderedProducts[i].quantity == null) {
                $scope.orderedProducts[i].quantity = 1;
            }
        }
        $scope.orderMerged = order;
        $scope.orderMerged["products"] = $scope.orderedProducts;

        // $scope.orderMerged =order.push($scope.orderedProducts);
        $scope.postHelper("http://localhost/caseShop/index.php/order", $scope.orderMerged);
    }

    /**
     * sent mail for contact
     */
    $scope.sentEmail = function(infoData) {
        $scope.postHelper("http://localhost/caseShop/index.php//contact", infoData);
    }

    /**
     * sent mail for information
     */
    $scope.sentStayInTouch = function(infoData) {
        $scope.postHelper("http://localhost/caseShop/index.php/stayInTouch", infoData);
    }

    /**
     * Sent post to url
     * @param url
     * @param data
     */
    $scope.postHelper = function(url, data) {
        $http({
            url: url,
            method: "POST",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function(data, status, headers, config) {
            if(data.search("failed") > -1){
                alert("You not fullfill the order form corectly ORDER IS NOT PROCED");
            }else{
                alert("Your order is in progress we will contact you by email thank you");
                //reinitialized the cart 
                cartService.initCart();
                $scope.orderedProducts = cartService.allProducts();
                $scope.productOrderNumber = 0;
                angular.element("#shopingCartIcon").css('color', '#FFF')
            }

        }).error(function(data, status, headers, config) {
            $scope.status = status + ' ' + headers;
        });
    }

    /*
     * Merge two JSON objects
     * @param obj1 obj2
     * @return mergeJson result
     */
    $scope.merge = function(obj1, obj2) {
        var result = {};
        for (i in obj1) {
            result[i] = obj1[i];
            if ((i in obj2) && (typeof obj1[i] === "object") && (i !== null)) {
                result[i] = merge(obj1[i], obj2[i]);
            }
        }
        for (i in obj2) {
            if (i in result) { //conflict
                continue;
            }
            result[i] = obj2[i];
        }
        return result;
    }



    $scope.products = 'sdsd';
    $scope.clickedProduct;
    var productHelpForModalOrder;
    allProductsService.success(function(data) {
        $scope.products = data;
        $scope.pages = $scope.pagaCalculator($scope.products);
        var url = data[0].ownImgurl[0].url;
        $scope.productData = data;
        // console.log(url);

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
            //console.log($("#zmaz"));
            var elem = $(this).parent(),
                title = elem.find('.project-title').text();
            price = elem.find('.project-price').text();
            //console.log(title)
            $scope.showModal = true;
            var slidesHtml = "";
            //find product in JSON
            $scope.clickedProduct = $scope.findProductInJSON(title, $scope.productData);
            productHelpForModalOrder = $scope.clickedProduct;
            clickedModal.setItem($scope.clickedProduct);
            //slidesHtml = '<div class="col-md-12 col-xs-12 col-sm-12 text-center slides-container">';
            for (var i = 0; i < $scope.clickedProduct.ownImgurl.length; ++i) {
                var u = i + 1;
                $('#img' + u).attr('src', $scope.clickedProduct.ownImgurl[i].url);
            }
            //  slidesHtml = slidesHtml + '</div><nav class="slides-navigation"><a href="#" class="next"><i class="glyphicon glyphicon-chevron-right"></i></a><a href="#" class="prev"><i class="glyphicon glyphicon-chevron-left"></i></a></nav>';
            //console.log($scope.clickedProduct);
            $('#desc-modal').text($scope.clickedProduct.description);
            $('#sdbr-title').text($scope.clickedProduct.product_name);
            $('#sdbr-price').text($scope.clickedProduct.price);
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
    $scope.orderedProducts = 0;

    $scope.orderedProducts = cartService.allProducts();
    $scope.selected = function(event, product) {
        //put to JSON extra field for quantity
        product.quantity = event.value;
        $scope.totalSumCost += parseInt(event.value) * parseInt(product.price);
        $scope.totalSumCost -= parseInt(product.price);
    };
    $scope.totalPrice = 200;

    $scope.selectedOptions = $scope.options[1];
    $scope.myNightstand = $scope.options[0];
    $scope.myHammock = $scope.options[0];
    $scope.$watch(
        "totalSumCost",
        function(newValue, oldValue) {
            oldValue = newValue;
            console.log("appController.fooCount:");
        }
    );


}]);

app.service('clickedModal', [function() {

    this.item = 0;

    this.setItem = function(item) {
        this.item = item;
    }

    this.getItem = function() {
        return this.item;
    }
}])



app.controller('orderController', ['$scope', 'cartService', function($scope, cartService) {

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
    $scope.orderedProducts = 0;
    $scope.orderedProducts = cartService.allProducts();
    $scope.$watch(
        "orderedProducts",
        function handleFooChange(newValue, oldValue) {
            console.log("appController.fooCount:", newValue);
        }
    );



    $scope.myBed = $scope.options[0];
    $scope.myNightstand = $scope.options[0];
    $scope.myHammock = $scope.options[0];
}]);