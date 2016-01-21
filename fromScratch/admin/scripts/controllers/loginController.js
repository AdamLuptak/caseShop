'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Login controller
 */
angular.module('sbAdminApp')
  .controller('LoginController', ['$scope','$location', function ($scope,$location) {
	
	$scope.validation = false;
	$scope.signupData = null;


	/**
	 * Function do autentification and redirect to admin page
	 * @param signup data from signup-Form
	 */
	$scope.signupForm = function(signupData){
		// if(typeof signupData !== 'undefined'){
		// 	if(signupData.password != null ){
		// 		if(loginService.validate(signupData)){
		// 			//authService.setLogState(true);
		// 			$location.path( "/dashboard/home" );
		// 		}else{
		// 			$scope.validation = true;
		// 			console.log($scope.validation );
		// 		}
		// 	}
		// }else
		// $scope.validation = true;

		$location.path( "/dashboard/home" );
	};

	$scope.getValidation= function(){
		return $scope.validation;
	}

}]);