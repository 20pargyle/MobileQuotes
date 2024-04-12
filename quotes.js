const mainEl = document.getElementById("main-container");
const initialQuote = document.getElementById("initial-quote");
const authorSearch = document.getElementById("search-input");
const errorDiv = document.getElementById("error-display");
const pinnedQuoteDiv = document.getElementById("pinned-quote-container");
const searchQuoteList = document.getElementById("search-quote-list");
const pinnedQuoteList = document.getElementById("pinned-quote-list");
const quoteEls = document.getElementsByTagName("li");

async function getRandomQuote(listEl) {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quoteResult = await result;
    const quoteObj = await quoteResult.json();
    getQuoteText(quoteObj, listEl.children[0], listEl.children[1]);
}

async function search(userQuery) {
    const result = await fetch(`https:usu-quotes-mimic.vercel.app/api/search?query=${userQuery}`);
    const quoteList = await result.json();
    return quoteList;
}

getRandomQuote(initialQuote);
initialQuote.addEventListener("click", function() {togglePin(initialQuote)});

authorSearch.addEventListener("keydown", async (e) => {
    if (e.key === "Enter"){
        mainEl.dataset.search = true;

        if (authorSearch.value == ""){
            throwError("Error - search field is empty");
        }
        // add an else-if: if there are any symbols ^^
        else {
            const searchObj = await search(authorSearch.value);
            const quoteList = searchObj["results"];
            searchQuoteList.innerHTML = "";
            displayList(quoteList);
        }
    }
});

function displayList(quoteList){
    if (quoteList.length == 0) {
        throwError("No quotes found for that search. \nPlease try again with a different search query.");

    }
    else {
        quoteList.forEach(quoteObj => {
            const parentItem = document.createElement("li");
            const quoteEl = document.createElement("p");
            const authorEl = document.createElement("p");

            getQuoteText(quoteObj, quoteEl, authorEl);

            quoteEl.classList.add("quote");
            authorEl.classList.add("author");

            parentItem.appendChild(quoteEl);
            parentItem.appendChild(authorEl);
            parentItem.addEventListener("click", function() {togglePin(parentItem)});
            searchQuoteList.appendChild(parentItem);
        });
    }
}

function getQuoteText(quoteObj, quoteTextEl, quoteAuthorEl) {
    quoteTextEl.innerText = quoteObj["content"];
        if (quoteObj["author"] != ""){
            quoteAuthorEl.innerText = `- ${quoteObj["author"]}`;
        } else { 
            quoteAuthorEl.innerText = "- Unknown" ;
        }
}

function togglePin(element){
    if (element.className.includes("pinned")){
        element.classList.remove("pinned");
        pinnedQuoteList.removeChild(element);
        searchQuoteList.insertBefore(element, searchQuoteList.firstElementChild); 

    } else {
        element.classList.add("pinned");
        searchQuoteList.removeChild(element);
        pinnedQuoteList.insertBefore(element, pinnedQuoteList.firstElementChild);
    }
    if (pinnedQuoteList.childElementCount > 0) {
		pinnedQuoteDiv.style.display = "flex";
    }
	else {
		pinnedQuoteDiv.style.display = "none";
    }
}

function throwError(message){
    errorDiv.innerText = message;
    errorDiv.style.display = "block";
    setTimeout(() => {
        errorDiv.style.display = "none";
    }, 3000);
}