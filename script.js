// Typing- Game
// Generates A Random Sentence Upon Button Click
// Highlights Current Word in sentence
// Follows Timer from Button Click To Completion of Typing
// Warns User for Incorrect character with Shake and Deletion
// Displays  Congrats Message after Completion and Displays Time Taken 



// Variable Array to store Sentences to Display

const Sentences= ["Believe you can and you're halfway there." ,

"The way to get started is to quit talking and begin doing." ,

"Do what you can, with what you have, where you are." ,

"Your time is limited, don't waste it living someone else's life." ,

"Act as if what you do makes a difference. It does." ,

"Be yourself; everyone else is already taken." ,

"Hardships often prepare ordinary people for an extraordinary destiny." ,

"Don't watch the clock; do what it does. Keep going." ];


// Declaration of  Audio Variables and Files

const errorSound=  new Audio("sound/error.wav");
const successSound= new Audio("sound/success.wav");



// Declaring Constant Variables and Receiving Elements using DOM

const sentenceDisplayElement = document.getElementById("sentence");
const typingBoxElement= document.getElementById("TypingBox");
const CongratsMgsElement = document.getElementById("CongratsMsg");
const timeInfoElement= document.getElementById("TimeInfo");
const buttonElement= document.getElementById("button");





let generatedSentence="";
let words= [];
let currentWordIndex = 0;
let Start_Time ;





// Function to generate  Random Sentences from Array of Sentences
function GenerateRandomSentence(sentences){

    // Returns  a random chosen Sentence by getting Random Number between 0 & 1 and Multiplying with total array indexes and rounding down
    return sentences[Math.floor(Math.random() * sentences.length)];

}




/* REAL -TIME Typing Validation LOGIC */




function typingValidation(){


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

           showCongratsMsg(CongratsMgsElement,"🎉 Congratulations! 🎉");
           showTimeInfo(timeInfoElement,elapsedTime);
        
           // Clearing text Box after 2 Seconds
           setTimeout(()=> typingBoxElement.value=" ", 2000);
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






/* HIGHLIGHTING the Current Word LOGIC */



function updateDisplaySentence(){

   sentenceDisplayElement.innerHTML= words.map((word,index)=>

    index=== currentWordIndex ? `<span class="highlight"> ${word} </span>` : word

    ).join(" ");

}





/* Tracking Time Taken to Complete LOGIC */

// Function to Update Timer Upon Completion

function updateTimer(Start_Time){

    // Returns Time Took By Calculating Current Time- Started Time
    return (performance.now()-Start_Time)/1000;

}


/* Display Messages Function */


// Function To Display Congrats Message Upon Completion to Element

function showCongratsMsg(Element,message){
    
    // Playing Success Sound
    
    successSound.play();

    // Updating Text Content

    Element.textContent= message;

    // Styling For Visibility

    Element.style.color= "Red"
    
}

// Function to Display Timer upon Completion to Element

    function showTimeInfo(Element,elapsedTime){

        //Updating Text Content

        Element.innerHTML=`You Finished Typing in : <span class= "highlight"> ${elapsedTime} Seconds </span>`;


    }




 /* Displaying Random Sentences Logic
 Upon Button Click From User
 */


    

    // Adding Event Listener To Button To display  Random Sentence by Passing Function to it

    buttonElement.addEventListener("click",() =>{

        generatedSentence= GenerateRandomSentence(Sentences);

            sentenceDisplayElement.textContent= generatedSentence;

            words= generatedSentence.split(" ");

            currentWordIndex=0;

            // Values Of Element are Cleared Upon Button Click

            typingBoxElement.value= "";
            typingBoxElement.classList.remove("shake");
            
            CongratsMgsElement.textContent= " ";

            timeInfoElement.textContent= " ";

            // Variable is reset
            expectedWord=words[currentWordIndex];


            updateDisplaySentence();

            Start_Time= performance.now();

    });

 
    typingBoxElement.focus();


    //Calling Function To Validate Input, Show Time and Message

    typingValidation();







    // Test check in Console
    console.log(buttonElement);

    // Test Check Whether it works in Console
    console.log(Sentences);