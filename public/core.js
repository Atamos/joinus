var joinusApp = angular.module('joinusApp',[]);

function eventsController($scope,$http)
{
   $scope.formData = {};

   //get list of events
   $http.get('/api/events')
   	.success(function(data){
   		$scope.events = data;
   	})
   	.error(function(data){
   		console.log('ERROR: '+data);
   	});
 

   	$scope.createEvent = function(){
   		console.log($scope.formData);
   		
   		$http.post('/api/events',$scope.formData)
   		.success(function(data){
   			$scope.formData = {};
   			$scope.events = data;
   		})
   		.error(function(data){
   			console.log('ERROR: ' + data);
   		});
   	}
    
   	$scope.deleteEvent = function(id) {
		$http.delete('/api/event/' + id)
			.success(function(data) {
				$scope.events = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

