function searchForImages(word) {
    const xhttp = new XMLHttpRequest();

    const callback = () => {
        console.log("Call back called! xhttp.readyState: " + xhttp.readyState);
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("demo").innerHTML = xhttp.responseText;

            const flickrImages = JSON.parse(xhttp.responseText).response.photos.photo[
                i
            ].title;
            addImagesToDom(flickrImages);
        }
    };

    xhttp.onreadystatechange = callback;

    const url =
        "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
        "&api_key=" +
        "1d8d0d872549db0d8a78907c4b33faa4" +
        "&text=" +
        word +
        "&format=json" +
        "&per_page=10"; //Ändra till FlickrAPI nyckel

    console.log("Url:" + url);

    xhttp.open("GET", url, true);
    xhttp.send();

    console.log("Request sent...");
}

//Exempel på hur man kan formatera API nyckeln från flickr

/* const url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d8d0d872549db0d8a78907c4b33faa4&text=love&format=json&per_page=10";
                                                               1d8d0d872549db0d8a78907c4b33faa4loveformat=jsonper_page=10
} */

function addImagesToDom(flickrImages) {
    for (let i = 0; i < flickrImages.length; i++) {
        console.log("image " + i + ": " + title[i]);

        // html1 and html2 will have the same content
        const html1 = "<li>" + [i].title + "</li>"; // Classic way, used in other languages.
        const html2 = `<li>${title[i]}</li>`; // Modern JS way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

        $(".flickrImages").append(html2);
    }
}