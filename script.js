// Avatar API

function viewAvatarNav() {

    $('#CreatAvtarButton').hide();
    $('#CavtarNavBar').show();

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
        img.src = imageurl
        $('#sampleAvatar').hide();
        document.getElementById("AvtarPicSpace").innerHTML = ('<img id="avatarPic" src="' + img.src + '"></img>');

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

function EditAvatarAsset(eCode, aCode) {
/*
1 - Wink
3 - Angry
5 - Sleepy
67 - Smiling
69 - Sad
73 - Surprised
186 - Grin
200 - Tounge
243 - Embarassed
247 - Vampire
*/

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

function EditAvatarAsset()
{
    var avatarKey = localStorage.getItem("AvatarKey");
    
    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/" + doppleme_key + "/" + assetID, {
	"method": "PUT",
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
    var cartArray = []
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
        }
        else{
            console.log("exist")
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
      var addToCartButtons = $(".purchase")
      for (var i = 0; i < addToCartButtons.length; i++)
      {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCart);
      }
      //$(".cartAppend").append("<div> <h1>'test'</h1> </div>");
    
      /* work in progress
      $(".prodType").hide();
      $(".prodType").each(function(){
        if ($(this).html() == "knife")
        {
            $(this).parent().parent().parent().hide();
            $(this).parent().parent().parent().show();
        }
      });
      */
});


