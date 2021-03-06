'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
    .module('sbAdminApp', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngCookies'

    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $urlRouterProvider.otherwise('/dashboard/home');

        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/main.html',
                resolve: {
                    loadMyDirectives: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: [
                                    'scripts/directives/header/header.js',
                                    'scripts/directives/header/header-notification/header-notification.js',
                                    'scripts/directives/sidebar/sidebar.js',
                                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                                ]
                            }),
                            $ocLazyLoad.load({
                                name: 'toggle-switch',
                                files: ["../bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "../bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                            $ocLazyLoad.load({
                                name: 'ngAnimate',
                                files: ['../bower_components/angular-animate/angular-animate.js']
                            })

                        $ocLazyLoad.load({
                            name: 'ngResource',
                            files: ['../bower_components/angular-resource/angular-resource.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngSanitize',
                            files: ['../bower_components/angular-sanitize/angular-sanitize.js']
                        })
                        $ocLazyLoad.load({
                            name: 'ngTouch',
                            files: ['../bower_components/angular-touch/angular-touch.js']
                        })
                    }
                }
            })
            .state('dashboard.home', {
                url: '/home',
                controller: 'MainCtrl',
                templateUrl: 'views/dashboard/home.html',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/main.js',
                                'scripts/directives/timeline/timeline.js',
                                'scripts/directives/notifications/notifications.js',
                                'scripts/directives/chat/chat.js',
                                'scripts/directives/dashboard/stats/stats.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.form', {
                templateUrl: 'views/form.html',
                url: '/form'
            })
            .state('dashboard.blank', {
                templateUrl: 'views/pages/blank.html',
                url: '/blank'
            })
            .state('login', {
                templateUrl: 'views/pages/login.html',
                url: '/login',
                controller: 'LoginController',
                resolve: {
                    loadMyFiles: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/loginController.js'
                            ]
                        })
                    }
                }
            })
            .state('dashboard.chart', {
                templateUrl: 'views/chart.html',
                url: '/chart',
                controller: 'ChartCtrl',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                                name: 'chart.js',
                                files: [
                                    '../bower_components/angular-chart.js/dist/angular-chart.min.js',
                                    '../bower_components/angular-chart.js/dist/angular-chart.css'
                                ]
                            }),
                            $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/chartContoller.js']
                            })
                    }
                }
            })
            .state('dashboard.table', {
                templateUrl: 'views/table.html',
                url: '/table'
            })
            .state('dashboard.categories', {
                templateUrl: 'views/ui-elements/categories.html',
                url: '/categories',
                controller: 'CategoriesController',
                resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/categoriesController.js',
                                'scripts/service/categorieService.js',
                                'scripts/directives/modalDirectives/addNew.js']
                            });
                    }
                }
            })
            .state('dashboard.products', {
                templateUrl: 'views/ui-elements/products.html',
                url: '/products',
                controller: 'ProductController',
                 resolve: {
                    loadMyFile: function($ocLazyLoad) {
                        return $ocLazyLoad.load({
                                name: 'sbAdminApp',
                                files: ['scripts/controllers/productController.js',
                                'scripts/service/categorieService.js',
                                'scripts/directives/modalDirectives/addNew.js']
                            });
                    }
                }
            })
            .state('dashboard.notifications', {
                templateUrl: 'views/ui-elements/notifications.html',
                url: '/notifications'
            })
            .state('dashboard.typography', {
                templateUrl: 'views/ui-elements/typography.html',
                url: '/typography'
            })
            .state('dashboard.total', {
                templateUrl: 'views/ui-elements/total_orders.html',
                url: '/total'
            })
            .state('dashboard.new', {
                templateUrl: 'views/ui-elements/new_orders.html',
                url: '/new'
            })
            .state('dashboard.progress', {
                templateUrl: 'views/ui-elements/in_progress.html',
                url: '/progress'
            })
            .state('dashboard.finished', {
                templateUrl: 'views/ui-elements/finished.html',
                url: '/finished'
            })



        .state('dashboard.icons', {
                templateUrl: 'views/ui-elements/icons.html',
                url: '/icons'
            })
            .state('dashboard.grid', {
                templateUrl: 'views/ui-elements/grid.html',
                url: '/grid'
            })
    }]);


angular.module('sbAdminApp').controller('SideBarController', ['$scope', '$cookieStore', function($scope, $cookieStore) {

    $scope.toggle = true;

    $scope.toggleMenu = function() {
        // if($scope.toggle){
        //  angular.element("#page-wrapper").css("margin-left","50px");
        //  $scope.toggle =false;
        // }else{
        //  angular.element("#page-wrapper").css("margin-left","220px");
        //  $scope.toggle= true;
        // }
        // console.log("");
    };

    console.log($('#button-menu'))
        // angular.element("#button-menu").click(function() {
        //   console.log("sdffffffffffffff")
        // });


}])