





//Add food to firebase
// update food to firebase
// remove food from firebase

var app = angular.module("Food_Order", ["firebase"]);
app.controller("FoodManageCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://testfoodorder.firebaseio.com/Store/Foods/");
  $scope.listFood = $firebaseArray(ref);

  $scope.listFood.$loaded()
      .then(function() {
    console.log($scope.listFood);
   });


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
     $scope.foodDetail = foodItem.detail;
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
    if($scope.foodImage == "" || $scope.foodPrice== "" || $scope.foodDetail== "" ||$scope.foodName==""){
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
       detail: $scope.foodDetail,
       foodImage: $scope.foodImage
     },onComplete);

     
     // xoá thông tin nhâp liệu
    $scope.foodPrice = "";
    $scope.foodName = "";
    //$scope.foodType = "";
    $scope.foodImage = "";
    $scope.foodDetail = "";
  }

  // putting a console.log here won't work, see below
 });











