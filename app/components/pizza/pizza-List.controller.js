(function () {
   angular
      .module('pizzaModule.pizza')
      .controller('PizzaListController',PizzaListController);

      PizzaListController.$inject = ['PizzaService','$window','$state','pizzas'];
      function PizzaListController (PizzaService,$window,$state,pizzas) {
         var plc = this;

         plc.pizzas = pizzas.data;

         plc.page = 1;
         plc.pageSize = 5;
         plc.sortCriteria = '';
         plc.sortDirection = "desc";
         // function to call data from server
         function getPizzas () {
         // server filter related parameters
            var getParams = {
               sort : plc.sortCriteria,
               sortDirection : plc.sortDirection,
               page : plc.page,
               pageSize : plc.pageSize
            };
            PizzaService.getAllPizzas(getParams).then(onSuccessfulCallback, onFailedCallback);
         }
         getPizzas();
         // resolve for promise
         function onSuccessfulCallback (response) {
            plc.pizzas = response.data.results;
            pagination(response.data.count);
         }
         function onFailedCallback (reason) {
            $window.alert("Error " + reason.statusText);
         }

         // adjusting pagination if number of pizzas available for order change
         function pagination (noPizzas) {
            plc.noPages = Math.ceil(noPizzas / plc.pageSize);
            if (plc.noPages === 0) {
               plc.noPages = 1;
            }
         }
         // changing page, test if there is another way to do it
         plc.changePage = function (page) {
            plc.page = page;
            getPizzas();
         };
         // watching changes in sort and modifying accordingly,dont thing that is needed
         /*$scope.$watch('plc.sort', function(newValue, oldValue) {
            if (newValue !== oldValue) {
               plc.sortDirection = "asc";
               getPizzas();
            }
         });*/

         //sort for price doesn't work good, sort's somewhat randomly but for grade works as it's supposed to work
         plc.sort = function (criteria) {
            if (criteria === plc.sortCriteria) {
               plc.sortDirection = plc.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
               plc.sortCriteria = criteria;
               plc.sortDirection = 'asc';
            }
            getPizzas();
         };
         // clicking on single pizza changes state and view to pizza-form
         plc.order = function (id) {
            $state.go('main.orderPizza', {PizzaId: id});
         };

      }
})();