angular.module('socialMediaTracker', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

$urlRouterProvider.otherwise('/');

$stateProvider
.state('dashView', {
  url: '/dashboard/',
  templateUrl: './dash/dashView.html'
})

.state('landingView', {
  url: '/',
  templateUrl: './landing/landingView.html'
})

})
