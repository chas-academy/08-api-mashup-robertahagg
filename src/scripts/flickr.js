function searchForImages(word) {
    const xhttp = new XMLHttpRequest(); //Use the XMLHttpRequest to get data from the server

    const callback = () => {
        //callback
        // console.log("Call back called! xhttp.readyState: " + xhttp.readyState); // readyState describes the loading state of the document.

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // ==4 (The operation is complete), == 200 (ok status message)
            // document.getElementById("demo").innerHTML = xhttp.responseText;

            //console.log(xhttp.responseText);

            const flickrImages = JSON.parse(xhttp.responseText).photos.photo; //Json object
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
        "&per_page=10" +
        "&license=2,4,5,6,7" +
        "&sort=relevance" +
        "&nojsoncallback=1"; //Url to flickrAPI with API key and structure of how you want to recieve the data from the server.

    console.log("Url1: " + url);
    /*    console.log(
                                                                "Url2: https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d8d0d872549db0d8a78907c4b33faa4&text=love&format=json&per_page=10"
                                                            ); */

    xhttp.open("GET", url, true); // xhttp.open = method that initializes a request
    xhttp.send(); // method that sends the request and returns as soon as the request is sent.

    console.log("Request sent...");
}

//Exempel på hur man kan formatera API nyckeln från flickr

/* const url =
    "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d8d0d872549db0d8a78907c4b33faa4&text=love&format=json&per_page=10";
                                                               1d8d0d872549db0d8a78907c4b33faa4loveformat=jsonper_page=10
} */

function addImagesToDom(flickrImages) {
    //array that lets you loop through the lenght of the list
    for (let i = 0; i < flickrImages.length; i++) {
        //console.log("image " + i + ": " + flickrImages[i]);

        const html1 = // HTML created
            "<li><img id='" +
            flickrImages[i].id +
            "'height=150 width=150>" +
            flickrImages[i].title +
            "</li>"; // Classic way, used in other languages.
        //  const html2 = `<li>${flickrImages[i].title}</li>`; // Modern JS way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

        $(".flickrImages").append(html1); //where in the dom the images with title will go

        getImageUrlFromFlickr(flickrImages[i].id);
    }
}

function getImageUrlFromFlickr(flickrImageId) {
    const xhttp = new XMLHttpRequest();

    const callback = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // console.log("xhttp.responseText=" + xhttp.responseText);
            const flickrImageSizeList = JSON.parse(xhttp.responseText).sizes.size;

            for (let i = 0; i < flickrImageSizeList.length; i++) {
                const sizeObject = flickrImageSizeList[i];

                if (sizeObject.label == "Large Square") {
                    $("#" + flickrImageId).attr("src", sizeObject.source);
                }
            }
        }
    };

    xhttp.onreadystatechange = callback;

    const url =
        "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes" +
        "&api_key=" +
        "1d8d0d872549db0d8a78907c4b33faa4" +
        "&photo_id=" +
        flickrImageId +
        "&format=json" +
        "&nojsoncallback=1";

    console.log("Url1: " + url);
    /*    console.log(
                                                                "Url2: https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=1d8d0d872549db0d8a78907c4b33faa4&text=love&format=json&per_page=10"
                                                            ); */

    xhttp.open("GET", url, true);
    xhttp.send();

    console.log("Request sent...");
}