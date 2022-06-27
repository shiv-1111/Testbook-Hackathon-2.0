// declaring variables

const sounds = document.getElementsByClassName('sound');
// creating array from html collection so that we can access audio clips by index number
let soundsArray = Array.from(sounds);

// doing the same thing for buttons
const buttons = document.getElementsByClassName('btn');
let buttonsArray = Array.from(buttons);
let buttonContainer = document.getElementById('mid_section');


// x variable is required to use it as index number when the code calls pauseCurrentPlayingSound Function
var x;

// iterating through buttons to add event listener to buttons
//click event
for (i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].addEventListener('click', playSoundOnClick);
}

//keypress event
// an array containing all the keys that should trigger the event
let keyArray = ['w', 'a', 's', 'd', 'j', 'i', 'k', 'l', 'g']
document.addEventListener("keydown", function (e) {
    // iterating through key array to check the validity of 'if' statement
    for (let i = 0; i < keyArray.length; i++) {
        if (e.key == keyArray[i]) {
            let v = keyArray.indexOf(e.key);
            pauseCurrentPlayingSound();
            soundsArray[v].play();
            x = v;
            recordSound();
            // to add activated effect to button(which is currently playing)
            buttonsArray[v].classList.add('activated');
            // calling settimeout function to remove activated class from button after a delay of 100ms
            setTimeout(() => {
                buttonsArray[v].classList.remove('activated');
            }, 100);
        }
    }
})

// play sound on click function
function playSoundOnClick(e) {
    pauseCurrentPlayingSound();
    let v = buttonsArray.indexOf(e.target);
    soundsArray[v].play();
    // x value is assigned after pausecurrentplaying function because otherwise x will become equal to current sound index no and that would cause error
    x = v;
    recordSound();
}

// function to pause previously playing sound, otherwise next button will not fire event if previous sound is still playing
// it will wait for the sound to stop
function pauseCurrentPlayingSound() {
    // if condition is necessary because if x is undefined then soundsArray[x] will lead to error
    // the function won't have anything to pause
    if (x == undefined) {
        return
    }
    else {
        soundsArray[x].pause();
        // setting currenttime to 0 because otherwise the paused audio will start playing 
        // from where it was paused, the next time it is played
        soundsArray[x].currentTime = 0;
    }
}


// code for record,save and play button
let recordBtn = document.getElementById('record_btn');
let saveBtn = document.getElementById('save_btn');
let playSavedBtn = document.getElementById('play_btn');
// set event for record btn
recordBtn.addEventListener('click', function () {
    if (saveBtn.innerHTML = "Recording Saved") {
        recordingArray = [];
    }
    recordBtn.classList.add('selected');
    saveBtn.classList.remove('selected');
    playSavedBtn.classList.remove('selected');
    saveBtn.innerHTML = "Save recording";
})

// declare an empty array for recording index numbers

var recordingArray = [];

// creating recording function
function recordSound() {
    if (recordBtn.classList.contains('selected')) {
        recordingArray.push(x);
    }
    else {
        return;
    }
}

// save button event
saveBtn.addEventListener('click', function () {
    if (recordBtn.classList.contains('selected')) {
        saveBtn.classList.add('selected');
        saveBtn.innerHTML = "Recording Saved";
        recordBtn.classList.remove('selected');
    }
})

playSavedBtn.addEventListener('click', function () {
    if (saveBtn.innerHTML != "Recording Saved") {
        return;
    }
    else {
        saveBtn.classList.remove('selected');
        playSavedBtn.classList.add('selected');
        // declare a delay variable because we want varying delay time otherwise each sound in recordedArray will play at the same time
        var delay = 100;
        for (let i = 0; i < recordingArray.length; i++) {
            // set timeout to time the recorded sound playback 
            // everytime the loop runs it will call settimeout function with varying delay time
            setTimeout(() => {
                let a = recordingArray[i];
                soundsArray[a].play();
                // to add activated effect to buttons(which is currently playing)
                buttonsArray[a].classList.add('activated');
                // calling settimeout function to remove activated class from button after a delay of 100ms
                setTimeout(() => {
                    buttonsArray[a].classList.remove('activated');
                }, 100);
            }, delay);
            // increment delay by 400ms everytime the loop runs
            delay = delay + 400;

        }
    }
})