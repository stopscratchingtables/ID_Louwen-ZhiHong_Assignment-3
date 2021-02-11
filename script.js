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

// Cart API
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://studentcrud-a7cf.restdb.io/rest/product-details",
    "method": "GET",
    "headers": {
      "content-type": "application/json",
      "x-apikey": "5ffd5eb61346a1524ff12901",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    for (var i = 0; i < response.length; i++)
    {
        if (response[i].prod_type == "shirt")
        {
            $("#prodImg1").attr("src", response[0].prod_img);
            $("#prodTitle1").html(response[0].prod_title);
            $("#prodDesc1").html(response[0].prod_desc);
            $("#prodPrice1").html(response[0].prod_price);
            $("#prodImg2").attr("src", response[1].prod_img);
            $("#prodTitle2").html(response[1].prod_title);
            $("#prodDesc2").html(response[1].prod_desc);
            $("#prodPrice2").html(response[1].prod_price);
        }
    }
  });
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
