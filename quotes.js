const mainEl = document.getElementById("main-container");
const initialQuote = document.getElementById("initial-quote");
const authorSearch = document.getElementById("search-bar");
const errorDiv = document.getElementById("error-display");
const quoteSearchResults = document.getElementById("quote-list");


async function getRandomQuote(listEl) {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quoteResult = await result;
    const quoteObj = await quoteResult.json();
    listEl.children[0].innerText = quoteObj["content"];
    listEl.children[1].innerText = `- ${quoteObj["author"]}`;
}

async function search(userQuery) {
    const result = await fetch(`https:usu-quotes-mimic.vercel.app/api/search?query=${userQuery}`);
    const quoteList = await result.json();
    return quoteList;
}

getRandomQuote(initialQuote);

authorSearch.addEventListener("keydown", async (e) => {
    if (e.key === "Enter"){
        mainEl.dataset.search = true;

        if (authorSearch.value == ""){
            errorDiv.innerText = "Empty string!";
        }
        // add an else-if for any other undesired actions here
        else {
            const searchObj = await search(authorSearch.value);
            const quoteList = searchObj["results"];
            quoteSearchResults.innerHTML = "";
            displayList(quoteList);
        }
    }
});

function displayList(quoteList){
    quoteList.forEach(quoteObj => {
        const parentItem = document.createElement("li");
        const quoteEl = document.createElement("h4");
        const authorEl = document.createElement("p");

        getQuoteText(quoteObj, quoteEl, authorEl);

        quoteEl.classList.add("quote");
        authorEl.classList.add("author");

        parentItem.appendChild(quoteEl);
        parentItem.appendChild(authorEl);
        quoteSearchResults.appendChild(parentItem);
    });
}

function getQuoteText(quoteObj, quoteTextEl, quoteAuthorEl) {
    quoteTextEl.textContent = quoteObj["content"];
        if (quoteObj["author"] != ""){
            quoteAuthorEl.textContent = `- ${quoteObj["author"]}`;
        } else { 
            quoteAuthorEl.textContent = "- Unknown" 
        }
}