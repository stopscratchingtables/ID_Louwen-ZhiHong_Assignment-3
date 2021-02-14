$( document ).ready(function() {
    var cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);
    function DisplayCartItems(cartItems) {
        if (cartItems != null) {
            for (var i = 0; i < cartItems.length; i++){
                var cartAppend = $(".cartAppend")
                    $(".cartAppend").append(`
                    <div class="row">
                    <div class="col-12 col-sm-5">
                    <img src="${cartItems[i].img}" class="img-fluid" alt="">
                    </div>
                    <div class="col">
                    <h1 class="mt-5"> ${cartItems[i].title} </h1>
                    <h5> QTY: </h5>
                    </div>
                    <div class="row">
                    <div class="col">
                    <h4 class="d-flex justify-content-end me-5 mt-3 mb-3">Amount: $<span class="cartPrice">${cartItems[i].price}</span></h4>
                    </div>
                    </div>
                    </div>
                    `);
            }
        }
      }
      function CalcCartTotal(cartItems) {
          var sum = 0
        $(".cartPrice").each(function(){
            sum += parseFloat($(this).html());
          });
          $(".cartTotal").html(sum);
      }
      DisplayCartItems(cartItems); 
      CalcCartTotal(cartItems);  
});
//d-flex justify-content-end me-5 mt-3 mb-3