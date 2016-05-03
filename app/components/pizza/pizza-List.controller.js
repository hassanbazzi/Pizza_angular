(function () {
   angular
      .module('pizzaModule.pizza')
      .controller('PizzaListController',PizzaListController);

      PizzaListController.$inject = ['PizzaService','$window'];
      function PizzaListController (PizzaService,$window) {
         var plc = this;

         PizzaService.getAllPizzas().then(onSuccessfulCallback, onFailedCallback);

         function onSuccessfulCallback (response) {
            plc.pizzas = response.data.results;
         }
         function onFailedCallback (reason) {
            $window.alert("Error " + reason.statusText);
         }

      }
})();