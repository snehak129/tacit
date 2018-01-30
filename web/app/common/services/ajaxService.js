angular.module('tacit').factory('AjaxService', ['$http', function($http) {
  console.log('inside service');
  return {
    post: function(url, callback) {
      //return the promise directly.
      var promise = $http({
        method: 'GET',
        transformRequest: angular.identity,
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(function successCallback(response) {
        console.log(response.data);
        var data = response.data;
        return callback(data);
                  //  return 
          // this callback will be called asynchronously
          // when the response is available
      }, function errorCallback(response) {
        console.log(response);
        //  return 
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }
  }
}]);