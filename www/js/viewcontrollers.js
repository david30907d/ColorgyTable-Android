angular.module('colorgytable.controllers', ['ngOpenFB'])

.controller('MenuCtrl', function($scope, $ionicModal, ngFB) {

  // detect if user is logged in.
  if (!window.localStorage['isLogin']) {
    console.log("user login state: not yet logged in.");
    $ionicModal.fromTemplateUrl('views/login.html', {
      scope: $scope,
      backdropClickToClose: false
    }).then(function(modal) {
      $scope.modal = modal;
      // if modal is ready to show, show it.
      $scope.modal.show();
    });
  } else {
    console.log("user login state: user logged in.");
  }

  ngFB.revokePermissions();

  // this region is login logic....
  $scope.logindata = {};
  $scope.closeButton = function() {
    console.log("close button clicked..");
    $scope.modal.hide();
  };

  $scope.doLogin = function() {
    console.log('do login');
    console.log('u: ' + $scope.logindata.username + ', p: ' + $scope.logindata.password);
  };

  // fb region
  $scope.fbLogin = function() {
    ngFB.login({scope: 'email'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
  };

})