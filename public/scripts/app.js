var app=angular.module("ecotoneApp",["ngRoute","ngMaterial","ngMessages","validation.match"]);app.config(["$mdThemingProvider","$routeProvider","$locationProvider","$httpProvider",function(t,e,o,n){o.html5Mode(!0),t.theme("default").primaryPalette("green").accentPalette("blue-grey",{"default":"600"}).warnPalette("orange"),e.when("/",{templateUrl:"/views/calculator.html",controller:"calculateCtrl as ctrl"}).when("/login",{templateUrl:"/views/login.html",controller:""}).when("/register",{templateUrl:"/views/register.html",controller:"createAccountCtrl"}).when("/admin",{templateUrl:"/views/admin.html",controller:"adminCtrl as ctrl"}).when("/account",{templateUrl:"/views/account.html",controller:""}).when("/dashboard",{templateUrl:"/views/dashboard.html",controller:"projectsCtrl"}).when("/projects",{templateUrl:"/views/project.html",controller:"projectsCtrl"}).when("/about",{templateUrl:"/views/about.html"}).when("/contact",{templateUrl:"/views/contact.html",controller:""}).when("/privacy",{templateUrl:"/views/privacy.html"}).when("/sources",{templateUrl:"/views/sources.html"}).otherwise({redirectTo:"/"})}]),app.controller("calculateCtrl",["$http",function(t){function e(t){console.log("Text changed to ",t)}function o(t){void 0==t&&(l.category="",l.subcategory="",l.warmId="",l.weight="",l.conversion="",l.result="")}function n(){var e={warmId:l.warmId||l.category.secondaries[0].warm_id,weight:parseFloat(l.weight)*l.conversion};t.post("/calculations",e).then(function(t){l.result=Math.floor(1e3*Math.abs(t.data))/1e3})}function r(t){return t?l.list.filter(a(t)):l.list}function a(t){var e=t.toLowerCase();return function(t){return-1!=t.primary_cat.indexOf(e)}}t.get("/materials").then(function(t){var e=t.data;e.forEach(function(t){t.primary_cat=t.primary_cat.toLowerCase()}),l.list=e});var l=this;l.list="",l.result="",l.querySearch=r,l.selectedItemChange=o,l.searchTextChange=e,l.units=[{name:"lbs",conversion:5e-4},{name:"kilos",conversion:.00110231},{name:"tons",conversion:1},{name:"metric tons",conversion:1.10231}],l.newCalculation=n}]),app.controller("adminCtrl",["$http",function(t){function e(e){var n=e.id;console.log(n),t.put("/suggestions/complete/"+n).then(function(t){o()})}function o(){t.get("/suggestions").then(function(t){var e=t.data;console.log(e),n.suggestions=e})}o();var n=this;n.suggestions="",n.markComplete=e}]),app.controller("loginCtrl",["$scope","$http","authService",function(t,e,o){t.login=function(){e({method:"POST",url:"/login",data:t.user}).then(function(t){o.saveToken(t.data.token)})}}]),app.controller("createAccountCtrl",["$scope","$http",function(t,e){t.user={},t.processForm=function(o){console.log("Posting..."),e({method:"POST",url:"/register",data:t.user,dataType:"json"}).then(function(t){console.log(t),alert("Your account has been created.")})}}]),app.controller("projectsCtrl",["$scope","$http",function(t,e){e.get("/project").then(function(e){console.log(e),t.projectList=e.data}),e({method:"GET",url:"http://www.w3schools.com/angular/customers.php"}).then(function(e){t.names=e.records})}]),app.service("authService",["$window",function(t){this.parseJwt=function(e){if(e){var o=e.split(".")[1],n=o.replace("-","+").replace("_","/");return JSON.parse(t.atob(n))}return{}},this.saveToken=function(e){t.localStorage.jwtToken=e,console.log("Saved token:",t.localStorage.jwtToken)},this.getToken=function(){return t.localStorage.jwtToken},this.isAuthed=function(){var t=this.getToken();if(t){var e=this.parseJwt(t),o=Math.round((new Date).getTime()/1e3)<=e.exp;return o||this.logout(),o}return!1},this.logout=function(){delete t.localStorage.jwtToken},this.getUser=function(){return this.parseJwt(this.getToken())}}]),app.factory("authInterceptor",["$q","$location","authService",function(t,e,o){return{request:function(t){return t.headers=t.headers||{},o.isAuthed()&&(t.headers.Authorization="Bearer "+o.getToken()),t},response:function(o){return 401===o.status&&e.path("/login"),o||t.when(o)},responseError:function(o){return 401===o.status?e.path("/login"):console.log(o),t.reject(o)}}}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkbWRUaGVtaW5nUHJvdmlkZXIiLCIkcm91dGVQcm92aWRlciIsIiRsb2NhdGlvblByb3ZpZGVyIiwiJGh0dHBQcm92aWRlciIsImh0bWw1TW9kZSIsInRoZW1lIiwicHJpbWFyeVBhbGV0dGUiLCJhY2NlbnRQYWxldHRlIiwiZGVmYXVsdCIsIndhcm5QYWxldHRlIiwid2hlbiIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsIm90aGVyd2lzZSIsInJlZGlyZWN0VG8iLCIkaHR0cCIsInNlYXJjaFRleHRDaGFuZ2UiLCJ0ZXh0IiwiY29uc29sZSIsImxvZyIsInNlbGVjdGVkSXRlbUNoYW5nZSIsIml0ZW0iLCJ1bmRlZmluZWQiLCJzZWxmIiwiY2F0ZWdvcnkiLCJzdWJjYXRlZ29yeSIsIndhcm1JZCIsIndlaWdodCIsImNvbnZlcnNpb24iLCJyZXN1bHQiLCJuZXdDYWxjdWxhdGlvbiIsImNhbGN1bGF0ZSIsInNlY29uZGFyaWVzIiwid2FybV9pZCIsInBhcnNlRmxvYXQiLCJwb3N0IiwidGhlbiIsInJlc3BvbnNlIiwiTWF0aCIsImZsb29yIiwiYWJzIiwiZGF0YSIsInF1ZXJ5U2VhcmNoIiwicXVlcnkiLCJsaXN0IiwiZmlsdGVyIiwiY3JlYXRlRmlsdGVyRm9yIiwibG93ZXJjYXNlUXVlcnkiLCJ0b0xvd2VyQ2FzZSIsIm9iaiIsInByaW1hcnlfY2F0IiwiaW5kZXhPZiIsImdldCIsImZvckVhY2giLCJ0aGlzIiwidW5pdHMiLCJuYW1lIiwibWFya0NvbXBsZXRlIiwic3VnZ2VzdGlvbiIsImlkIiwicHV0IiwicmVzIiwiaW5pdCIsInN1Z2dlc3Rpb25zIiwiJHNjb3BlIiwiYXV0aFNlcnZpY2UiLCJsb2dpbiIsIm1ldGhvZCIsInVybCIsInVzZXIiLCJzYXZlVG9rZW4iLCJ0b2tlbiIsInByb2Nlc3NGb3JtIiwiZGF0YVR5cGUiLCJhbGVydCIsInByb2plY3RMaXN0IiwibmFtZXMiLCJyZWNvcmRzIiwic2VydmljZSIsIiR3aW5kb3ciLCJwYXJzZUp3dCIsImJhc2U2NFVybCIsInNwbGl0IiwiYmFzZTY0IiwicmVwbGFjZSIsIkpTT04iLCJwYXJzZSIsImF0b2IiLCJsb2NhbFN0b3JhZ2UiLCJqd3RUb2tlbiIsImdldFRva2VuIiwiaXNBdXRoZWQiLCJwYXJhbXMiLCJub3RFeHBpcmVkIiwicm91bmQiLCJEYXRlIiwiZ2V0VGltZSIsImV4cCIsImxvZ291dCIsImdldFVzZXIiLCJmYWN0b3J5IiwiJHEiLCIkbG9jYXRpb24iLCJyZXF1ZXN0IiwiaGVhZGVycyIsIkF1dGhvcml6YXRpb24iLCJzdGF0dXMiLCJwYXRoIiwicmVzcG9uc2VFcnJvciIsInJlamVjdCJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBSUEsS0FBTUMsUUFBUUMsT0FBTyxjQUFlLFVBQVcsYUFBYyxhQUFjLG9CQUUvRUYsS0FBSUcsUUFBUSxxQkFBc0IsaUJBQWtCLG9CQUFxQixnQkFBaUIsU0FBU0MsRUFBb0JDLEVBQWdCQyxFQUFtQkMsR0FDdEpELEVBQWtCRSxXQUFVLEdBRzVCSixFQUFtQkssTUFBTSxXQUNwQkMsZUFBZSxTQUNmQyxjQUFjLGFBQWNDLFVBQVUsUUFDdENDLFlBQWEsVUFHbEJSLEVBQWVTLEtBQUssS0FFWkMsWUFBYSx5QkFDYkMsV0FBWSwwQkFDYkYsS0FBSyxVQUVKQyxZQUFhLG9CQUNiQyxXQUFZLEtBQ2JGLEtBQUssYUFFSkMsWUFBYSx1QkFDYkMsV0FBWSxzQkFDYkYsS0FBSyxVQUVKQyxZQUFhLG9CQUNiQyxXQUFZLHNCQUViRixLQUFLLFlBRUpDLFlBQWEsc0JBQ2JDLFdBQVksS0FDYkYsS0FBSyxjQUVKQyxZQUFhLHdCQUNiQyxXQUFZLGlCQUNiRixLQUFLLGFBRUpDLFlBQWEsc0JBQ2JDLFdBQVksaUJBQ2JGLEtBQUssVUFFSkMsWUFBYSxzQkFDZEQsS0FBSyxZQUVKQyxZQUFhLHNCQUNiQyxXQUFZLEtBQ2JGLEtBQUssWUFFSkMsWUFBYSx3QkFDZEQsS0FBSyxZQUVKQyxZQUFhLHdCQUNkRSxXQUNDQyxXQUFZLFNBTXhCbEIsSUFBSWdCLFdBQVcsaUJBQWtCLFFBQVMsU0FBVUcsR0EyQ2hELFFBQVNDLEdBQWlCQyxHQUN0QkMsUUFBUUMsSUFBSSxtQkFBb0JGLEdBR3BDLFFBQVNHLEdBQW1CQyxHQUNYQyxRQUFSRCxJQUNERSxFQUFLQyxTQUFXLEdBQ2hCRCxFQUFLRSxZQUFjLEdBQ25CRixFQUFLRyxPQUFTLEdBQ2RILEVBQUtJLE9BQVMsR0FDZEosRUFBS0ssV0FBYSxHQUNsQkwsRUFBS00sT0FBUyxJQUl0QixRQUFTQyxLQUVMLEdBQUlDLElBQ0FMLE9BQVFILEVBQUtHLFFBQVVILEVBQUtDLFNBQVNRLFlBQVksR0FBR0MsUUFDcEROLE9BQVFPLFdBQVdYLEVBQUtJLFFBQVVKLEVBQUtLLFdBRzNDYixHQUFNb0IsS0FBSyxnQkFBaUJKLEdBQVdLLEtBQUssU0FBU0MsR0FDakRkLEVBQUtNLE9BQVNTLEtBQUtDLE1BQWdDLElBQTFCRCxLQUFLRSxJQUFJSCxFQUFTSSxPQUFnQixNQWtCbkUsUUFBU0MsR0FBWUMsR0FDakIsTUFBT0EsR0FBUXBCLEVBQUtxQixLQUFLQyxPQUFPQyxFQUFnQkgsSUFBVXBCLEVBQUtxQixLQUduRSxRQUFTRSxHQUFnQkgsR0FDckIsR0FBSUksR0FBaUJKLEVBQU1LLGFBQzNCLE9BQU8sVUFBa0JDLEdBQ3JCLE1BQW1ELElBQTNDQSxFQUFJQyxZQUFZQyxRQUFRSixJQXpGeENoQyxFQUFNcUMsSUFBSSxjQUFjaEIsS0FBSyxTQUFTQyxHQUNsQyxHQUFJTyxHQUFPUCxFQUFTSSxJQUVwQkcsR0FBS1MsUUFBUSxTQUFTaEMsR0FDbEJBLEVBQUs2QixZQUFjN0IsRUFBSzZCLFlBQVlGLGdCQUl4Q3pCLEVBQUtxQixLQUFPQSxHQUtoQixJQUFJckIsR0FBTytCLElBRVgvQixHQUFLcUIsS0FBTyxHQUNackIsRUFBS00sT0FBUyxHQUNkTixFQUFLbUIsWUFBY0EsRUFDbkJuQixFQUFLSCxtQkFBcUJBLEVBQzFCRyxFQUFLUCxpQkFBcUJBLEVBQzFCTyxFQUFLZ0MsUUFFR0MsS0FBTSxNQUNONUIsV0FBWSxPQUdaNEIsS0FBTSxRQUNONUIsV0FBWSxZQUdaNEIsS0FBTSxPQUNONUIsV0FBWSxJQUdaNEIsS0FBTSxjQUNONUIsV0FBWSxVQUdwQkwsRUFBS08sZUFBaUJBLEtBMkQxQmxDLElBQUlnQixXQUFXLGFBQWMsUUFBUyxTQUFVRyxHQVE1QyxRQUFTMEMsR0FBY0MsR0FDbkIsR0FBSUMsR0FBS0QsRUFBV0MsRUFDcEJ6QyxTQUFRQyxJQUFJd0MsR0FDWjVDLEVBQU02QyxJQUFJLHlCQUEyQkQsR0FBSXZCLEtBQUssU0FBVXlCLEdBQ3JEQyxNQUlQLFFBQVNBLEtBQ0wvQyxFQUFNcUMsSUFBSSxnQkFBZ0JoQixLQUFLLFNBQVV5QixHQUNyQyxHQUFJRSxHQUFjRixFQUFJcEIsSUFDdEJ2QixTQUFRQyxJQUFJNEMsR0FDWnhDLEVBQUt3QyxZQUFjQSxJQWxCM0JELEdBRUEsSUFBSXZDLEdBQU8rQixJQUNYL0IsR0FBS3dDLFlBQWMsR0FDbkJ4QyxFQUFLa0MsYUFBZUEsS0FzQnhCN0QsSUFBSWdCLFdBQVcsYUFBYyxTQUFVLFFBQVMsY0FBZSxTQUFTb0QsRUFBUWpELEVBQU9rRCxHQUNuRkQsRUFBT0UsTUFBUSxXQUNYbkQsR0FDSW9ELE9BQVEsT0FDUkMsSUFBSyxTQUNMM0IsS0FBTXVCLEVBQU9LLE9BQ2RqQyxLQUFLLFNBQVNDLEdBQ2I0QixFQUFZSyxVQUFVakMsRUFBU0ksS0FBSzhCLGFBTWhEM0UsSUFBSWdCLFdBQVcscUJBQXNCLFNBQVUsUUFBUyxTQUFTb0QsRUFBUWpELEdBQ3JFaUQsRUFBT0ssUUFFUEwsRUFBT1EsWUFBYyxTQUFVSCxHQUMzQm5ELFFBQVFDLElBQUksY0FDWkosR0FDSW9ELE9BQVEsT0FDUkMsSUFBSyxZQUNMM0IsS0FBTXVCLEVBQU9LLEtBQ2JJLFNBQVUsU0FDWHJDLEtBQUssU0FBVUMsR0FDZG5CLFFBQVFDLElBQUlrQixHQUNacUMsTUFBTSx3Q0FNbEI5RSxJQUFJZ0IsV0FBVyxnQkFBaUIsU0FBVSxRQUFTLFNBQVNvRCxFQUFRakQsR0FFaEVBLEVBQU1xQyxJQUFJLFlBQVloQixLQUFLLFNBQVNDLEdBQ2hDbkIsUUFBUUMsSUFBSWtCLEdBQ1oyQixFQUFPVyxZQUFjdEMsRUFBU0ksT0FLbEMxQixHQUNJb0QsT0FBUSxNQUNSQyxJQUFLLG1EQUNOaEMsS0FBSyxTQUFVQyxHQUNkMkIsRUFBT1ksTUFBUXZDLEVBQVN3QyxhQU1oQ2pGLElBQUlrRixRQUFRLGVBQWdCLFVBQVcsU0FBVUMsR0FDN0N6QixLQUFLMEIsU0FBVyxTQUFVVCxHQUN0QixHQUFJQSxFQUFPLENBQ1AsR0FBSVUsR0FBWVYsRUFBTVcsTUFBTSxLQUFLLEdBQzdCQyxFQUFTRixFQUFVRyxRQUFRLElBQUssS0FBS0EsUUFBUSxJQUFLLElBQ3RELE9BQU9DLE1BQUtDLE1BQU1QLEVBQVFRLEtBQUtKLElBQzVCLFVBR1g3QixLQUFLZ0IsVUFBWSxTQUFVQyxHQUN2QlEsRUFBUVMsYUFBYUMsU0FBV2xCLEVBQ2hDckQsUUFBUUMsSUFBSSxlQUFlNEQsRUFBUVMsYUFBYUMsV0FHcERuQyxLQUFLb0MsU0FBVyxXQUNaLE1BQU9YLEdBQVFTLGFBQWFDLFVBR2hDbkMsS0FBS3FDLFNBQVcsV0FDWixHQUFJcEIsR0FBUWpCLEtBQUtvQyxVQUNqQixJQUFJbkIsRUFBTyxDQUNQLEdBQUlxQixHQUFTdEMsS0FBSzBCLFNBQVNULEdBQ3ZCc0IsRUFBYXZELEtBQUt3RCxPQUFNLEdBQUlDLE9BQU9DLFVBQVksTUFBU0osRUFBT0ssR0FJbkUsT0FIS0osSUFDRHZDLEtBQUs0QyxTQUVGTCxFQUVQLE9BQU8sR0FJZnZDLEtBQUs0QyxPQUFTLGlCQUNIbkIsR0FBUVMsYUFBYUMsVUFJaENuQyxLQUFLNkMsUUFBVSxXQUNYLE1BQU83QyxNQUFLMEIsU0FBUzFCLEtBQUtvQyxnQkFJbEM5RixJQUFJd0csUUFBUSxtQkFBb0IsS0FBTSxZQUFhLGNBQWUsU0FBVUMsRUFBSUMsRUFBV3JDLEdBQ3ZGLE9BQ0lzQyxRQUFTLFNBQVV4RyxHQUtmLE1BSkFBLEdBQU95RyxRQUFVekcsRUFBT3lHLFlBQ3BCdkMsRUFBWTBCLGFBQ1o1RixFQUFPeUcsUUFBUUMsY0FBZ0IsVUFBWXhDLEVBQVl5QixZQUVwRDNGLEdBRVhzQyxTQUFVLFNBQVVBLEdBT2hCLE1BTHdCLE9BQXBCQSxFQUFTcUUsUUFHVEosRUFBVUssS0FBSyxVQUVadEUsR0FBWWdFLEVBQUczRixLQUFLMkIsSUFDNUJ1RSxjQUFlLFNBQVV2RSxHQU94QixNQU53QixPQUFwQkEsRUFBU3FFLE9BQ1RKLEVBQVVLLEtBQUssVUFHZnpGLFFBQVFDLElBQUlrQixHQUVUZ0UsRUFBR1EsT0FBT3hFIiwiZmlsZSI6InNjcmlwdHMvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdlY290b25lQXBwJywgWyduZ1JvdXRlJywgJ25nTWF0ZXJpYWwnLCAnbmdNZXNzYWdlcycsICd2YWxpZGF0aW9uLm1hdGNoJ10pO1xuXG5hcHAuY29uZmlnKFsnJG1kVGhlbWluZ1Byb3ZpZGVyJywgJyRyb3V0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInLCBmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcil7XG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXG4gICAgLy9zZXQgdGhlbWUgYW5kIGNvbG9yIHBhbGV0dGVcbiAgICAkbWRUaGVtaW5nUHJvdmlkZXIudGhlbWUoJ2RlZmF1bHQnKVxuICAgICAgICAucHJpbWFyeVBhbGV0dGUoJ2dyZWVuJylcbiAgICAgICAgLmFjY2VudFBhbGV0dGUoJ2JsdWUtZ3JleScsIHsnZGVmYXVsdCc6JzYwMCd9KVxuICAgICAgICAud2FyblBhbGV0dGUgKCdvcmFuZ2UnKTtcblxuICAgIC8vcm91dGVzIGZvciB2aWV3c1xuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy8nLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9jYWxjdWxhdG9yLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2NhbGN1bGF0ZUN0cmwgYXMgY3RybCdcbiAgICAgICAgfSkud2hlbignL2xvZ2luJyxcbiAgICAgICAge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnJ1xuICAgICAgICB9KS53aGVuKCcvcmVnaXN0ZXInLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9yZWdpc3Rlci5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVBY2NvdW50Q3RybCdcbiAgICAgICAgfSkud2hlbignL2FkbWluJyxcbiAgICAgICAge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvYWRtaW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW5DdHJsIGFzIGN0cmwnXG5cbiAgICAgICAgfSkud2hlbignL2FjY291bnQnLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9hY2NvdW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJydcbiAgICAgICAgfSkud2hlbignL2Rhc2hib2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2Rhc2hib2FyZC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwcm9qZWN0c0N0cmwnXG4gICAgICAgIH0pLndoZW4oJy9wcm9qZWN0cycsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3Byb2plY3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAncHJvamVjdHNDdHJsJ1xuICAgICAgICB9KS53aGVuKCcvYWJvdXQnLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9hYm91dC5odG1sJ1xuICAgICAgICB9KS53aGVuKCcvY29udGFjdCcsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2NvbnRhY3QuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnJ1xuICAgICAgICB9KS53aGVuKCcvcHJpdmFjeScsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3ByaXZhY3kuaHRtbCdcbiAgICAgICAgfSkud2hlbignL3NvdXJjZXMnLFxuICAgICAgICB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9zb3VyY2VzLmh0bWwnXG4gICAgICAgIH0pLm90aGVyd2lzZSh7XG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnLydcbiAgICAgICAgfSk7XG5cbiAgICAvLyRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2F1dGhJbnRlcmNlcHRvcicpO1xufV0pO1xuXG5hcHAuY29udHJvbGxlcignY2FsY3VsYXRlQ3RybCcsIFsnJGh0dHAnLCBmdW5jdGlvbiggJGh0dHAgKSB7XG4gICAgLy8gSU5JVFxuICAgICRodHRwLmdldCgnL21hdGVyaWFscycpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIGxpc3QgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGl0ZW0ucHJpbWFyeV9jYXQgPSBpdGVtLnByaW1hcnlfY2F0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAvLyAvaXRlbS5wcmltYXJ5X2NhdCA9IGl0ZW0ucHJpbWFyeV9jYXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnByaW1hcnlfY2F0LnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYubGlzdCA9IGxpc3Q7XG5cbiAgICB9KTtcblxuICAgIC8vIFNlbGYgZGVjXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgc2VsZi5saXN0ID0gJyc7XG4gICAgc2VsZi5yZXN1bHQgPSAnJztcbiAgICBzZWxmLnF1ZXJ5U2VhcmNoID0gcXVlcnlTZWFyY2g7XG4gICAgc2VsZi5zZWxlY3RlZEl0ZW1DaGFuZ2UgPSBzZWxlY3RlZEl0ZW1DaGFuZ2U7XG4gICAgc2VsZi5zZWFyY2hUZXh0Q2hhbmdlICAgPSBzZWFyY2hUZXh0Q2hhbmdlO1xuICAgIHNlbGYudW5pdHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdsYnMnLFxuICAgICAgICAgICAgY29udmVyc2lvbjogMC4wMDA1XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdraWxvcycsXG4gICAgICAgICAgICBjb252ZXJzaW9uOiAwLjAwMTEwMjMxXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd0b25zJyxcbiAgICAgICAgICAgIGNvbnZlcnNpb246IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ21ldHJpYyB0b25zJyxcbiAgICAgICAgICAgIGNvbnZlcnNpb246IDEuMTAyMzFcbiAgICAgICAgfVxuICAgIF07XG4gICAgc2VsZi5uZXdDYWxjdWxhdGlvbiA9IG5ld0NhbGN1bGF0aW9uO1xuXG5cbiAgICBmdW5jdGlvbiBzZWFyY2hUZXh0Q2hhbmdlKHRleHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1RleHQgY2hhbmdlZCB0byAnLCB0ZXh0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RlZEl0ZW1DaGFuZ2UoaXRlbSkge1xuICAgICAgICBpZiAoIGl0ZW0gPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgc2VsZi5jYXRlZ29yeSA9ICcnO1xuICAgICAgICAgICAgc2VsZi5zdWJjYXRlZ29yeSA9ICcnO1xuICAgICAgICAgICAgc2VsZi53YXJtSWQgPSAnJztcbiAgICAgICAgICAgIHNlbGYud2VpZ2h0ID0gJyc7XG4gICAgICAgICAgICBzZWxmLmNvbnZlcnNpb24gPSAnJztcbiAgICAgICAgICAgIHNlbGYucmVzdWx0ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdDYWxjdWxhdGlvbigpIHtcblxuICAgICAgICB2YXIgY2FsY3VsYXRlID0ge1xuICAgICAgICAgICAgd2FybUlkOiBzZWxmLndhcm1JZCB8fCBzZWxmLmNhdGVnb3J5LnNlY29uZGFyaWVzWzBdLndhcm1faWQsXG4gICAgICAgICAgICB3ZWlnaHQ6IHBhcnNlRmxvYXQoc2VsZi53ZWlnaHQpICogc2VsZi5jb252ZXJzaW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgJGh0dHAucG9zdCgnL2NhbGN1bGF0aW9ucycsIGNhbGN1bGF0ZSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgc2VsZi5yZXN1bHQgPSBNYXRoLmZsb29yKE1hdGguYWJzKHJlc3BvbnNlLmRhdGEpICogMTAwMCkgLyAxMDAwO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzYXZlVG9Qcm9qZWN0KCl7XG4gICAgICAgIHZhciBsaW5lSXRlbSA9IHtcbiAgICAgICAgICAgIGNhdGVnb3J5OiBzZWxmLmNhdGVnb3J5LFxuICAgICAgICAgICAgc3ViY2F0ZWdvcnk6IHNlbGYuc3ViY2F0ZWdvcnksXG4gICAgICAgICAgICB3YXJtX0lkOiBzZWxmLndhcm1JZCxcbiAgICAgICAgICAgIHdlaWdodDogcGFyc2VGbG9hdChzZWxmLndlaWdodCkqc2VsZi5jb252ZXJzaW9uLFxuICAgICAgICAgICAgdW5pdHM6IHNlbGYudW5pdC5uYW1lXG4gICAgICAgIH07XG4gICAgICAgIGNvbnNvbGUubG9nKGxpbmVJdGVtKTtcbiAgICAgICAgJGh0dHAucG9zdCgnL2FkZFRvUHJvamVjdCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcXVlcnlTZWFyY2gocXVlcnkpIHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5ID8gc2VsZi5saXN0LmZpbHRlcihjcmVhdGVGaWx0ZXJGb3IocXVlcnkpKSA6IHNlbGYubGlzdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJGb3IocXVlcnkpIHtcbiAgICAgICAgdmFyIGxvd2VyY2FzZVF1ZXJ5ID0gcXVlcnkudG9Mb3dlckNhc2UoKSAvL3F1ZXJ5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcXVlcnkuc2xpY2UoMSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBmaWx0ZXJGbihvYmopIHtcbiAgICAgICAgICAgIHJldHVybiAob2JqLnByaW1hcnlfY2F0LmluZGV4T2YobG93ZXJjYXNlUXVlcnkpICE9IC0xKTtcbiAgICAgICAgfTtcbiAgICB9XG59XSk7XG5cbi8qKlxuICogQURNSU5cbiAqL1xuYXBwLmNvbnRyb2xsZXIoJ2FkbWluQ3RybCcsIFsnJGh0dHAnLCBmdW5jdGlvbiggJGh0dHAgKXtcbiAgICAvLyBJTklUXG4gICAgaW5pdCgpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuc3VnZ2VzdGlvbnMgPSAnJztcbiAgICBzZWxmLm1hcmtDb21wbGV0ZSA9IG1hcmtDb21wbGV0ZTtcblxuICAgIGZ1bmN0aW9uIG1hcmtDb21wbGV0ZSggc3VnZ2VzdGlvbiApIHtcbiAgICAgICAgdmFyIGlkID0gc3VnZ2VzdGlvbi5pZDtcbiAgICAgICAgY29uc29sZS5sb2coaWQpO1xuICAgICAgICAkaHR0cC5wdXQoJy9zdWdnZXN0aW9ucy9jb21wbGV0ZS8nICsgaWQpLnRoZW4oZnVuY3Rpb24oIHJlcyApIHtcbiAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAkaHR0cC5nZXQoJy9zdWdnZXN0aW9ucycpLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIHN1Z2dlc3Rpb25zID0gcmVzLmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdWdnZXN0aW9ucyk7XG4gICAgICAgICAgICBzZWxmLnN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbnM7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XSk7XG5cbi8vIExvZ2luIEhUTUwgLSBLYXRlXG5hcHAuY29udHJvbGxlcignbG9naW5DdHJsJywgWyckc2NvcGUnLCAnJGh0dHAnLCAnYXV0aFNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCBhdXRoU2VydmljZSkge1xuICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgICAgZGF0YTogJHNjb3BlLnVzZXJcbiAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICBhdXRoU2VydmljZS5zYXZlVG9rZW4ocmVzcG9uc2UuZGF0YS50b2tlbik7XG4gICAgICAgIH0pXG4gICAgfVxufV0pO1xuXG4vLyBSZWdpc3RlciBIVE1MIC0gTWFkZWxpbmVcbmFwcC5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50Q3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICRzY29wZS51c2VyID0ge307XG5cbiAgICAkc2NvcGUucHJvY2Vzc0Zvcm0gPSBmdW5jdGlvbiAodXNlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBvc3RpbmcuLi5cIik7XG4gICAgICAgICRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiAnL3JlZ2lzdGVyJyxcbiAgICAgICAgICAgIGRhdGE6ICRzY29wZS51c2VyLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgYWxlcnQoXCJZb3VyIGFjY291bnQgaGFzIGJlZW4gY3JlYXRlZC5cIilcbiAgICAgICAgfSlcbiAgICB9O1xufV0pO1xuXG4vLyBQcm9qZWN0IEhUTUwgLSBEYXNoYm9hcmQgSFRNTCAtIEtpbVxuYXBwLmNvbnRyb2xsZXIoJ3Byb2plY3RzQ3RybCcsIFsnJHNjb3BlJywgJyRodHRwJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgIC8vbG9hZCBwcm9qZWN0IGxpc3Qgb24gcGFnZSBsb2FkXG4gICAgJGh0dHAuZ2V0KCcvcHJvamVjdCcpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAkc2NvcGUucHJvamVjdExpc3QgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAvL3Jlc3BvbnNlLmRhdGEuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgLy8gICAgaXRlbS5wcm9qZWN0X25hbWUgPSBpdGVtLnByaW1hcnlfY2F0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6ICdodHRwOi8vd3d3Lnczc2Nob29scy5jb20vYW5ndWxhci9jdXN0b21lcnMucGhwJ1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICRzY29wZS5uYW1lcyA9IHJlc3BvbnNlLnJlY29yZHM7XG4gICAgfSk7XG5cbn1dKTtcblxuLy8gU2VydmljZXMgZm9yIGF1dGhlbnRpY2F0aW9uXG5hcHAuc2VydmljZSgnYXV0aFNlcnZpY2UnLCBbJyR3aW5kb3cnLCBmdW5jdGlvbiAoJHdpbmRvdyl7XG4gICAgdGhpcy5wYXJzZUp3dCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgIHZhciBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICAgICAgdmFyIGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKCctJywgJysnKS5yZXBsYWNlKCdfJywgJy8nKTtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKCR3aW5kb3cuYXRvYihiYXNlNjQpKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiB7fTtcbiAgICB9O1xuXG4gICAgdGhpcy5zYXZlVG9rZW4gPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0VG9rZW4gPSB0b2tlbjtcbiAgICAgICAgY29uc29sZS5sb2coJ1NhdmVkIHRva2VuOicsJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0VG9rZW4pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFRva2VuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0VG9rZW47XG4gICAgfTtcblxuICAgIHRoaXMuaXNBdXRoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gdGhpcy5wYXJzZUp3dCh0b2tlbik7XG4gICAgICAgICAgICB2YXIgbm90RXhwaXJlZCA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA8PSBwYXJhbXMuZXhwO1xuICAgICAgICAgICAgaWYgKCFub3RFeHBpcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dvdXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub3RFeHBpcmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxldGUgJHdpbmRvdy5sb2NhbFN0b3JhZ2Uuand0VG9rZW47XG4gICAgfTtcblxuICAgIC8vIGV4cG9zZSB1c2VyIGFzIGFuIG9iamVjdFxuICAgIHRoaXMuZ2V0VXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VKd3QodGhpcy5nZXRUb2tlbigpKVxuICAgIH07XG59XSk7XG5cbmFwcC5mYWN0b3J5KCdhdXRoSW50ZXJjZXB0b3InLCBbJyRxJywgJyRsb2NhdGlvbicsICdhdXRoU2VydmljZScsIGZ1bmN0aW9uICgkcSwgJGxvY2F0aW9uLCBhdXRoU2VydmljZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICBpZiAoYXV0aFNlcnZpY2UuaXNBdXRoZWQoKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyBhdXRoU2VydmljZS5nZXRUb2tlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEpIHtcblxuICAgICAgICAgICAgICAgIC8vIGhhbmRsZSB0aGUgY2FzZSB3aGVyZSB0aGUgdXNlciBpcyBub3QgYXV0aGVudGljYXRlZFxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2xvZ2luXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8ICRxLndoZW4ocmVzcG9uc2UpO1xuICAgICAgICB9LCByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2xvZ2luXCIpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcbn1dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
