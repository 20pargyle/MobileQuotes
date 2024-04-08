const initialQuote = document.getElementById("initial-quote");
const initialAuthor = document.getElementById("initial-author");

async function getRandomQuote(elQuote, elAuthor) {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const quoteResult = await result;
    const quoteObj = await quoteResult.json();
    elQuote.innerText = quoteObj["content"];
    elAuthor.innerText = `- ${quoteObj["author"]}`;
}

getRandomQuote(initialQuote, initialAuthor);