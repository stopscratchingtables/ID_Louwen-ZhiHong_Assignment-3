 // Avatar API
    
function createAvatar() {

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/1101", {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Status" + data.status + "\nAvatar SRC" + data.avatarSrc + "\nThumbnail SRC" + data.thumbnailSrc);
    
        var imageurl = data.thumbnailSrc;
        var img = document.createElement('img');
        img.src = imageurl
        document.body.appendChild(img);

    })
    .catch(err => {
        console.error(err);
    });

}


// Cart API