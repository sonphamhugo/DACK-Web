





//Add food to firebase
// update food to firebase
// remove food from firebase

var app = angular.module("Food_Order", ["firebase", "ui-notification", "ngStorage"]);
//app.factory('countOfcart', function() {
//    return {
//        num : 0
//    };
//});
app.controller("FoodManageCtrl", function($scope, $firebaseArray, Notification, $localStorage) {
  var ref = new Firebase("https://testfoodorder.firebaseio.com/Store/Foods/");
  $scope.listFood = $firebaseArray(ref);
    //$localStorage.$reset();
    $scope.$storage = $localStorage.$default({cart: 0});
    $scope.$storage = $localStorage.$default({cp: []});
  $scope.listFood.$loaded()
      .then(function() {
    if($scope.$storage.cp.length === 0)
    {   angular.copy($scope.listFood, $scope.$storage.cp);
        angular.forEach($scope.$storage.cp, function(value, key){
            //console.log(key + ': ' + value.Name);
            value.isSale = 0;
        });
    console.log($scope.$storage.cp); 
    }
    
      
   });
    //$localStorage.$reset();
  $scope.typeBreakfast = false;
  $scope.typeLunch = false;
  $scope.typeDinner = false;
  $scope.isSale = false;




  $scope.updateFood = function(foodItem)
  {
     $scope.foodImage = foodItem.foodImage;
     $scope.foodPrice = foodItem.foodPrice;
     $scope.foodName = foodItem.$id;
     $scope.typeBreakfast = foodItem.breakfast;
     $scope.typeLunch = foodItem.luch;
     $scope.typeDinner = foodItem.dinner;
     $scope.isSale = foodItem.isSale;

  }

  $scope.removeFood = function(foodItem)
  {
     var deleteUser =window.confirm('Bạn có thật sự muốn xoá món ăn này không?');

    if (deleteUser) {
     // window.alert('Xoá thành công');

    ref.child(foodItem.$id).remove();
    }
  }



  //Kiểm tra dữ liệu đầu vào.
  $scope.isValidInput = function(){
    //Nếu có bất kì trường nào trống thì fail.
    if($scope.foodImage == "" || $scope.foodPrice== "" ||$scope.foodName==""){
      return false;
    }

    //Bắt buộc phải check ít nhất một type
    if($scope.typeBreakfast==false && $scope.typeLunch==false && $scope.typeDinner==false){
      return false;
    }
    //Tiền phải là số nguyên
    if(typeof $scope.foodPrice!="number"){
      return false;
    }

    return true;
  }


  $scope.existFood = function(ref,name){
      if(ref[name]){
        return true;
      }else{
        return false;
      }
  }


  $scope.getFoodType=  function(foodItem){
    var result = "";
    if(foodItem.breakfast==true){
      result+= "Sáng"; 
    }
    if(foodItem.luch==true){
      if(result!="")
        result+=", ";
      result+= "Trưa"; 
    }
    if(foodItem.dinner==true){
      if(result!="")
        result+=", ";
      result+= "Chiều"; 
    }
      return result;
  }


  $scope.getFoodState=  function(foodItem){
    if(foodItem.isSale==true){
      return "Đang bán"
    }
    return "Không bán"; 
  }


  $scope.addFood = function()
  {
    //Kiểm tra dữ liệu đầu vào.
    if($scope.isValidInput()==false){
        window.alert("Vui lòng kiểm tra lại thông tin trước khi thêm vào"); 
        return;
    }


    // Sự kiện khi add xong một phần tử.
    var onComplete = function(error) {
      if (error) {
        alert('Có lỗi xảy ra. Vui lòng kiểm tra lại');
      } else {
        //$scope.clearInputForm();
        //alert('Đã nhập thành công món ăn này');
      }
    };

      //Add một phần tử vào database
     ref.child($scope.foodName).set({
       foodPrice: $scope.foodPrice,
       breakfast: $scope.typeBreakfast,
       luch: $scope.typeLunch,
       dinner: $scope.typeDinner,
       isSale: $scope.isSale,

       foodImage: $scope.foodImage
     },onComplete);

     
     // xoá thông tin nhâp liệu
    $scope.foodPrice = "";
    $scope.foodName = "";
    //$scope.foodType = "";
    $scope.foodImage = "";
  }

  // putting a console.log here won't work, see below
  
  //add to cart
    $scope.success = function(id) {        
        $scope.$storage.cart++;
        $scope.$storage.cp[id].isSale = $scope.$storage.cart;
        //console.log($scope.$storage.cp);
        Notification.info({message: 'Đã thêm vào giỏ hàng!', delay: 1500});
    };
    // change count of cart
    $scope.change1 = function(id) {
		
		if(!isFinite($scope.$storage.cart))
			Notification.error({message: "Giá trị ở ô Số thứ nhât không phải là số", delay: 2000});
		else
            {
			     
                  $scope.$storage.cp[id].isSale = $scope.$storage.cart;              
            }
		
		if(angular.isUndefined($scope.$storage.cart))
            Notification.error({message: "Chưa nhập giá trị ô Số thứ nhất", delay: 2000});	
	};
    //sum
    $scope.sum = function() {
        var sumt = 0;
        angular.forEach($scope.$storage.cp, function(value, key){
            //console.log(key + ': ' + value.Name);
            if(value.isSale > 0)
            {
                sumt = sumt + (value.foodPrice*value.isSale);
            }
        });
        return sumt;
    }
 });











