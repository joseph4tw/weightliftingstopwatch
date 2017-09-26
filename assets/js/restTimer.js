var restTimerApp = function(p5) {
    const restColor = "#003b46";

    var restButton = $("#rest"),
        restInput = $("#restInput"),
        stopButton = $("#stop"),
        isRestTimerOn = false,
        timerStartX = 0,
        transition = 1,
        initialMilliseconds = 0,
        restTimeInput = 0,
        remainingSeconds = 0,
        sounds = {};

    restButton.click(function() {
        resetTimer();
        startTimer();
    });

    stopButton.click(function() {
        resetTimer();
    });

    p5.preload = function() {
        sounds.beep = p5.loadSound("assets/sounds/beep.mp3");
        sounds.beepPing = p5.loadSound("assets/sounds/beepPing.mp3");

        sounds.beepCount = 0;
    }

    p5.setup = function() {
        p5.createCanvas(327, 64);
        transition = 100;
        initialMilliseconds = p5.millis();

        sounds.beep.setVolume(0.1);
        sounds.beepPing.setVolume(0.1);
        sounds.isMuted = !$("#playSounds").is(":checked");
        sounds.beepPing30 = false;
        sounds.beepPing10 = false;
        sounds.beepPing5 = false;
        sounds.beepPing4 = false;
        sounds.beepPing3 = false;
        sounds.beepPing2 = false;
        sounds.beepPing1 = false;
    }
    
    p5.draw = function() {
        p5.clear();
        p5.background(0, 0);

        if (!isRestTimerOn) return;

        let restSeconds = (p5.millis() - initialMilliseconds) / 1000;
        let restProgression = p5.map(restSeconds, 0, restTimeInput, timerStartX, p5.width + timerStartX);
        let transparency = p5.map(restSeconds, 0, restTimeInput, 255, 0);

        remainingSeconds = Math.floor(restTimeInput - restSeconds);
        
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
        }

        processSounds(remainingSeconds);
        drawTimer(timerStartX, restProgression, transparency);
        drawText(remainingSeconds, timerStartX + restProgression);
    }

    function drawText(text, x) {
        p5.fill(restColor);
        p5.strokeWeight(1);
        p5.textSize(64);
        p5.textAlign(p5.RIGHT, p5.CENTER);
        p5.text(text, p5.width - 10, p5.height / 2);
    }

    function drawTimer(timerStartX, restProgression, transparency) {
        p5.fill(196, 223, 230, transparency);
        p5.noStroke();
        p5.rect(timerStartX + restProgression, 0, p5.width + timerStartX, p5.height);
    }

    function processSounds(remainingSeconds) {
        if (shouldPlayBeepPing(remainingSeconds)) {    
            sounds.beepPing.play();
        }

        if (shouldPlayBeep(remainingSeconds)) {
            sounds.beep.play();
            sounds.beepCount++;
        }
    }

    function shouldPlayBeepPing(remainingSeconds) {
        if (sounds.beepPing30 === false && remainingSeconds === 30) {
            sounds.beepPing30 = true;
            return true;
        }
        
        if (sounds.beepPing10 === false && remainingSeconds === 10) {
            sounds.beepPing10 = true;
            return true;
        }

        if (sounds.beepPing5 === false && remainingSeconds === 5) {
            sounds.beepPing5 = true;
            return true;
        }

        if (sounds.beepPing4 === false && remainingSeconds === 4) {
            sounds.beepPing4 = true;
            return true;
        }

        if (sounds.beepPing3 === false && remainingSeconds === 3) {
            sounds.beepPing3 = true;
            return true;
        }

        if (sounds.beepPing2 === false && remainingSeconds === 2) {
            sounds.beepPing2 = true;
            return true;
        }

        if (sounds.beepPing1 === false && remainingSeconds === 1) {
            sounds.beepPing1 = true;
            return true;
        }
        
        return false;
    }

    function shouldPlayBeep(remainingSeconds) {
        return sounds.beepCount === 0
               && remainingSeconds <= 0;
    }

    function playBeep() {
        if (!sounds.isMuted) {
            sounds.beep.play();
        }
    }

    function playBeepPing() {
        if (!sounds.isMuted) {
            sounds.beepPing.play();
        }
    }

    function resetTimer() {
        isRestTimerOn = false;
        remainingSeconds = 0;
        sounds.beepCount = 0;
        sounds.beepPing30 = false;
        sounds.beepPing10 = false;
        sounds.beepPing5 = false;
        sounds.beepPing4 = false;
        sounds.beepPing3 = false;
        sounds.beepPing2 = false;
        sounds.beepPing1 = false;
    }

    function startTimer() {
        restTimeInput = parseInt(restInput.val()) + 1;

        if (!isNaN(restTimeInput)) {
            isRestTimerOn = true;
            initialMilliseconds = p5.millis();
        }
    }
}

new p5(restTimerApp, "restTimer");