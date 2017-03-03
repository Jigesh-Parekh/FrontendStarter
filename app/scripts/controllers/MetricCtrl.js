(function () {
	function MetricCtrl($scope, Metrics) {
		$scope.data = Metrics.countSongs();

		console.log($scope.data);
	}

	angular
		.module('blocJams')
		.controller('MetricCtrl', ['$scope', 'Metrics', MetricCtrl]);
})();