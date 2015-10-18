// Project Page -  Kim/Madeleine
app.controller('projectsCtrl', ['$mdDialog', '$scope', '$rootScope', '$http', function($mdDialog, $scope, $rootScope, $http) {

    // Self dec




    var self = this;
    self.projectList = '';
    self.result = '';
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.selectedProjectItems = '';
    self.projectTotal = 0;
    self.deleteProjectItem = deleteProjectItem;
    self.id = 0;


    //refresh project list
    function getProjectList() {
        $http.get('/project/namesById?user_id=' + $rootScope.user.id).then(function( res ){
            self.projectList = res.data;
        })
    }

    //get items for selected project
    function getProjectItems() {
        $http.get('/project/?user_id=' + $rootScope.user.id + "&project_id=2").then(function (response) {
            console.log(response);
            self.projectItems = response.data;
        });
    }

    //load project list on page load
    getProjectList();


    function querySearch(query) {
        return query ? self.projectList.filter(createFilterFor(query)) : self.projectList;
    }

    function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
        //query.charAt(0).toUpperCase() + query.slice(1);
        return function filterFn(obj) {
            return (obj.project_name.indexOf(lowercaseQuery) != -1);
        };
    }

    function searchTextChange(text) {
        console.log('Text changed to ', text);
    }

    function selectedItemChange(item) {
        console.log('item', item);
        $http.get('/project/?user_id=' + $rootScope.user.id + '&project_id=' + self.selected_project.id).then(function(res ) {
            self.selectedProjectItems = res.data;
            console.log(self.selectedProjectItems);
        });


        if ( item == undefined ) {
            self.selected_project = '';
            self.project_description = '';
        }
    }

    $scope.showDelete = function(ev, id) {
        console.log('CLICK');
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this item?')
            .content('This will be permanent.')
            .ariaLabel('Delete item permanently')
            .ok('Delete')
            .cancel('Cancel')
            .targetEvent(ev);
        $mdDialog.show(confirm).then(function(){
            console.log("Deleting", id);
            self.deleteProjectItem(id);
            $scope.alert = 'Your item has been deleted.';
        }, function() {
            $scope.alert = 'Your item has not been deleted.';
        });
    };


    function deleteProjectItem(id) {
        console.log("Deleting...", id);

        //$http.update('/project', self.id).then(function (response) {
        //findOne and delete by id using projectlist.id
        //    console.log("Item was deleted.", response);
        //    self.getProjectList();
    }

    function saveProject() {
        console.log("Saving...", self.id);
        //save all project fields? how do I even do this?
    };

    function calculateProjectTotal() {
        console.log("calculating...");
        projectList.forEach(function (item) {
            projectTotal += item.co2_offset;
            console.log(projectTotal);
            return projectTotal;

        })
    }



}]);