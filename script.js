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
        var x = data;
        console.log("Thumbnail SRC: " + x.thumbnailSrc);

        var imageurl = x.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl
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