(function () {
   angular
      .module('pizzaModule.pizza')
      .config(config);

   config.$inject = ["$stateProvider"];
   function config ($stateProvider) {
      $stateProvider
         .state("main.pizzas",{
            url: "/pizzas",
            views: {
               "content@": {
                  templateUrl: "./app/components/pizza/pizza-list.html",
                  controller: "PizzaListController",
                  controllerAs: "plc",
                  resolve: {
                     pizzas : getPizzas
                  }
               }
            }
         })
         .state("main.order",{
            url: "/order",
            views: {
               "content@": {
                  templateUrl: "./app/components/pizza/order-form.html",
                  controller: "OrderFormController",
                  controllerAs: "ofc",
                  resolve: {
                     pizzas : getPizzas,
                     pizza : function () {
                        return {};
                     }
                  }
               }
            }
         })
         .state("main.orderPizza", {
            url: "/order/:PizzaId",
            views: {
               "content@": {
                  templateUrl: "./app/components/pizza/order-form.html",
                  controller: "OrderFormController",
                  controllerAs: "ofc",
                  resolve: {
                     pizzas : getPizzas,
                     pizza : getSinglePizza
                  }
               }
            }
         });
         // learn how to $timeout properly (tried return $timeout ....pizzaService.get......)
         function getPizzas (PizzaService) {
            return PizzaService.getAllPizzas();
         }
         function getSinglePizza (PizzaService,$stateParams){
            return PizzaService.getSinglePizza($stateParams.PizzaId);
         }

   }
})();