// Avatar API
    
function createAvatar() {

    fetch("https://doppelme-avatars.p.rapidapi.com/avatar/1101", {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": "7ef7505eeemsh4b7ae28b990ec32p10a9e5jsnf404942f045e",
		"x-rapidapi-host": "doppelme-avatars.p.rapidapi.com"
	}
    })
    .then(response => {
        console.log("The Result src is: " + response.status + "\n" + response.avatarSrc + "\n" + response.thumbnailSrc);
        return response.json()
    })
    .catch(err => {
        console.error(err);
    });

}

function create2Avatar() {
    // Finding the Player's ID
    var url = "https://avatars.dicebear.com/4.5/api/male/john.svg?background=%230000ff";
    var a = fetch(url);

    a.then(response => {
        console.log(response);
        return response.json();
    })
    /*
    .then(data => {
        var x = data;
        console.log(x);
    })*/
}




// Cart API