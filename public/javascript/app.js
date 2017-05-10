var app = angular.module('CartApp',[]);

app.controller('CartCtrl', function($scope) {
  $scope.selectedCustomer;
  $scope.cart = []
  $scope.total = 0;
  $scope.totalItem = 0;
  $scope.products = [
    {
      id: 'classic',
      name: 'Classic Ad',
      price: 269.99,
      description: ['Basic level of advertisement']
    },
    {
      id: 'standout',
      name: 'Standout Ad',
      price: 322.99,
      description: ['Allows company logo','Longer presentation text']
    },
    {
      id: 'premium',
      name: 'Premium Ad',
      price: 394.99,
      description: ['Allows company logo','Longer presentation text','Top results','Higher visibility']
    }
  ];
  $scope.customers = ['NORMAL GUEST','APPLE','FORD','NIKE','UNILEVER'];

  $scope.addItemToCart = function(product) {

    $scope.total = 0;

    if ($scope.cart.length === 0){
      product.count = 1;
      switch($scope.selectedCustomer) {
        case 'APPLE': {
            if(product.id == 'standout') {
              product.price = 299.99              
            }
          break;
        }
        case 'FORD': {
          if(product.id == 'standout') {
            product.price = 309.99            
          }
          break;
        }
      }
      $scope.cart.push(product);
    } else {
      var repeat = false;
      for(var i = 0; i< $scope.cart.length; i++){
        if($scope.cart[i].id === product.id){
          repeat = true;
          $scope.cart[i].count +=1;
        }
        switch($scope.selectedCustomer) {
          case 'NIKE': {
            if ($scope.cart[i].id === 'premium') {              
              if ($scope.cart[i].count >= 4) {
                $scope.cart[i].price = 379.99
              } else {
                $scope.cart[i].price = 394.99
              }
            }
            break;
          }
          case 'FORD': {
            if ($scope.cart[i].id === 'premium') {              
              if ($scope.cart[i].count >= 3) {
                $scope.cart[i].price = 389.99
              } else {
                $scope.cart[i].price = 394.99
              }
            }
            if ($scope.cart[i].id === 'classic') {              
              if ($scope.cart[i].count > 4) {
                $scope.cart[i].free_deal = parseInt($scope.cart[i].count/4)
              } else if ($scope.cart[i].count == 4) {
                $scope.cart[i].free_deal = 1
              }
            }
            break;
          }
          case 'UNILEVER': {
            if ($scope.cart[i].id === 'classic') {              
              if ($scope.cart[i].count > 2) {
                $scope.cart[i].free_deal = parseInt($scope.cart[i].count/2)
              } else if ($scope.cart[i].count == 2) {
                $scope.cart[i].free_deal = 1
              }
            }
            break;
          }
        }
      }
      if (!repeat) {
        product.count = 1;
        switch($scope.selectedCustomer) {
          case 'APPLE': {
              if(product.id == 'standout') {
                product.price = 299.99              
              }
            break;
          }
          case 'FORD': {
            if(product.id == 'standout') {
              product.price = 309.99            
            }
            break;
          }
        }
        $scope.cart.push(product);  
      }
    }
    $scope.totalItem++;  
    for (var i = 0; i< $scope.cart.length; i++) {
      $scope.total += parseFloat($scope.cart[i].count*$scope.cart[i].price);
    } 

    console.log($scope.cart);
  }

  $scope.removeItemCart = function(product){

    $scope.total = 0;
       
    if(product.count > 1){
      product.count -= 1;
    } else if(product.count === 1){
      var index = $scope.cart.indexOf(product);
      $scope.cart.splice(index, 1);         
    }
    for (var i = 0; i< $scope.cart.length; i++) {
      switch($scope.selectedCustomer) {
        case 'FORD': {
          if ($scope.cart[i].id === 'classic') {              
            if ($scope.cart[i].count > 4) {
              $scope.cart[i].free_deal = parseInt($scope.cart[i].count/4)
            } else if ($scope.cart[i].count == 4) {
              $scope.cart[i].free_deal = 1
            } else {
              $scope.cart[i].free_deal = 0
            }
          }
          break;
        }
        case 'UNILEVER': {
          if ($scope.cart[i].id === 'classic') {              
            if ($scope.cart[i].count > 2) {
              $scope.cart[i].free_deal = parseInt($scope.cart[i].count/2)
            } else if ($scope.cart[i].count == 2) {
              $scope.cart[i].free_deal = 1
            } else {
              $scope.cart[i].free_deal = 0
            }
          }
          break;
        }
      }
      $scope.total += parseFloat($scope.cart[i].count*$scope.cart[i].price);
    } 

    $scope.totalItem--; 
       
  }

  $scope.cartItem = function(){
    if($scope.totalItem >= 1) {
      return true;
    } else {
      return false;
    }
  }

})
