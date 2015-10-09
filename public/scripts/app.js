var app=angular.module("ecotoneApp",["ngRoute","ngMaterial","ngMessages"]);app.config(["$mdThemingProvider","$routeProvider","$locationProvider","$httpProvider",function(e,t,o,r){o.html5Mode(!0),e.theme("default").primaryPalette("green").accentPalette("blue").warnPalette("orange"),t.when("/",{templateUrl:"/views/calculator.html",controller:"calculateCtrl"}).when("/login",{templateUrl:"/views/login.html",controller:""}).when("/register",{templateUrl:"/views/register.html",controller:"createAccountCtrl"}).when("/account",{templateUrl:"/views/account.html",controller:""}).when("/dashboard",{templateUrl:"/views/dashboard.html",controller:"projectsCtrl"}).when("/projects",{templateUrl:"/views/project.html",controller:"projectsCtrl"}).when("/about",{templateUrl:"/views/about.html"}).when("/contact",{templateUrl:"/views/contact.html",controller:""}).when("/privacy",{templateUrl:"/views/privacy.html"}).otherwise({redirectTo:"/"})}]),app.controller("calculateCtrl",["$scope","$http",function(e,t){function o(e){var t=angular.lowercase(e);return function(e){return-1!=e.primary_cat.indexOf(t)}}e.newCalculation=function(){var t=parseFloat(e.calculate.weight)*e.conversion;console.log(e.selected),console.log(t)},e.querySearch=function(t){return console.log(e.list.filter(o(t))),t?e.list.filter(o(t)):e.list},e.units=[{name:"lbs",conversion:5e-4},{name:"kilos",conversion:.00110231},{name:"tons",conversion:1},{name:"metric tons",conversion:1.10231}]}]),app.controller("loginCtrl",["$scope","$http","authService",function(e,t,o){e.login=function(){t({method:"POST",url:"/login",data:e.user}).then(function(e){o.saveToken(e.data.token)})}}]),app.controller("createAccountCtrl",["$scope","$http",function(e,t){e.user={},e.processForm=function(o){console.log("Posting..."),t({method:"POST",url:"/register",data:e.user,dataType:"json"}).then(function(e){console.log(e),alert("Your account has been created.")})}}]),app.controller("projectsCtrl",["$scope","$http",function(e,t){t({method:"POST",url:"http://www.w3schools.com/angular/customers.php"}).then(function(t){e.names=t.records})}]),app.service("authService",["$window",function(e){this.parseJwt=function(t){if(t){var o=t.split(".")[1],r=o.replace("-","+").replace("_","/");return JSON.parse(e.atob(r))}return{}},this.saveToken=function(t){e.localStorage.jwtToken=t,console.log("Saved token:",e.localStorage.jwtToken)},this.getToken=function(){return e.localStorage.jwtToken},this.isAuthed=function(){var e=this.getToken();if(e){var t=this.parseJwt(e),o=Math.round((new Date).getTime()/1e3)<=t.exp;return o||this.logout(),o}return!1},this.logout=function(){delete e.localStorage.jwtToken},this.getUser=function(){return this.parseJwt(this.getToken())}}]),app.factory("authInterceptor",["$q","$location","authService",function(e,t,o){return{request:function(e){return e.headers=e.headers||{},o.isAuthed()&&(e.headers.Authorization="Bearer "+o.getToken()),e},response:function(o){return 401===o.status&&t.path("/login"),o||e.when(o)},responseError:function(o){return 401===o.status?t.path("/login"):console.log(o),e.reject(o)}}}]);