(function () {
   angular
      .module('pizzaModule.pizza')
      .controller('OrderFormController', OrderFormController);

      OrderFormController.$inject = ['PizzaService','$state','$window','pizzas','pizza'];

      function OrderFormController (PizzaService,$state,$window,pizzas,pizza) {
         var ofc = this;

         ofc.pizzas = pizzas.data.results;

         ofc.pizzas.forEach( function(value, key){
           if(value._id == pizza.data._id)
            ofc.preloadedKey = key;
         }
       );



         ofc.submit = function () {
            PizzaService.addOrder(ofc.order.pizza).then(onSuccess, onFail);
         };

         function onSuccess () {
            $state.go("main.home");
         }
         function onFail (reason) {
            $window.alert("Error adding order, " + reason.statusText);
         }
      }
})();
