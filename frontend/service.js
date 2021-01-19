angular.module('demo', [])
    .controller('Hello', function($scope, $http) {
        $http.get('http://localhost:8080/tutorials').
        then(function(response) {
            $scope.tut = response.data;
            console.log(response);
            console.log("tutsa", $scope.tut);
        });
    });