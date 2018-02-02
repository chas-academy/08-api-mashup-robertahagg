function getSearchWord() {
    return document.getElementById("term").value; // TODO: Ändra till jQuery för att göra samma sak.
}

function searchAll() {
    // Den här funktionen kör först när man tycker på submit, se ovan.
    clearSearch();

    const searchWord = getSearchWord();
    searchForSynonyms(searchWord);
    searchForImages(searchWord);
}

function clearSearch() {
    $(".relatedWords").empty();
    $(".flickrImages").empty();
}