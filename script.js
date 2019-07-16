//Constants to access different elements of the HTML
// const testWrapper = document.querySelector(".test-wrapper");
const kTestArea = document.querySelector("#test-area");
const kOriginText = document.querySelector("#origin-text p").innerHTML;
const kResetButton = document.querySelector("#reset");
const kTheTimer = document.querySelector(".timer");
var timer; // timer is an interval that will be clear when the reset button is clicked.


function checkInput(valueInput) {
  
  if (valueInput == kOriginText) {
    clearInterval(timer);
    kTheTimer.classList.add("correct-typing")
  }

}

/* Set the setTimer function, fired by the user when type something in the text area. 
Checks what time it is when is called, check the date again, substract the times and create 
minutes, seconds and hseconds variables based on the difference. */
function setTimer(valueInput) {
  const startTime = Date.now(); //Check the time in miliseconds.

  timer = setInterval(function() { // set the interval to update the timer every 100 milliseconds.
    let currentTime = Date.now();
    let time = currentTime - startTime; // Analyze the difference between the starting time and the current time. 
    // Calculate seconds, hseconds and minutes
    let seconds = Math.floor((time / 1000) % 60);
    let hseconds = Math.floor((time / 100 % 60));
    let minutes = Math.floor((time / 1000 / 60) % 60);

    // Conditionals for style purposes. Always have double digits showing in the timer.
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hseconds < 10) {
      hseconds = "0" + hseconds;
    }

    let finalTime = minutes + " : " + seconds + " : " + hseconds; 
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
