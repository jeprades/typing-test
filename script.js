//Constants to access different elements of the HTML
// const testWrapper = document.querySelector(".test-wrapper");
const kTestArea = document.querySelector("#test-area");
let kOriginText = document.querySelector("#origin-text p");
const kResetButton = document.querySelector("#reset");
const kTheTimer = document.querySelector(".timer");
const kNewQuoteButton = document.querySelector("#new");
var timer; // timer is an interval that will be clear when the reset button is clicked.

//Generate random quotes
function newQuote() {
  resetTest();

  const kQuotes = ["Well, it's love at first sight. Actually, it was... No, it was when I heard her voice. It was love at first see with my ears", "Make friends first, make sales second, make love third. In no particular order.", "Guess what, I have flaws. What are they? Oh I don't know. I sing in the shower. Sometimes I spend too much time volunteering. Occasionally I'll hit somebody with my car. So sue me.", "Did I Stutter?", "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.", "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.", "I guess I've been working so hard, I forgot what it's like to be hardly working.", "I love inside jokes. I'd love to be a part of one someday.", "I say dance, they say 'How high?'", "Jim told me you could buy gay-dar online."];
  const min = 0;
  let max = kQuotes.length - 1;
  let randomNumber= Math.floor(Math.random() * (max - min + 1)) + min;
  kOriginText.textContent = kQuotes[randomNumber];

}
// Check if the value of the input is the same as the value of the quote
function checkInput(valueInput) {
  
  if (valueInput == kOriginText.innerHTML) {
    clearInterval(timer);
    kTheTimer.classList.add("correct-typing")
  }

}

/* Set the setTimer function, fired by the user when type something in the text area. 
Checks what time it is when is called, check the date again, substract the times and create 
minutes, seconds and hours variables based on the difference. */
function setTimer(valueInput) {
  const startTime = Date.now(); //Check the time in miliseconds.

  timer = setInterval(function() { // set the interval to update the timer every 100 milliseconds.
    let currentTime = Date.now();
    let time = currentTime - startTime; // Analyze the difference between the starting time and the current time. 
    // Calculate seconds, minutes and hours
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 1000 / 60) % 60);
    let hours = Math.floor( time / (1000 * 60 *60 ) % 24 );

    // Conditionals for style purposes. Always have double digits showing in the timer.
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }

    let finalTime =  hours + ":" +minutes + ":" + seconds; 
    kTheTimer.innerHTML = finalTime; // Display the time in the timer.

    checkInput(valueInput.value); // Call a function that check if the value is equal to the given text. 
  }, 100);
}
 //Reset all the website without refreshing
function resetTest() {
  clearInterval(timer); // Clear the interval, the time will stop. 
  kTheTimer.innerHTML = "00:00:00"; // Set the interval to 0 again.
  kTestArea.value = ""; // Clean the textarea
  kTheTimer.classList.remove("correct-typing"); // Remove the style of the timer if the typing test has been completed
  kTestArea.addEventListener( //Call the event listener of the input again as its set to be called only once to avoid bugs.
    "input",
    function() {
      setTimer(this);
    },
    { once: true }
  );
}

// Event Listener Calls
kTestArea.addEventListener( //Call the setTimerFunction to start running the timer
  "input",
  function() {
    setTimer(this);
  },
  { once: true }
);

kResetButton.addEventListener("click", resetTest); // Call the resetTest function to reset all the website
kNewQuoteButton.addEventListener("click", newQuote);