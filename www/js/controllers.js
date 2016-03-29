angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $timeout, $http) {
  $scope.push = function(){

  // Define relevant info
    var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4OTlkNzVkMy01NzYyLTRkMzctYjYxYS01OGQ4Y2Q1NzE1NjUifQ.Udphee19hoB2vabh0ztxwyXoc1N7Gf_gVhAF9cSmZQ4';
    var tokens = [$rootScope.token]
    var profile = 'productionprofile';

    // Build the request object
    var req = {
      method: 'POST',
      url: 'https://api.ionic.io/push/notifications',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
      data: {
        "tokens": tokens,
        "profile": profile,
        "notification": {
          "title": "Hi",
          "message": "Hello world!",
          "android": {
            "title": "Hey",
            "message": "Hello Android!"
          },
          "ios": {
            "title": "Howdy",
            "message": "Hello iOS!"
          }
        }
      }
    };

    $timeout(function(){
      // Make the API call
      $http(req).success(function(resp){
        // Handle success
        console.log("Ionic Push: Push success", resp);
      }).error(function(error){
        // Handle error 
        console.log("Ionic Push: Push error", error);
      });

    },5000)

  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
