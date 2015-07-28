// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            })

        })
        .controller('experienceController', function ($scope, $http, $state, $cordovaInAppBrowser) {
//            $http.get('data/experience.json').success(function (data)
            $http.get('http://shenlongzhen.com/dataJSON/experience.json').success(function (data)
            {
                $scope.experience = data;
                $scope.whichExp = $state.params.eId;
            });
            $scope.toggleGroup = function (list) {
                if ($scope.isGroupShown(list)) {
                    $scope.shownGroup = null;
                } else {
                    $scope.shownGroup = list;
                }
            };
            $scope.isGroupShown = function (list) {
                return $scope.shownGroup === list;
            };
            $scope.openLinkSys = function (url) {
                var options = {
                    location: 'yes',
                    closebuttoncaption: 'Return',
                    toolbar: 'yes'
                };
                $cordovaInAppBrowser.open(url, '_system', options)
                return false;
            }

        })
        .controller('aboutController', function ($scope, $cordovaAppVersion) {
            $scope.deviceInformation = ionic.Platform.device();
            $scope.isWebView = ionic.Platform.isWebView();
            $scope.isIPad = ionic.Platform.isIPad();
            $scope.isIOS = ionic.Platform.isIOS();
            $scope.isAndroid = ionic.Platform.isAndroid();
            $scope.isWindowsPhone = ionic.Platform.isWindowsPhone();
            $scope.currentPlatform = ionic.Platform.platform();
            $scope.currentPlatformVersion = ionic.Platform.version();

            document.addEventListener("deviceready", function () {
                $cordovaAppVersion.getAppVersion().then(function (version) {
                    $scope.appVersion = version;
                });
            }, false);
        })

        .controller('summaryController', function ($scope, $cordovaInAppBrowser) {

            $scope.openLinkSys = function (url) {
                var options = {
                    location: 'yes',
                    closebuttoncaption: 'Return',
                    toolbar: 'yes'
                };
                $cordovaInAppBrowser.open(url, '_system', options)
                return false;
            }

        })
        .controller('portfolioController', function ($scope, $http, $state, $cordovaInAppBrowser) {
            $http.get('data/portfolio.json').success(function (data) {
                $scope.portfolio = data;
            })
//                $scope.slideChanged = function (index) {
//                    console.log('Slide changed', index);
//                };
//                $scope.openLinkSys = function (url) {
//                    var options = {
//                        location: 'yes',
//                        closebuttoncaption: 'Return',
//                        toolbar: 'yes'
//                    };
//                    $cordovaInAppBrowser.open(url, '_system', options)
//                    return false;
//                }

        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('menus', {
                        url: '/menus',
                        abstract: true,
                        templateUrl: 'templates/sidemenu.html'
                    })

                    .state('menus.home', {
                        url: "/home",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/home.html'
                            }
                        }
                    })
                    .state('menus.summary', {
                        url: "/summary",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/summary.html',
                                controller: 'summaryController'
                            }
                        }
                    })
                    .state('menus.experience', {
                        url: "/experience",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/experience.html',
                                controller: 'experienceController'
                            }
                        }
                    })
                    .state('menus.expDetail', {
                        url: "/expDetail/:eId",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/expDetail.html',
                                controller: 'experienceController'
                            }
                        }
                    })
                    .state('menus.portfolio', {
                        url: "/portfolio",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/portfolio.html',
                                controller: 'portfolioController'
                            }
                        }
                    })
                    .state('menus.education', {
                        url: "/education",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/education.html'
                            }
                        }
                    })
                    .state('menus.reference', {
                        url: "/reference",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/reference.html'
                            }
                        }
                    })
                    .state('menus.social', {
                        url: "/social",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/social.html'
                            }
                        }
                    })
                    .state('menus.about', {
                        url: "/about",
                        views: {
                            'cvContent': {
                                templateUrl: 'templates/about.html',
                                controller: 'aboutController'
                            }
                        }
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/menus/home');
        });
