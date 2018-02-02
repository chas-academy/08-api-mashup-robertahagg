function getSearchWord() {
    return $("#term").val();
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