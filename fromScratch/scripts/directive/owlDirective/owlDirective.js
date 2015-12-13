app.directive('owlDirective',function(){
  

   
	return{
		restrict: 'E',
		replace: true,
		templateUrl: 'scripts/directive/owlDirective/owl.html',
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
		  var owl = $("#owl-demo");
 owl.owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        margin: 20,
        items: 3,
        pagination: false,
        navigation: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        lazyLoad: true

    });

			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	}


});



