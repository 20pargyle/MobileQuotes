const initialQuote = document.getElementById("initial-quote");
const initialAuthor = document.getElementById("initial-author");
const authorSearch = document.getElementById("search-bar");
const errorDiv = document.getElementById("error-display");

async function getRandomQuote(elQuote, elAuthor) {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quoteResult = await result;
    const quoteObj = await quoteResult.json();
    elQuote.innerText = quoteObj["content"];
    elAuthor.innerText = `- ${quoteObj["author"]}`;
}

async function search(userQuery) {
    const result1 = await fetch(`https:usu-quotes-mimic.vercel.app/api/search?query=${userQuery}`);
    const result2 = await result1;
    const quoteList = await result1.json();
    return quoteList;
}

getRandomQuote(initialQuote, initialAuthor);

authorSearch.addEventListener("keydown", function(e) {
    if (e.key === "Enter"){
        if (authorSearch.value == ""){
            errorDiv.innerText = "Empty string!";
        }
        // add an else-if for any other conditions here
        else {
            const quoteList = search(authorSearch.value);
            console.log(quoteList);
        }
    }
});