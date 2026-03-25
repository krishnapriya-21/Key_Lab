// Typing- Game
// Generates A Random Sentence Upon Button Click
// Highlights Current Word in sentence
// Follows Timer from Button Click To Completion of Typing
// Warns User for Incorrect character with Shake and Deletion
// Displays Time Taken 



// Variable Array to store Sentences to Display

const Sentences= 

["The quick brown fox jumps over the lazy dog, but only after carefully considering whether the effort was worth the energy it would take." ,

"Technology continues to evolve at a rapid pace, forcing individuals and organizations to adapt constantly in order to remain relevant and competitive." ,

"While some people prefer quiet mornings filled with coffee and reflection, others thrive in the chaos of bustling streets and endless conversations." ,

"The library was filled with dusty shelves, ancient books, and the faint smell of parchment that seemed to whisper stories from centuries past." ,

"Success is not simply the result of talent or luck, but rather the consistent application of discipline, patience, and resilience over time." ,

"The rain tapped gently against the window, creating a soothing rhythm that made the entire room feel calm and almost dreamlike." ,

"Traveling to new places opens the mind to different cultures, traditions, and perspectives that challenge preconceived notions about the world." ,

"The mountain stood tall and majestic, its snow-covered peak glistening under the golden rays of the rising sun.",

"In the middle of the crowded marketplace, vendors shouted their prices while customers bargained fiercely for the best possible deal." ,

"The invention of electricity transformed human civilization, enabling progress in science, medicine, communication, and countless other fields.",

"A single act of kindness can ripple outward, touching lives in ways that may never be fully understood or even noticed.",

"The orchestra played with such passion and precision that the audience sat in awe, completely captivated by the music's power.",

"Writing is not merely about putting words on paper, but about expressing thoughts, emotions, and ideas in a way that resonates deeply.",

"Every challenge presents an opportunity to grow stronger, wiser, and more capable of handling the complexities of life.",

"The desert stretched endlessly, its golden sands shimmering under the relentless heat of the midday sun.",

"The old clock ticked steadily in the corner, marking the passage of time with a rhythm that felt both comforting and inevitable.",

"Education is the foundation upon which societies build progress, innovation, and the hope of a brighter future.",

"The ship sailed across the vast ocean, its sails billowing in the wind as waves crashed against its sturdy hull.",

"A garden filled with blooming flowers, buzzing bees, and chirping birds can bring peace to even the busiest of minds.",

"The stars sparkled brilliantly in the night sky, reminding us of the infinite mysteries that lie beyond our reach."

];


// Declaration of  Audio Variables and Files

const errorSound=  new Audio("sound/error.wav");

// Declaring Constant Variables and Receiving Elements using DOM

const sentenceDisplayElement = document.getElementById("sentence");
const typingBoxElement= document.getElementById("TypingBox");
const timeInfoElement= document.getElementById("TimeInfo");
const buttonElement= document.querySelector(".hero-btn");





let generatedSentence="";
let words= [];
let currentWordIndex = 0;
let Start_Time ;





// Function to generate  Random Sentences from Array of Sentences
function GenerateRandomSentence(sentences){

    // Returns  a random chosen Sentence by getting Random Number between 0 & 1 and Multiplying with total array indexes and rounding down
    return sentences[Math.floor(Math.random() * sentences.length)];

}


// Function to Update Display with Highlighted Word
function updateDisplaySentence(){
    sentenceDisplayElement.innerHTML = words.map((word, index) => {
        return index === currentWordIndex ? `<span class="highlight">${word}</span>` : word;
    }).join(" ");
}


/* REAL -TIME Typing Validation LOGIC */




