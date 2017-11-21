(function() {
  angular.module('tacit').factory('PaginationService', [function() {
    return {
      initPagination: function(totalItems, currentPage, pageSize) {
        currentPage = currentPage || 1;
        pageSize = pageSize || 10;   // can be configured
        //totalItems = $scope.blog.projects.length || 0;
        totalPages = Math.ceil(totalItems / pageSize);
        let startPage, endPage;

        if (totalPages <= 10) {
          startPage = 1;
          endPage = totalPages;
        } else {

          if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
          } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
          }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [];

        for (var i = startPage; i <= endPage; i++) {
          pages.push(i);
        }

        // return object with all pager properties required by the view
        return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
        };

      }
    }
  }]);
})()