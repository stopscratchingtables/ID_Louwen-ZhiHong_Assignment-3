  // Vouchers Display
  // LOUWEN ADDED THIS

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://studentcrud-a7cf.restdb.io/rest/nonego-vouchers",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5ffd5eb61346a1524ff12901",
      "cache-control": "no-cache"
    }
  };
  
  $.ajax(settings).done(function (response) {
    // Delta
    if (localStorage.getItem("userPoints") < 300)
    {
        for (let i = 0; i < response.length; i++)
        {
            if (response[i].voucherMinPoints < 300 && response[i].voucherMinPoints <= localStorage.getItem("userPoints"))
            {
                var v = document.getElementById("vchrTypes");
                v.innerHTML += `
                
                <div class="vchr row pt-5" style="justify-content: center;">
    
                <div class="col-sm-6 mb-5" style="width: 75%;">
                  <div class="card bg-ash">
                    <div class="card-body" style="margin-top: 75px;">
                      <h5 class="card-title">${response[i].voucherName}</h5>
                      <p class="card-text">${response[i].voucherDesc} <br> Voucher Value: ${response[i].voucherValue}%</p>
                      <button onclick="ApplyVcherButton(${response[i].voucherValue}, ${response[i].voucherMinValue}, '${response[i].voucherName}')" value="${response[i].voucherValue}" class="btn btn-primary vouchButton">Apply Voucher</button>
                    </div>
                  </div>
                </div>
              </div>
    
                `;
            }
        }
    }
    else if (localStorage.getItem("userPoints") >= 300)
    {
        for (let i = 0; i < response.length; i++)
        {
            if (response[i].voucherMinPoints >= 300)
            {
              if (response[i].voucherMinPoints <= localStorage.getItem("userPoints"))
              {
                  var v = document.getElementById("vchrTypes");
                  v.innerHTML = `
                  
                  <div class="vchr row" style="justify-content: center;">
      
                  <div class="col-sm-6">
                    <div class="card">
                      <div class="card-body" style="margin-top: 75px;">
                        <h5 class="card-title">${response[i].voucherName}</h5>
                        <p class="card-text">${response[i].voucherDesc} <br> Voucher Value: ${response[i].voucherValue}%</p>
                        <button onclick="ApplyVcherButton(${response[i].voucherValue}, ${response[i].voucherMinValue}, '${response[i].voucherName}')" value="${response[i].voucherValue}" class="btn btn-primary vouchButton">Apply Voucher</button>
                      </div>
                    </div>
                  </div>
      
                </div>
                  `;
              }
            }
        }

    }
    else if (localStorage.getItem("userPoints") >= 900)
    {
        rangeMax = 100000000;
        rangeMin = 900;
        for (let i = 0; i < response.length; i++)
        {
            if (response[i].voucherMinPoints < rangeMax && response[i].voucherMinPoints <= localStorage.getItem("userPoints"))
            {
                var v = document.getElementById("vchrTypes");
                v.innerHTML = `
                
                <div class="vchr row" style="justify-content: center;">
    
                <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body" style="margin-top: 75px;">
                      <h5 class="card-title">${response[i].voucherName}</h5>
                      <p class="card-text">${response[i].voucherDesc} <br> Voucher Value: ${response[i].voucherValue}%</p>
                      <button onclick="ApplyVcherButton(${response[i].voucherValue}, ${response[i].voucherMinValue}, '${response[i].voucherName}')" value="${response[i].voucherValue}" class="btn btn-primary vouchButton">Apply Voucher</button>
                    </div>
                  </div>
                </div>
    
              </div>
    
                `;
            }
        }
    } 

  });

