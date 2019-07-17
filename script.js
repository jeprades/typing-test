//Constants to access different elements of the HTML
const kTestWrapper = document.querySelector(".test-wrapper");
const kTestArea = document.querySelector("#test-area");
let kOriginText = document.querySelector("#origin-text p");
const kResetButton = document.querySelector("#reset");
const kTheTimer = document.querySelector(".timer");
const kNewQuoteButton = document.querySelector("#new");
let timer = [0, 0, 0, 0]; // timer is an interval that will be clear when the reset button is clicked.
let interval;
let timerRunning = false; // It won't start the interval again in the setTimer function when all text is deleted from the testarea

//Generate random quotes
function newQuote() {
  resetTest(); //Reset test everytime a new quote is generated.
  const kQuotes = [
    "Well, it's love at first sight. Actually, it was... No, it was when I heard her voice. It was love at first see with my ears",
    "Make friends first, make sales second, make love third. In no particular order.",
    "Guess what, I have flaws. What are they? Oh I don't know. I sing in the shower. Sometimes I spend too much time volunteering. Occasionally I'll hit somebody with my car. So sue me.",
    "Did I Stutter?",
    "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
    "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
    "I guess I've been working so hard, I forgot what it's like to be hardly working.",
    "I love inside jokes. I'd love to be a part of one someday.",
    "I say dance, they say 'How high?'",
    "Jim told me you could buy gay-dar online."
  ];
  let max = kQuotes.length;
  let randomNumber = Math.floor(Math.random() * (max + 1));
  kOriginText.textContent = kQuotes[randomNumber];
}

/*Check if the value of the input is the same as the value of the quote. Change styles if the work is in process or there is an error */
function checkInput() {
  let textEntered = kTestArea.value;
  let originText = kOriginText.innerHTML;
  let originTextMatch = originText.substring(0, textEntered.length);

  if (textEntered === originText) {
    clearInterval(interval);
    kTestWrapper.style.borderColor = "#429890";
    kTheTimer.classList.add("correct-typing");
  } else {
    if (textEntered === originTextMatch) {
      kTestWrapper.style.borderColor = "#65CCf3";
    } else {
      kTestWrapper.style.borderColor = "#E95D0F";
    }
  }
}

// Function for style purposes. Always have double digits showing in the timer if number is < 10.
function leadingZero(number) {
  if (number < 10) {
    number = `0${number}`;
  }
  return number;
}
//Run the timer
function runTimer() {
  let currentTime = `${timer[0]}:${timer[1]}:${timer[2]}`;
  kTheTimer.innerHTML = currentTime;
  timer[3]++;
  timer[0] = leadingZero(Math.floor(timer[3] / 100 / 60));
  timer[1] = leadingZero(Math.floor(timer[3] / 100 - timer[0] * 60)); //Subtract that value so every time we hit 60 secs, value return to 0.
  timer[2] = leadingZero(
    Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000)
  ); // Clear out every time we get to 100 to a second, and clear everytime the minute reaches hundred.
}

function setTimer() {
  //It checks how many elements there are in the text area. As the "keypress" has been set before, when the user press one key, the counter is still 0.
  let textEnteredLength = kTestArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    // New interval won't be created unless user click star over or refresh the website.
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

//Reset all the website without refreshing
function resetTest() {
  clearInterval(interval); // Clear the interval, the time will stop.
  interval = null; // No set up a new interval with a new index number. Waste of resources otherwise.
  timerRunning = false;
  timer = [0, 0, 0, 0];
  kTheTimer.innerHTML = "00:00:00";
  kTestArea.value = ""; // Clean the textarea
  kTheTimer.classList.remove("correct-typing"); // Remove the style of the timer if the typing test has been completed
  kTestWrapper.style.borderColor = "grey";
}

// Event Listener Calls
kTestArea.addEventListener("keypress", setTimer, false); //Call the setTimerFunction to start running the timer
kTestArea.addEventListener("keyup", checkInput, false); //Check the input every time user write something on the test area
kResetButton.addEventListener("click", resetTest, false); // Call the resetTest function to reset all the website
kNewQuoteButton.addEventListener("click", newQuote);
