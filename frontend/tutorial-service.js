'use strict';
angular.module('prohanceApp').service('doctorService', ['$http', 'ENV', '$localStorage', function($http, ENV, $localStorage) {
    var s = {};
    const url = "http://localhost:8080/tutorials";
    s.baseUrl = url;
    s.postHttp = function(url, params, successCb, failureCb) {
        params.api_key = ENV.API_KEY;
        $http.post(s.baseUrl + url, params, { ignoreLoadingBar: true }).then(function(result) {
            successCb(result.data);
        }).catch(function(error) {
            failureCb(error);
        });
    };

    s.getTuts = function(data, successCb, failureCb) {
        s.postHttp('/', data, successCb, failureCb);
    };

    return s;
}]);