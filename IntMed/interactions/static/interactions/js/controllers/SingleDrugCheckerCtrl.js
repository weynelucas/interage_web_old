app.controller('SingleDrugCheckerCtrl', function SingleDrugCheckerCtrl($scope, $timeout,  interactionsApi, filterFilter, multipleSelectFilterFilter) {
    var interactionsProperties = interactionsApi.getInteractionsProperties();

    $scope.init = function () {
        $scope.currentPage = 1;
        $scope.maxSize = 5;
        $scope.pageSize = 50;
        $scope.options = {
            pageSize: [10, 25, 50, 100],
            action:   interactionsProperties.action,
            evidence: interactionsProperties.evidence,
            severity: interactionsProperties.severity
        };
        $scope.loading = false;
        $scope.checker = {
            selectedDrug: drug || {},
            interactions: [],
        };

        // Initially sort by interaction type
        $scope.reverse = true;
        $scope.propertyName = "type";
    }

    $scope.selectedIds = function () {
        return  $scope.checker.selectedDrug ? $scope.checker.selectedDrug.id : [];
    }

    $scope.insertSelectedDrug = function (drug) {
        $scope.checker.selectedDrug = angular.copy(drug);
        delete drug;
    }

    $scope.processInteractions = function () {
        $scope.loading = true;

        interactionsApi.processSingleInteractions($scope.selectedIds()).success(function (data, status) {
            $scope.checker.interactions = data;
            $scope.totalItems = data.length;
        }).error(function (data) {
            $scope.checker.interactions = [];
        }).then(function (data) {
            $scope.loading = false;
        });
    }

    $scope.isFilterOpen = function () {
        return !$("#filterBox").hasClass("collapsed-box");
    }

    $scope.closeFilter = function () {
        if ($scope.isFilterOpen()) {
            $.AdminLTE.boxWidget.collapse($("#filterBox .box-body"));
        }
    }

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    }

    $scope.getSortingClass = function (propertyName) {
        var sortingClass = "sorting";

        if ($scope.propertyName == propertyName) {
            if($scope.reverse) {
                sortingClass += "_desc";
            } else {
                sortingClass += "_asc";
            }
        }

        return sortingClass;
    }

    $scope.resetFilters = function () {
        $scope.search = {};
        clearAllSelect2Inputs();
        $scope.closeFilter();
    }

    $scope.$watch("checker.selectedDrug", function (newSelectedDrug, oldSelectedDrug) {
        if (!$.isEmptyObject($scope.checker.selectedDrug)) {
            $timeout(function () {
                $scope.resetFilters();
            });
            $scope.processInteractions();
        }
    }, true);

    $scope.$watch('search', function (newVal, oldVal) {
        if (newVal != undefined) {
            $scope.filtered = filterFilter($scope.checker.interactions, newVal.text);
            $scope.filtered = multipleSelectFilterFilter($scope.filtered, newVal.select);
            $scope.totalItems = $scope.filtered.length;
            $scope.currentPage = 1;
        }
    }, true);

    $scope.init();

});