function typingValidation(){


    if(!typingBoxElement) return;
    // adding Event Listener to Input Text Box

    typingBoxElement.addEventListener("input", () => {

        // variable to collect input words 
        const userTypedWord = typingBoxElement.value

        // Variable to collect expected word from generated sentence words at its index level 0
        const expectedWord= words.slice(0,currentWordIndex+1).join(" ")+" ";

        
        // Getting Current Character in Typed Word and Word in That Position


        const userTypedChar= typingBoxElement.value.slice(-1);

        const expectedChar= expectedWord[typingBoxElement.value.length-1];


        //Checking Typed Word is incorrect


        if (!ValidateCharacter(userTypedChar,expectedChar)){
            
            showErrorEffect(typingBoxElement);

            // Removing Mistyped Word 
            typingBoxElement.value= typingBoxElement.value.slice(0,-1);


        }


        // Allows Spaces when User Finishes a Word
        
        if (!expectedWord.startsWith(userTypedWord)){
            showErrorEffect(typingBoxElement);
        }



        // Checking User Typed the Entire Word and Moving Highlight


        if (typingBoxElement.value.trim()=== words.slice(0,currentWordIndex +1).join(" ")){

            currentWordIndex++;
            updateDisplaySentence();
        }


        console.log("User Input :", typingBoxElement.value);



        // Checking If User Typed Full Sentence and Displaying Message

        if (typingBoxElement.value.trim() === generatedSentence) {

            const elapsedTime= updateTimer(Start_Time).toFixed(2);
            
            localStorage.setItem("typingTime", elapsedTime);
            window.location.href = "./result.html";
        }



    } );
}





// Function to Validate Input Character with sentence Character

function ValidateCharacter(inputCharacter,sentenceCharacter){

    // Return True if input character equals sentence character
    return (inputCharacter===sentenceCharacter) ;

}


// Function to Show Error Effect in Input Text Box

function showErrorEffect(Element){

    // Playing Error Sound

    errorSound.play();

     // Adding Animation Class to Input Text Box
    Element.classList.add("shake");



    //  By Using SetTimeout Function Scheduling Task Asunchronously to remove Shake Effect after 0.5 seconds
    setTimeout(()=> Element.classList.remove("shake"),300);

}



/* Tracking Time Taken to Complete LOGIC */

// Function to Update Timer Upon Completion

function updateTimer(Start_Time){

    // Returns Time Took By Calculating Current Time- Started Time
    return (performance.now()-Start_Time)/1000;

}





 /* Displaying Random Sentences Logic
 Upon Button Click From User
 */


    

    // Adding Event Listener To Button To display  Random Sentence by Passing Function to it

    if(buttonElement){
    buttonElement.addEventListener("click",() =>{

        generatedSentence= GenerateRandomSentence(Sentences);

            words= generatedSentence.split(" ");

            currentWordIndex=0;
            updateDisplaySentence();

            // Values Of Element are Cleared Upon Button Click

            typingBoxElement.value= "";
            typingBoxElement.classList.remove("shake");
            
            timeInfoElement.textContent= " ";

            // Variable is reset
            expectedWord=words[currentWordIndex];



            Start_Time= performance.now();

    });
    }

 
    if(typingBoxElement){
        typingBoxElement.focus();
    }


    //Calling Function To Validate Input, Show Time and Message

    typingValidation();


    // Test check in Console
    console.log(buttonElement);

    // Test Check Whether it works in Console
    console.log(Sentences);

    // Auto-Start Game on Main Page
    if(typingBoxElement && sentenceDisplayElement) {
        generatedSentence = GenerateRandomSentence(Sentences);
        words = generatedSentence.split(" ");
        currentWordIndex = 0;
        updateDisplaySentence();
        Start_Time = performance.now();
    }

    // Result Page Display Logic
    if(timeInfoElement && !typingBoxElement) {
        const savedTime = localStorage.getItem("typingTime");
        if(savedTime) {
            timeInfoElement.innerHTML = `<span class="highlight">${savedTime}</span> Seconds`;
        }
    }

    // Dark Mode Toggle Logic
    function toggleDarkMode() {
        const darkModeIcon = document.getElementById("darkModeIcon");
        const logo = document.querySelector(".logo");
        document.body.classList.toggle("dark-mode");

        if(document.body.classList.contains("dark-mode")){
            localStorage.setItem("theme", "dark");
            if(darkModeIcon) darkModeIcon.src = "./assets/Sun.png";
            if(logo) logo.src = "./assets/KeyLabDark.png";
        } else {
            localStorage.setItem("theme", "light");
            if(darkModeIcon) darkModeIcon.src = "./assets/Moon.png";
            if(logo) logo.src = "./assets/KeyLab.png";
        }
    }

    // Apply Saved Theme on Load
    (function() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.body.classList.add("dark-mode");
            const darkModeIcon = document.getElementById("darkModeIcon");
            const logo = document.querySelector(".logo");
            if(darkModeIcon) darkModeIcon.src = "./assets/Sun.png";
            if(logo) logo.src = "./assets/KeyLabDark.png";
        }
    })();