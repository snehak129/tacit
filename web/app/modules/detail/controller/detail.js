(function() {
	angular.module('tacit').controller('DetailController', ['$scope', '$stateParams', function($scope, $stateParams) {

		console.log('inside Works Detail Controller');
		$scope.details = {};


		const saveIndexes = function() {
			$scope.nextIndex = ($scope.currentIndex < $stateParams.projects.length) ? $scope.currentIndex + 1 : null;
			$scope.prevIndex = $scope.currentIndex - 1 ? $scope.currentIndex - 1 : null;
			console.log('prevIndex   ' + $scope.prevIndex);
		};


		const getAllFilter = function(filter) {
			const allProj = $scope.projects;
			const filterArr = filter && filter.split(" ");
			const currentProjInd = $scope.project.index;
			const map = {};

			for (let i = 0; i < filterArr.length; i++) {
				map[filterArr[i]] = 1;
			}

			let relProj = allProj.filter((el, index, array) => {
				if (el.index === currentProjInd) {
					return false;
				}
				const cat = el.categories;
				const catArr = cat && cat.split(" ");
				const filtArr = catArr.filter((el, index, array) => {
					if (map[el]) {
						return true;
					}
					return false;
				});

				if (filtArr.length > 0) {
					return true;
				}
				return false;

			});

			$scope.details.relatedProjects = relProj;
			//console.timeEnd("es6filter");

			//	console.log(relProj);

			//console.time("filter");
			// for (let i = 0; i < allProj.length; i++) {
			// 	if (allProj[i].index === currentProjInd) {
			// 		continue;
			// 	}
			// 	let cat = allProj[i].categories;
			// 	let catArr = cat.split(" ");
			// 	let found = false;
			// 	for (let k = 0; k < catArr.length; k++) {
			// 		let catString = catArr[k];
			// 		if (map[catString]) {
			// 			found = true;
			// 			break;
			// 		}
			// 		// if (found) {
			// 		// 	break;
			// 		// }

			// 	}

			// 	if (found) {
			// 		relatedProjects.push(allProj[i]);
			// 	}

			// }



			//console.timeEnd("filter");

		};

		const getUniqueFilter = function(filter) {
			const allProj = $scope.projects;
			const filterArr = filter && filter.split(" ");
			const currentProjInd = $scope.project.index;
			const map = {};

			for (let i = 0; i < filterArr.length; i++) {
				map[filterArr[i]] = 1;
			}

			let relProj = allProj.filter((el, index, array) => {
				if (el.index === currentProjInd) {
					return false;
				}
				const cat = el.categories;
				const catArr = cat && cat.split(" ");
				const filtArr = catArr.filter((el, index, array) => {
					if (map[el]) {
						return true;
					}
					return false;
				});

				if (filtArr.length === catArr.length) {
					return true;
				}
				return false;

			});
			$scope.details.relatedProjects = relProj;


		};


		const loadRelatedProjects = function() {
			let currentProj = $scope.project;
			let filter = currentProj.categories;
			getAllFilter(filter);
			//getUniqueFilter(filter);

		};

		function init() {
			$scope.projects = $stateParams.projects;
			$scope.project = $stateParams.projects[$stateParams.index - 1];
			$scope.currentIndex = parseInt($stateParams.index);
			loadRelatedProjects();
			saveIndexes();
			console.log($scope.project);
		}

		init();
	}])
})();