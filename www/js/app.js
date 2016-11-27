angular.module('roomfinder', [
  'ionic',
  'roomfinder.controllers',
  'roomfinder.services',
])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('roomfinder', {
    url: '/roomfinder',
    abstract:true,
    templateUrl:'templates/map.html'
  })

  .state('roomfinder.map', {
    url: '/map/{code}',
    cache: false,
    views: {
      'content': {
        templateUrl: 'templates/map-map.html',
      }
    }
  })
  .state('roomfinder.search', {
    url: '/search',
    views: {
      'content': {
        templateUrl: 'templates/search.html',
      }
    }
  });


  $urlRouterProvider.otherwise('/roomfinder/search');

});
