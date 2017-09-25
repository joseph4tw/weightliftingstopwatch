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
        remainingSeconds = 0;

    restButton.click(function() {
        restTimeInput = parseInt(restInput.val()) + 1;

        if (!isNaN(restTimeInput)) {
            isRestTimerOn = true;
            initialMilliseconds = p5.millis();
        }
    });

    stopButton.click(function() {
        isRestTimerOn = false;
        remainingSeconds = 0;
    });

    p5.setup = function() {
        p5.createCanvas(327, 64);
        transition = 100;
        initialMilliseconds = p5.millis();
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

        // if (restProgression >= p5.width + timerStartX) {
        //     restProgression = p5.width + timerStartX;
        // }

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
}

new p5(restTimerApp, "restTimer");