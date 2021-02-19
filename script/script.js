function inProgress(){

    alert("This Feature is yet to be implemented");

}

// Check Membership
function refreshImage(imgElement, imgURL){    
    // create a new timestamp 
    var timestamp = new Date().getTime();  
  
    var el = document.getElementById(imgElement);  
  
    var queryString = "?t=" + timestamp;    
  
    return el.src = imgURL + queryString;    
} 

function checkMembership(points)
{
    if (points < 300)
    {
        return "Delta";
    }
    else if (points > 300 && points < 899)
    {
        return "Omega";
    }
    else if (points > 900)
    {
        return "Alpha";
    }
}

function refreshData()
{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://studentcrud-a7cf.restdb.io/rest/nonegoidassignment",
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "x-apikey": "5ffd5eb61346a1524ff12901",
          "cache-control": "no-cache"
        }
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        for (var i=0; i < response.length; i++)
        {
            if (localStorage.getItem("userName") == response[i].useremail)
            {
            localStorage.setItem("userName", response[i].useremail);
            localStorage.setItem("userID", response[i]._id);
            localStorage.setItem("userPoints", response[i].userPoints);

            var memberResult = checkMembership(response[i].userPoints);

            localStorage.setItem("userMembership", memberResult);
            localStorage.setItem("userAvatar", response[i].userAvatar);
            localStorage.setItem("userTokens", response[i].userTokens);
            localStorage.setItem("friendsList", response[i].friendsList);
            localStorage.setItem("userPass", response[i].userpass);
            }
            else
            {
                continue;
            }
        }
    
      });
}

// Avatar API

function viewAvatarNav() {

    $('#CreatAvtarButton').hide();
    if (localStorage.getItem("userAvatar") != "" )
    {
        $('#overridePrevAvatar').show();
    }
    else if (localStorage.getItem("userAvatar") == "")
    {
        $('#CavtarNavBar').show();
        $('#cfmAvatar').show();
    }

}

function overrideNo()
{
    $('#overridePrevAvatar').hide();
}

function overrideYes()
{
    $('#overridePrevAvatar').hide();
    $('#CavtarNavBar').show();
    $('#cfmAvatar').show();
}
    
function createAvatar(gCode) {

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + gCode , {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Status" + data.status + "\nAvatar SRC" + data.avatarSrc + "\nThumbnail SRC" + data.thumbnailSrc + "\n" + data.doppelme_key);
        localStorage.setItem("AvatarKey", data.doppelme_key);

        var imageurl = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl;
        $('#sampleAvatar').hide();
        document.getElementById("AvtarPicSpace").innerHTML = ('<img id="avatarPic" style="margin-top: 60px; margin-left: 60px;" src="' + img.src + '"></img>');

        var editSkinButton = ` <button onclick="EditAvatarSkin()">Edit Skin</button> `;
        var editAssetButton = ` <button onclick="EditAvatarAsset()">Edit Asset</button> `;
        var delButton = ` <button onclick="DeleteAvatar()">Delete Avatar</button> `;
        $("#avatarPic").html(img);
        $("#avatarPic").html(editSkinButton);
        $("#avatarPic").html(editAssetButton);
        $("#avatarPic").html(delButton);

    })
    .catch(err => {
        console.error(err);
    });

}

function EditAvatarSkin(sCode, aCode)
{

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + aCode + "/skin/" + sCode, {
	"method": "PUT",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(data => {

        console.log("New Second Avatar: " + data.thumbnailSrc);

        localStorage.removeItem("avatarPic");
        localStorage.setItem("avatarPic", data.thumbnailSrc);

        var imageurl_Skin = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl_Skin

        var refedImage = refreshImage("avatarPic", data.thumbnailSrc);
        
        document.getElementById("avatarPic").remove();

        document.getElementById("AvtarPicSpace").innerHTML += ('<img id="avatarPic" style="margin-top: 60px; margin-left: 60px;" src="' + refedImage + '"></img>');

    })
    .catch(err => {
        console.error(err);
    });
    
}

function EditAvatarAsset(eCode, aCode) {

    /*
    123 - Aviator Glasses
    124 - Wraps
    125 - Big Glasses

    18 - short bob
    76 - curly
    */


    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + aCode + "/" + eCode, {
        "method": "PUT",
        "headers": {
            "x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
            "x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Thumbnail SRC: " + data.thumbnailSrc);

        var imageurl_Skin = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl_Skin;


        var refedImage = refreshImage("avatarPic", data.thumbnailSrc);
        document.getElementById("avatarPic").remove();


        document.getElementById("AvtarPicSpace").innerHTML += ('<img id="avatarPic" style="margin-top: 60px; margin-left: 60px;" src="' + refedImage + '"></img>');
    })
    .catch(err => {
        console.error(err);
    });

}

