'use strict';

/**
 * @ngdoc function
 * @name sampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleApp
 */
angular.module('sampleApp')
  .controller('MainCtrl', function ($scope, $http, $location, gamearts, currProduct, codejob, ourpets, iph) {
      $scope.category=1;
      $scope.products = gamearts.get_gamearts_products().query();
      $scope.Top5Games = gamearts.get_gamearts_top5_products().query();


      $scope.get_gamearts_products = function() {
          $scope.category = 1;
          //console.log($scope.category);
          $scope.products = gamearts.get_gamearts_products().query();
      };

      $scope.get_gamearts_products_by_id = function() {
          $scope.products = {};
          var id = 1;
          $scope.products = gamearts.get_gamearts_products_by_ID(id).query();
      };

      //start pets


      $scope.Top5Pets= ourpets.get_ourpets_top5_products().query();
      $scope.get_ourpets_products = function() {
          $scope.category = 2;
          //console.log($scope.category);
          $scope.products =ourpets.get_ourpets_products().query();
      };

      $scope.get_ourpets_products_by_id = function() {
          $scope.products = {};
          var id = 1;
          $scope.products = ourpets.get_ourpets_products_by_ID(id).query();
      };
      //end pets


      //add codejob
      $scope.Top5Jobs= codejob.get_codejob_top5_products().query();
      $scope.get_codejob_products = function() {
          $scope.category = 3;
          //console.log($scope.category);
          $scope.products = codejob.get_codejob_products().query();
      };

      $scope.get_codejob_products_by_id = function() {
          $scope.products = {};
          var id = 1;
          $scope.products = codejob.get_codejob_products_by_ID(id).query();
      };
      //end of codejob



      //start iph
      $scope.Top5Iph= iph.get_iph_top5_products().query();
      $scope.get_iph_products = function() {
          $scope.category = 4;
          $scope.products =iph.get_iph_products().query();
      };

      $scope.get_iph_products_by_id = function() {
          $scope.products = {};
          var id = 1;
          $scope.products = iph.get_iph_products_by_ID(id).query();
      };
      //end iph


      $scope.showProductDetail = function (productId) {
          currProduct.currProduct = $scope.products[productId - 1];
          if ($scope.category === 1)
          {
              gamearts.update_gamearts_product_clickcount(productId).query();
          }
          else if ($scope.category === 2)
          {
              ourpets.update_ourpets_product_clickcount(productId).query();
          }
          else if ($scope.category === 3)
          {
              codejob.update_codejob_product_clickcount(productId).query();
          }
          else if ($scope.category === 4)
          {
              iph.update_iph_product_clickcount(productId).query();
          }
          //alert(currProduct.currProduct.productName);
          $location.path("/product/"+ $scope.category);
      };


      $scope.totalProducts = [];

      $scope.Top5Games = gamearts.get_gamearts_top5_products().query(function(data) {
          for(var i = 0; i < 5; i++)
          {

              $scope.totalProducts.push(data[i]);
          }
      });
      $scope.Top5Pets = ourpets.get_ourpets_top5_products().query(function(data) {
          for(var i = 0; i < 5; i++)
          {
              $scope.totalProducts.push(data[i]);
          }
      });
      $scope.Top5Jobs = codejob.get_codejob_top5_products().query(function(data) {
          for(var i = 0; i < 5; i++)
          {
              $scope.totalProducts.push(data[i]);
          }
      });
      $scope.Top5Iphs = iph.get_iph_top5_products().query(function(data) {
          for(var i = 0; i < 5; i++)
          {
              $scope.totalProducts.push(data[i]);
          }
      });

      $scope.orderByFunction = function(top5){
          return parseInt(-top5.clickcount);
      };
  }) // end of MainCtrl


  .controller('ProductCtrl', function ($http, $scope, $sce, currProduct, cart, $routeParams, productReviewRating) {
      $scope.product = currProduct.currProduct;
      $scope.quantity = 1;
      $scope.category = $routeParams.category;
      //$scope.rating = $scope.getProductRating;
      //console.log("rating:"+$scope.rating);


      $scope.description = $sce.trustAsHtml($scope.product.description);
      //console.log("category is " + $scope.category);

      $scope.addProductToCart = function () {
          cart.addToCart({name:$scope.product.productName, quantity:$scope.quantity, price:$scope.product.price, img:$scope.product.productImg});
      };

      $scope.getProductRating = function () {
          var productRating = productReviewRating.getProductRating($scope.category, $scope.product.id).query(function() { //$scope.encryptionMsg
              var pr = productRating[0];
              //console.log("get-return-rating"+pr.avg_rating);
              //console.log(pr.category);
              $scope.rating = pr.avg_rating;
          });
      };

      $scope.getProductReview = function () {
          $scope.productReviews = productReviewRating.getProductReview($scope.category, $scope.product.id).query();//(function() { //$scope.encryptionMsg
          //var prw = productReview;
          //console.log("get-return-rating"+pr.avg_rating);
          //console.log(prw.username);
          //$scope.rating = pr.avg_rating;
          //$scope.username = prw.username;
          //$scope.comments = prw.comments;
      };

      $scope.updateProductRating = function () {
          $scope.productReviews = productReviewRating.updateProductRating($scope.category, $scope.product.id, $scope.addReviewRating).query();//(function() { //$scope.encryptionMsg
          //var prw = productReview;
          //console.log("get-return-rating"+pr.avg_rating);
          //console.log(prw.username);
          //$scope.rating = pr.avg_rating;
          //$scope.username = prw.username;
          //$scope.comments = prw.comments;
      };

      //$scope.postProductReview = function () {
          //$scope.addReview = {};
          // productReviewRating.postProductReview($scope.addReviewUsername, $scope.category, $scope.product.id,
              //$scope.addReviewEmail, $scope.addReviewComments, $scope.addReviewRating).query();//(function() { //$scope.encryptionMsg
          //productReviewRating.postProductReview($scope.category, $scope.product.id, $scope.addReviewUsername, $scope.addReviewEmail, $scope.addReviewComments, $scope.addReviewRating).query();
          //var prw = productReview;
          //console.log("get-return-rating"+pr.avg_rating);
          //console.log(prw.username);
          //$scope.rating = pr.avg_rating;
          //$scope.username = prw.username;
          //$scope.comments = prw.comments;
      //};


      $scope.submitForm = function() {
          var data = new Object();
          data.username = $scope.addReviewUsername;
          data.email = $scope.addReviewEmail;
          data.category = $scope.category;
          data.product_id = $scope.product.id;
          data.comments = $scope.addReviewComments;
          data.rating = $scope.addReviewRating;
          var jdata = JSON.stringify(data);
          //console.log(jdata);
          // Posting data
          $http({
              method  : 'POST',
              url     : 'http://www.codejob.tech/postProductReview.php?',
              data    : jdata, //forms user object
              headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
          })
              .success(function(data) {
                  if (data.errors) {
                      // Showing errors.
                      $scope.errorName = data.errors.name;
                      $scope.errorUserName = data.errors.username;
                      $scope.errorEmail = data.errors.email;
                  } else {
                      $scope.message = data.message;
                  }
              });
      };


  })

  .controller('CartCtrl', function ($scope, cart) {
      $scope.productCart = cart.getCart();
  })

  .controller('LoginCtrl', function ($scope, md5, userAuth) {
      $scope.checkbox = true;

      $scope.login = function () {
          if ($scope.presentusername === undefined)
          {
              alert('Username can not be null');
              return;
          }

          if ($scope.presentpassword === undefined)
          {
              alert('Password can not be null');
              return;
          }
          $scope.encryptionMsg = md5.createHash($scope.presentpassword);

          var loginSuccess = userAuth.login($scope.presentusername, $scope.encryptionMsg).query(function() { //$scope.encryptionMsg
              var ls = loginSuccess[0];
              //console.log(ls);
              if (ls.result === 1) {
                  return alert('Login success');
              }
              else {
                  return alert('Login fail');
              }
          });


          console.log('encryption password is ' + $scope.encryptionMsg);
      };

      $scope.registerNewUser = function () {
          if ($scope.newusername === undefined)
          {
              alert('Username can not be null');
              return;
          }

          if ($scope.newpassword === undefined)
          {
              alert('Password can not be null');
              return;
          }
          $scope.encryptionMsg = md5.createHash($scope.newpassword);

          var registerSuccess = userAuth.registerNewUser($scope.newusername, $scope.encryptionMsg).query(function() {
              var rs = registerSuccess[0];
              //console.log(rs);
              if (rs.result === 1) {
                  return alert('Register success');
              }
              else {
                  return alert('Register fail');
              }
          });
          console.log('encryption password is ' + $scope.encryptionMsg);
      };
  })

  .controller('fbLoginCtrl',function($scope) {
    $scope.fbLogin = function() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    $scope.loginname = response.name;
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        });
    };
    console.log($scope.fbLogin);
})