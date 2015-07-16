// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var exampleApp = angular.module('starter', ['ionic'])

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
        .controller('experienceController', ['$scope', '$http', '$state', function ($scope, $http, $state) {
                $http.get('data/experience.json').success(function (data)
                {
                    $scope.experience = data;
                    $scope.whichExp = $state.params.eId;
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
                });
            }])

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
                                templateUrl: 'templates/summary.html'
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
                                templateUrl: 'templates/portfolio.html'
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
                                controller: 'EmailController'
                            }
                        }
                    })
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/menus/home');
        });

exampleApp.controller('EmailController', function ($scope) {
    $scope.sendFeedback = function () {
        if (window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                console.log("Response -> " + result);
            },
                    "Feedback for your App", // Subject
                    "", // Body
                    ["clyde1229@gmail.com"], // To
                    null, // CC
                    null, // BCC
                    false, // isHTML
                    null, // Attachments
                    null);                   // Attachment Data
        }
    }
});