function ApplyVcherButton(value,minValue,vTitle)
{
  var cartTotal = parseFloat($(".cartTotal").text());
  if (cartTotal < minValue) {
    alert("Total Amount is too little please buy more stuff");
  }
  else {
    var newCartTotal = cartTotal - (cartTotal * value/100);
    $(".cartTotal").text(newCartTotal);
    $(".vouchButton").prop("disabled", true);
    $(".modal").fadeIn();
    $(".modal").fadeOut(1000);
    $(".vouchName").text(vTitle);
  }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
// ORIGINAL CARTSCRIPT.JS CODE
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////

$( document ).ready(function() {
    var cartItems = localStorage.getItem("cartItem");
    cartItems = JSON.parse(cartItems);
    //display cartitems by getting the info from local storage
    function DisplayCartItems(cartItems) {
        if (cartItems != null) {
            for (var i = 0; i < cartItems.length; i++){
                var cartAppend = $(".cartAppend");
                    $(".cartAppend").append(`
                    <div class="itemContainer">
                    <div class="row">
                    <div class="col-12 col-sm-5">
                    <img src="${cartItems[i].img}" class="img-fluid" alt="">
                    </div>
                    <div class="col">
                    <h1 class="mt-5 itemTitle"> ${cartItems[i].title} </h1>
                    <div class="col d-flex justify-content-center">
                    <h5> QTY&nbsp;&nbsp;</h5>
                    <div class="quantity">
                    <ion-icon class="minButton" name="remove-circle"></ion-icon><span class="qty ms-1">1</span>
                    <ion-icon class="plusButton" name="add-circle"></ion-icon>
                    </div>
                    </div>
                    <button type="button" class="btn btn-danger remove">Remove</button>
                    </div>
                    <div class="row">
                    <div class="col">
                    <h4 class="d-flex justify-content-end me-5 mt-3 mb-3">Amount: $<span class="cartPrice">${cartItems[i].price}</span></h4>
                    </div>
                    </div>
                    </div>
                    </div>
                    `);
            }
        }
      }
      //gets the price of item from local storage 
      function GetItemPrice(title, list) {
        if (list != null) {
          for (var i = 0; i < list.length; i++) {
              if (list[i].title == title) {
                  return list[i].price;
              }
          }
        }
    }
      function CalcItemTotal() {
          $(".minButton").each(function(){
              $(this).click(function(){
                  if ((parseInt($(this).next("span").text())) - 1 == 0) {
                      alert("Item cannot be less than zero");
                  }
                  else {
                    var itemName = $(this).parent().parent().parent().parent().find(".itemTitle").text();
                    var trimItemName = $.trim(itemName); 
                    var cartPrice = parseFloat($(this).parent().parent().parent().parent().find(".cartPrice").text());
                    var qty = parseInt($(this).next("span").text());
                    qty -= 1;
                    var newCartPrice = GetItemPrice(trimItemName, cartItems) * qty;
                    $(this).next("span").text(qty);
                    $(this).parent().parent().parent().parent().find(".cartPrice").text(newCartPrice);
                    CalcCartTotal();
                  }
              });
          });
          $(".plusButton").each(function(){
            $(this).click(function(){
                var itemName = $(this).parent().parent().parent().parent().find(".itemTitle").text();
                var trimItemName = $.trim(itemName);
                var qty = parseInt($(this).parent().find(".qty").text());
                qty += 1;
                var newCartPrice = GetItemPrice(trimItemName, cartItems) * qty;
                $(this).parent().find(".qty").text(qty);
                $(this).parent().parent().parent().parent().find(".cartPrice").text(newCartPrice);
                CalcCartTotal();
            });
        });
      }
      function CalcCartTotal() {
          var sum = 0;
        $(".cartPrice").each(function(){
            sum += parseFloat($(this).html());
          });
          $(".cartTotal").html(sum);
          return sum;
      }
      function RemoveItem() {
          $(".remove").each(function(){
              $(this).click(function(){
                  $(this).parent().parent().remove();
                  CalcCartTotal();
              });
          });
      }
      function Purchase() {
          $(".purchase").click(function(){
            var totalItems = 0;
            $(".qty").each(function(){
            totalItems += parseFloat($(this).html());
          });
          AddToken(totalItems);
          alert(("your purchase of $" + $(".cartTotal").text() + " is succesful"));
          $(".itemContainer").remove();
          CalcCartTotal();
          localStorage.removeItem("cartItem");
        });
      }
      $(".modal").hide();
      DisplayCartItems(cartItems);
      RemoveItem(); 
      CalcItemTotal();
      CalcCartTotal();  
      Purchase();
});


// LOUWEN ADDED THIS 
function AddToken(itemPurchasedAmt)
{

    var jsondata = {
        "friendsList": localStorage.getItem("friendsList"),
        "userAvatar": localStorage.getItem("userAvatar"),
        "userMembership": localStorage.getItem("userMembership"),
        "userPoints": localStorage.getItem("userPoints"),
        "useremail": localStorage.getItem("userName"),
        "userpass": localStorage.getItem("userPass"),

        // This row will be affected
        "userTokens": parseInt(localStorage.getItem("userTokens")) + parseInt(itemPurchasedAmt),
        };
        var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://studentcrud-a7cf.restdb.io/rest/nonegoidassignment/" + localStorage.getItem("userID"),
        "method": "PUT",
        "headers": {
        "content-type": "application/json",
        "x-apikey": "5ffd5eb61346a1524ff12901",
        "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        };

    $.ajax(settings).done(function (response) {
        // REFRESHES NEW DATA INTO LOCAL STORAGE
        refreshData();
        alert("Refresh to get updated details");
    });

}