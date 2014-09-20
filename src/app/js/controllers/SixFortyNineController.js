sixFortyNineApp
	.controller('SixFortyNineController', ['$scope', function($scope) {

	$scope.fromDate = new Date('1982-06-12');
	$scope.toDate = new Date();
	$scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	};
	$scope.openFromDate = function($event) {
		$scope.stopEvent($event);
		$scope.openedFrom = true;
	};
	$scope.openToDate = function($event) {
		$scope.stopEvent($event);
	    $scope.openedTo = true;
	};
	$scope.stopEvent = function($event) {
		$event.preventDefault();
	    $event.stopPropagation();
	};
}]);