angular.module('roomfinder', [
  'ionic',
  'roomfinder.controllers',
  'roomfinder.services',
  'ngCordova',
])
.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      // StatusBar.styleDefault();
    }
    $cordovaStatusbar.styleHex("#295CB4");
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('map', {
    url: '/map/{code}',
    cache: false,
    templateUrl: 'templates/map-map.html',
  })
  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    controller: 'SearchCtrl',
  })
  .state('searchTeacher', {
    url: '/searchTeacher',
    templateUrl: 'templates/search.html',
    controller: 'TeacherCtrl',
  });


  $urlRouterProvider.otherwise('/search');

});
