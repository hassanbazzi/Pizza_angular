(function () {
   angular
      .module('pizzaModule.pizza')
      .controller('OrderFormController', OrderFormController);

      OrderFormController.$inject = ['PizzaService','$state','$window','pizzas'];

      function OrderFormController (PizzaService,$state,$window,pizzas,pizza) {
         var ofc = this;

         ofc.pizza = pizza.data;
         ofc.pizzas = pizzas.data.results;

         ofc.submit = function () {
            PizzaService.addOrder(ofc.pizza).then(onSuccess, onFail);
         };

         function onSuccess () {
            $state.go("main.home");
         }
         function onFail (reason) {
            $window.alert("Error adding order, " + reason.statusText);
         }
      }
})();