function EditAvatarAssetColour(aCode, type, cCode)
{

    fetch(`https://doppelme-avatars.p.rapidapi.com/avatar/${aCode}/${type}/${cCode}`, {
	"method": "PUT",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(data => {
        console.log("Thumbnail SRC: " + data.thumbnailSrc);

        var imageurl_Skin = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl_Skin;

        var refedImage = refreshImage("avatarPic", data.thumbnailSrc);
        document.getElementById("avatarPic").remove();

        document.getElementById("AvtarPicSpace").innerHTML += ('<img id="avatarPic" style="margin-top: 60px; margin-left: 60px;" src="' + refedImage + '"></img>');
    })
    .catch(err => {
        console.error(err);
    });

}

function RemoveAvatarAsset(eCode, aCode) {

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + aCode + "/" + eCode, {
	"method": "PUT",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => {
        console.log(response);
    })
    .then(data => {
        console.log(data);
        console.log("Thumbnail SRC: " + data.thumbnailSrc);

        var imageurl_Skin = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl_Skin
        document.getElementById("AvtarPicSpace").innerHTML += ('<img id="avatarPic" src="' + img.src + '"></img>');
    })
    .catch(err => {
        console.error(err);
    });


}


function DeleteAvatar() {
    var avatarKey = localStorage.getItem("AvatarKey");

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + avatarKey, {
	"method": "DELETE",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

}


$( document ).ready(function() {
    var cartArray = [];
    function addToCart(event) {
        var cartItems = localStorage.getItem("cartItem");
        cartItems = JSON.parse(cartItems);
        var button = event.target;
        var shopItem = button.parentElement.parentElement;
        var title = shopItem.getElementsByClassName("prodTitle")[0].innerText;
        var img = shopItem.getElementsByClassName("prodImg")[0].src;
        var price = shopItem.getElementsByClassName("prodPrice")[0].innerText;
        if (CheckCartItems(title, cartItems) == false){
          var newCartItem = new CartItems(img, title, price);
          cartArray.push(newCartItem);
          localStorage.setItem("cartItem", JSON.stringify(cartArray));
          $(".cartLottie").fadeIn();
          $(".cartLottie").fadeOut(1000);
        }
        else{
            console.log("exist");
        }
    }
    function CheckCartItems(title, list) {
        if (list != null) {
          for (var i = 0; i < list.length; i++) {
              if (list[i].title == title) {
                  return true;
              }
          }
        }
        return false;
    }
    function CartItems(img, title, price) {
        this.img = img;
        this.title = title;
        this.price = price;
    }
    function ProdTypeSearch() {
        $(".prodType").hide();
        $(".prodTypeSearch").change(function(){
        $(".prodType").each(function(){
            if ($(".prodTypeSearch").val() == "all") {
                if ($(this).parent().parent().parent().is(":hidden")) {
                    $(this).parent().parent().parent().show();   
                }
            }
            else if ($(this).html() != $(".prodTypeSearch").val())
            {
                $(this).parent().parent().parent().hide();
            }
            else{
                $(this).parent().parent().parent().show();
            }
      });
      });
    }
    function ProdSearch() {
        $(".userInput").keyup(function(){
            var value = $(this).val();
            var valueFilter = value.toLowerCase();
            $(".prodTitle").each(function(){
                var title = $(this).text();
                if (title.toLowerCase().indexOf(valueFilter) !== -1) {
                    $(this).parent().parent().show();
                }
                else {
                    $(this).parent().parent().hide();
                }
            });
        });
    }
    /*
      var addToCartButtons = $(".addToCart")
      for (var i = 0; i < addToCartButtons.length; i++)
      {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCart);
      }*/
      $(".addToCart").each(function(){
          $(this).click(function(){
            var cartItems = localStorage.getItem("cartItem");
            cartItems = JSON.parse(cartItems);
            var button = event.target;
            var shopItem = button.parentElement.parentElement;
            var title = shopItem.getElementsByClassName("prodTitle")[0].innerText;
            var img = shopItem.getElementsByClassName("prodImg")[0].src;
            var price = shopItem.getElementsByClassName("prodPrice")[0].innerText;
            if (CheckCartItems(title, cartItems) == false){
              var newCartItem = new CartItems(img, title, price);
              cartArray.push(newCartItem);
              localStorage.setItem("cartItem", JSON.stringify(cartArray));
              $(".cartLottie").fadeIn();
              $(".cartLottie").fadeOut(1000);
            }
            else{
                console.log("exist");
            }
          });
      });
      ProdTypeSearch();
      ProdSearch();
      $(".cartLottie").hide();
});


function CheckUserExists(response, inputEmail)
{
  for (let i = 0; i < response.length; i++)
  {
    if (response[i].useremail === inputEmail)
    {
      return 1;
    }
  }
  return 2;
}