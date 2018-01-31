function getSearchWord() {
    return document.getElementById("term").value; // TODO: Ändra till jQuery för att göra samma sak.
}

function searchAll() {
    // Den här funktionen kör först när man tycker på submit, se ovan.
    const searchWord = getSearchWord();
    searchForSynonyms(searchWord);
    searchForImages(searchWord);
}