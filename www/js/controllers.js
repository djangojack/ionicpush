angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.register = function(){

    console.log(1);
    // only work on mobile devices
    if (!ionic.Platform.isWebView()) return;

    var push = new Ionic.Push({
      "debug": false,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log("NOTIFICATION!!!", notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      },

      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
         },
         "android": {
           // "icon": "notification", // this comes from the android/res/drawable folder
           "iconColor": "#1A96A9"
         }
      } 

    });

    push.register(function(token) {
      push.saveToken(token, { 'ignore_user': true });
    });

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
