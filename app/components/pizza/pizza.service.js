(function () {
   angular
      .module('pizzaModule.pizza')
      .factory('PizzaService',PizzaService);

      PizzaService.$inject = ['$http'];
      function PizzaService ($http) {
         var urlPizzas = 'http://localhost:3000/api/pizzas' ;
         var urlOrders = 'http://localhost:3000/api/orders';

         var value = {
            getAllPizzas : getAllPizzas,
            getSinglePizza : getSinglePizza,
            addOrder : addOrder,
         };
         function getAllPizzas (params) {
            return $http.get(urlPizzas, {params : params});
         }
         function getSinglePizza (id) {
            return $http.get(urlPizzas + "/" + id);
         }
         function addOrder (order) {
            return $http.post(urlOrders, order);
         }

         return value;
         //Later need to add ngResource for calling pizza list and update function to update order
      }
})();