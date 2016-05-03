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
                  controllerAs: "plc"
               }
            }
         })
         .state("main.order",{
            url: "/order",
            views: {
               "content@": {
                  templateUrl: "./app/components/pizza/order-form.html"
               }
            }
         });
   }
})();