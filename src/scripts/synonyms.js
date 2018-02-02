function searchForSynonyms(word) {
    const xhttp = new XMLHttpRequest();

    const callback = () => {
        console.log("Call back called! xhttp.readyState: " + xhttp.readyState);

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // document.getElementById("demo").innerHTML = xhttp.responseText;

            const words = JSON.parse(xhttp.responseText).noun.syn;
            addWordsToDom(words);
        }
    };

    xhttp.onreadystatechange = callback;

    const url =
        "http://words.bighugelabs.com/api/2/06189ca43ea50d2f6561136c39d82538/" +
        word +
        "/json";

    xhttp.open("GET", url, true);
    xhttp.send();

    console.log("Request sent...");
}

function addWordsToDom(words) {
    for (let i = 0; i < words.length; i++) {
        console.log("word " + i + ": " + words[i]);

        // html1 and html2 will have the same content
        const html1 = "<li>" + words[i] + "</li>"; // Classic way, used in other languages.
        const html2 = `<li>${words[i]}</li>`; // Modern JS way https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

        $(".relatedWords").append(html2);
    }

    $(".relatedWords")
        .children()
        .on("click", function(event) {
            const newSearchWord = $(event.target).text();

            $("#term").val(newSearchWord);
            searchAll();
        });
}