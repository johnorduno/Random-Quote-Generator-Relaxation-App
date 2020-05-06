//Teamtreehouse Full Stack Javascript Techdegree Project 1: Random Quote Generator
//By: John Orduno
//Coded in VS Code

//initialize variables
var alreadyQuoted = [];
var interval = 10000;
var documentQuote = document.getElementById("quote");
var documentAuthor = document.getElementById("author");
var prevButton = document.getElementById("prevButton");
var pauseButton = document.getElementById("pauseButton");
var musicButton = document.getElementById("musicButton");
var imageContainer = document.getElementById("imageContainer");
var photoCredit = document.getElementById("photoCredit");
var run = true;
var quoteStorageLength = 0;
//music source: https://www.fesliyanstudios.com/royalty-free-music/downloads-c/peaceful-and-relaxing-music/22
var tranquilAudio = document.getElementById("tranquilAudio");
var musicOn = false;
var alreadyViewed = [];

//media queries for background image size *********************************
var mobile = window.matchMedia("(max-width: 600px)")
var tablet = window.matchMedia("(max-width: 1000px)")

function mobileQuery(mobile) {
    if (mobile.matches) { // If media query matches
      imageContainer.style.backgroundSize = "100% 80%";
    }
  }
  mobile.addListener(mobileQuery);

  function tabletQuery(tablet) {
    if (tablet.matches) { // If media query matches
        imageContainer.style.backgroundSize = "100% 80%";
    }
  }
  tablet.addListener(tabletQuery);
//***********************************************************************

//run first quote
quoteGenerator();

//generate quotes on timer source: https://www.w3schools.com/js/js_timing.asp
var timer = setInterval(quoteGenerator, interval);

function quoteGenerator(){
    if (run) {
        // Generate random quote index *102 quotes
        var quoteIndex = Math.floor(Math.random()*102);
        //check if quote has already been picked
        if(!alreadyQuoted.includes(quoteIndex)) {
                //change text of elements to quote and author
                documentQuote.innerHTML = quoteArray[quoteIndex].quote
                documentAuthor.innerHTML = "-" + quoteArray[quoteIndex].author
                //add the quote picked to the alreadyQuoted array
                alreadyQuoted.push(quoteIndex);
                console.log(quoteIndex);
                quoteStorageLength = alreadyQuoted.length;
                pickImage();  
        }else{
                //check if all of the quotes have been displayed
                if (alreadyQuoted.length < 102){
                console.log(alreadyQuoted.length);
                quoteGenerator()
                }else{
                    // if all quotes have been displayed, reset the array
                    quoteStorageLength = 0;
                    alreadyQuoted = [];
                }
        }
    }
}

function pauseQuotes() {
    if(run){
        run = false; 
        pauseButton.src = 'images/play.svg';
        prevButton.src = 'images/back.svg'
        prevButton.disabled = false;
    }else{ 
        run = true;
        pauseButton.src = 'images/pause.svg';
        prevButton.src = 'images/back_disabled.svg';
        prevButton.disabled = true;
    }
}

function prevQuote() {
    //remove last item from alreadyQuoted array, source: https://stackoverflow.com/questions/19544452/remove-last-item-from-array
    alreadyQuoted.pop();
    quoteStorageLength = alreadyQuoted.length;
    if (quoteStorageLength >= 1){
    documentQuote.innerHTML = quoteArray[alreadyQuoted[quoteStorageLength-1]].quote
    documentAuthor.innerHTML = "-" + quoteArray[alreadyQuoted[quoteStorageLength-1]].author
    }else{
        alert("You are at the first quote!");
    }
}

function toggleMusic() {
    if (musicOn){
        musicButton.src = 'images/music_off.svg';
        tranquilAudio.pause();
        musicOn = false;
    }else{
        musicButton.src = 'images/music.svg';
        tranquilAudio.play();
        musicOn = true;
    }
}

function pickImage() {
    var imageIndex = Math.floor(Math.random()*4);
    if(!alreadyViewed.includes(imageIndex)) {
        switch (imageIndex) {
            case 0:
                imageContainer.style.background = "url('./images/mushroom-1408483.jpg') no-repeat center center";
                photoCredit.innerHTML = "Photo by <a href='/photographer/ernestbon-43034'> Christoph van der Bij </a> from <a href='https://freeimages.com/'>FreeImages</a>";
                break;
            case 1:
                imageContainer.style.background = "url('./images/grand-canyon-1550787.jpg') no-repeat center center";
                photoCredit.innerHTML = "Photo by <a href='/photographer/jajal1-37772'> jajal1 </a> from <a href='https://freeimages.com/'>FreeImages</a>";
                break;
            case 2:
                imageContainer.style.background = "url('./images/poor-man-1440145.jpg') no-repeat center center";
                photoCredit.innerHTML = "Photo by <a href='/photographer/colcerex-44488'> Dan Colcer </a> from <a href='https://freeimages.com/'>FreeImages</a>";
                break;
            case 3:
                imageContainer.style.background = "url('./images/goooaalll-1433940.jpg') no-repeat center center";
                photoCredit.innerHTML = "Photo by <a href='/photographer/danisman-34520'> Emre Danisman </a> from <a href='https://freeimages.com/'>FreeImages</a>";
                break;
        }
        imageContainer.style.backgroundSize = "100% 100%";
        alreadyViewed.push(imageIndex);
    }else{
        if (alreadyViewed.length < 4){
            pickImage();
        }else{
            alreadyViewed = [];
            pickImage();
        }
    }
}