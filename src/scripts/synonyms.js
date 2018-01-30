function searchForSynonyms(word) {
    const xhttp = new XMLHttpRequest();

    const callback = () => {
        console.log("Call back called! xhttp.readyState: " + xhttp.readyState);

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("demo").innerHTML = xhttp.responseText;

            var words = JSON.parse(xhttp.responseText).noun.syn;
            addWordsToDom(words);
        }
    };

    xhttp.onreadystatechange = callback;

    xhttp.open(
        "GET",
        "http://words.bighugelabs.com/api/2/06189ca43ea50d2f6561136c39d82538/" +
        word +
        "/json",
        true
    );
    xhttp.send();

    console.log("Request sent...");
}

function addWordsToDom(words) {
    for (var i = 0; i < words.length; i++) {
        console.log("word " + i + ": " + words[i]);
    }
}