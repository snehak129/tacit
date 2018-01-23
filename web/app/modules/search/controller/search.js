(function() {
	angular.module('tacit').controller('BlogController', ['$scope', 'Common', 'AjaxService', 'PaginationService', '$transition$', '$filter', function($scope, Common, AjaxService, PaginationService, $transition$, $filter) {

		console.log('inside BlogController');

		let searchValue = $transition$.params() && $transition$.params().searchValue;
		$scope.items = null;
		//console.log($transition$);

		function init() {
			$scope.pager = {};
			getBlog();
			getSearch();
		}

		const getSearch = function(){
			AjaxService.post(Common.url.getSearch, function(result) {
				$scope.search = result;
				
			});
		};

		let filterCat = function(actualList) {

			let uniquArr = new Set([]);
			for (let i = 0; i < actualList.length; i++) {
				const cat = actualList[i].categories;
				let catArr = cat && cat.split(" ");
				uniquArr.addAll(catArr);
			}

			const catArr = Array.from(uniquArr);
			$scope.catArr = Common.categories.filter((el) => {
				return catArr.includes(el.name);
			});

		};

		const setSearch = function(searchVal) {
			$scope.actualList = [];
			$scope.actualList = searchVal ? $filter('filter')($scope.blog.projects, searchVal) : $scope.blog.projects;
			filterCat($scope.actualList);
			//$scope.filterCat = searchValue? $filter('filter')($scope.blog.projects, {searchValue}): $scope.blog.projects;

			$scope.setPage(1);
		}

		const getBlog = function() {
			AjaxService.post(Common.url.getWorks, function(result) {
				$scope.blog = result;
				$scope.searchValue = searchValue;
				setSearch(searchValue);
			});
		};

		const deactivateAll = function() {
			for (let cat of $scope.catArr) {
				cat.active = "";
			}
		}


		$scope.filterCatProjects = function(cat) {
			deactivateAll();
			cat.active = "active";
			$scope.actualList = $filter('filter')($scope.blog.projects, {
					categories: cat.name
				}, false)
				//filterCat($scope.actualList);
			if ($scope.actualList.length > 0) {
				$scope.setPage(1);
			}
		}



		$scope.setPage = function(page) {
			if ($scope.actualList.length == 0) {
				$scope.items = [];
				return;
			}
			if (page < 1 || page > $scope.pager.totalPages) {
				return;
			}
			// get pager object from service
			$scope.pager = PaginationService.initPagination($scope.actualList.length, page);
			// get current page of items
			$scope.items = $scope.actualList.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
		}

		$scope.submit = function(searchValue) {
			setSearch(searchValue);
		}

		init();


		Set.prototype.addAll = function(arr) {
			for (var elem of arr) {
				this.add(elem);
			}
			return this;
		}

	}]);
})();