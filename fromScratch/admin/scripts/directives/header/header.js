'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
var savedText = new Array();
var menuFlag = false;

angular.module('sbAdminApp')
    .directive('header', function() {
        return {
            templateUrl: 'scripts/directives/header/header.html',
            restrict: 'E',
            replace: true,
            link: function(scope, elem, attr) {



                $("#button-menu").on('click', function() {
                    // change the side of side bar
                    var wraper = $('#page-wrapper');

                          
                    console.log("ma ist")
                    if (wraper.css('margin-left') === '220px') {
                        $('#page-wrapper').css('margin-left', '50px');
                        $('.sidebar').css('width', '50px');
                        $('#button-menu i').replaceWith('<i class="fa fa-indent fa-lg"></i>');

                        $('.sidebar-search').toggle();
                        $('#side-menu').find('.level-1').each(function(e) {
                            savedText.push($(this).text());
                            var cache = $(this).children();
                            console.log($(this).text());
                            
                            var cache = $(this).children();
                            $(this).text('').append(cache);
                            $(this).find('span').toggle();
                            if(!menuFlag){
                             menuFlag = true;
                            $(this).on('click', function() {
                               
                             
                                if (!(wraper.css('margin-left') === '220px')) {
                                    $('#page-wrapper').css('margin-left', '220px');
                                    $('.sidebar').css('width', '220px');
                                    $('#button-menu i').replaceWith('<i class="fa fa-dedent fa-lg"></i>');
                                    $('#side-menu').find('.level-1').each(function(e) {
                                        var cache = $(this).children();
                                        $(this).find('i').after(" " + savedText[e]);
                                        $(this).find('span').toggle();

                                    });
                                    savedText = new Array();
                                }
                            
                            })
                            }



                        });




                    } else {
                        $('.sidebar-search').toggle();
                        $('#page-wrapper').css('margin-left', '220px');
                        $('.sidebar').css('width', '220px');
                        $('#button-menu i').replaceWith('<i class="fa fa-dedent fa-lg"></i>');
                        $('#side-menu').find('.level-1').each(function(e) {
                            var cache = $(this).children();
                            $(this).find('i').after(" " + savedText[e]);
                            $(this).find('span').toggle();

                        });

                    }

                })


            }
        }

    });