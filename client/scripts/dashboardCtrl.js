app.controller('dashboardCtrl', ['$location', 'projectMethods', '$mdDialog', '$rootScope', '$scope', '$http', function($location, projectMethods, $mdDialog, $rootScope, $scope, $http) {

    self = this;
    self.selectProject= selectProject;
    self.selectItems= '';
    //self.grandTotal= grandTotal;
    self.projects = '';
    self.Co2GrandTotal = 0;
    self.getAllItems= getAllItems;
    self.calculateGrandTotal= calculateGrandTotal;
    self.calculateProjectTotal = calculateProjectTotal;
    self.projects.id = '';
    self.projectItems = '';
    self.projectTotal = 0;


    $scope.showDelete = function(project) {
        console.log('CLICK');
        var confirm = $mdDialog.confirm()
            .title('Are you sure you want to remove your project?')
            .content('This is permanent.')
            .ariaLabel('Remove project from account permanently')
            .ok('Remove')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {
            console.log(project);
            $http.delete('/project/' + project.id).then(function( res ){
               if( res.status == 200 ){
                   projectMethods.getProjectNames(function (names) {
                       self.projects = names;
                       console.log(names);
                   });
               }
            });

            $scope.alert = 'Your project has been removed.';
        }, function() {
            $scope.alert = 'Your project has not been removed.';
        });
    };


// get the active projects
    projectMethods.getProjectNames(function (names) {
        self.projects = names;
        console.log("Proj name: ", names);
    });
    getAllItems();

//select a project to edit
    function selectProject(project){
        console.log(project);
        projectMethods.setSelectedProject(project);

        $location.path('/projects');
    }

//get all calculations for all projects to calc Grand Total CO2
    function getAllItems() {
    projectMethods.getAllProjectItems().then(function( items ){
        self.selectItems = items;
        calculateGrandTotal();
        });
    }

    //calculate the Grand Total
    function calculateGrandTotal() {
        self.selectItems.forEach(function (item) {
        self.Co2GrandTotal += item.co2_offset;
            });
        }

    //calculate co2 for each project
    function getProjectItemsbyProjectId(id) {
        self.projects.forEach(function () {
            projectMethods.getProjectItems(function (items) {
                self.projectItems = items;
                console.log(items);
            });
            calculateProjectTotal();
        })
    }

    //calculate project total co2
    function calculateProjectTotal(){
        self.projectItems.forEach(function (item) {
        self.projectTotal += item.co2_offset;
            })
        }
}]);