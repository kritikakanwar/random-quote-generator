const quotecontainer=document.getElementById("quote-container");
const text=document.getElementById("quotes");
const quoteauthor=document.getElementById("author");
const twitterbtn=document.getElementById("twitter");
const newquotebtn=document.getElementById("new-quote");
const loader=document.getElementById('loader');

let apiquotes=[];
// show loading
function loading()
{
    loader.hidden=false;
    quotecontainer.hidden=true;
}

// hide loading
function complete()
{
    if(!loader.hidden)
    {

        quotecontainer.hidden=false;
        loader.hidden=true;
    }
}
// new quote
function newquote()
{
    loading();
    // pick a random quote from apiquotes array
    const quote=apiquotes[Math.floor(Math.random() * apiquotes.length)];
    console.log(quote);
//    check author filed is blank replace it with unlnown
if(quote.author==null)
{
    quoteauthor.textContent='unknown';
}
else
{
quoteauthor.textContent=quote.author;
}
// check quote length to determine styling
if(quote.text.length>50)
{
    text.classList.add('long-quote');
}
else
{
   text.classList.remove('long-quote'); 
}
// set quote ,Hide loader
   text.textContent=quote.text;
   complete();

//    document.getElementById("quote-text").innerHTML=text;
}
// get quotes from api
async function getquote()
{
    loading();
    const apiurl='https://type.fit/api/quotes';
    try
    {
        const response=await fetch(apiurl);
 apiquotes=await response.json();
//  console.log(apiquotes[12]);
newquote();
    }
    catch(err)
    {

    }
}
// tweet quote
function tweetquote()
{
    const twiiterurl=`https://twitter.com/intent/tweet?text=${text.textContent} - ${quoteauthor.textContent}`;
window.open(twiiterurl,'_blank');
}
// event listerner
twitterbtn.addEventListener('click',tweetquote);
newquotebtn.addEventListener('click',newquote);
// onload
getquote();
// loading();