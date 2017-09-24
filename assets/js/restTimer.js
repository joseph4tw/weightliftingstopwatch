var restTimerApp = function(p5) {
    const restColor = "#003b46";

    var restButton = $("#rest"),
        restInput = $("#restInput"),
        stopButton = $("#stop"),
        isRestTimerOn = false,
        timerStartY = 40,
        transition = 1,
        initialMilliseconds = 0,
        restTimeInput = 0,
        remainingSeconds = 0;

    restButton.click(function() {
        isRestTimerOn = true;
        restTimeInput = parseInt(restInput.val()) + 1;
        initialMilliseconds = p5.millis();
    });

    stopButton.click(function() {
        isRestTimerOn = false;
        remainingSeconds = 0;
    });

    p5.setup = function() {
        p5.createCanvas(200, 400);
        transition = 100;
        initialMilliseconds = p5.millis();
    }
    
    p5.draw = function() {
        p5.clear();
        p5.background(0, 0);

        if (!isRestTimerOn) return;

        let restSeconds = (p5.millis() - initialMilliseconds) / 1000;
        let restProgression = p5.map(restSeconds, 0, restTimeInput, timerStartY, p5.height - timerStartY);
        let transparency = p5.map(restSeconds, 0, restTimeInput, 255, 0);

        remainingSeconds = Math.floor(restTimeInput - restSeconds);
        
        if (remainingSeconds <= 0) {
            remainingSeconds = 0;
        }

        // if (restProgression >= p5.height - timerStartY) {
        //     restProgression = p5.height - timerStartY;
        // }

        drawText(remainingSeconds, timerStartY + restProgression);
        drawTimer(timerStartY, restProgression, transparency);
    }

    function drawText(text, y) {
        p5.fill(restColor);
        p5.strokeWeight(1);
        p5.textSize(64);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(text, p5.width / 2, y - 40);
    }

    function drawTimer(timerStartY, restProgression, transparency) {
        p5.fill(0, 59, 70, transparency);
        p5.stroke(0, 59, 70, transparency);
        p5.rect(0, timerStartY + restProgression, p5.width, p5.height - timerStartY);
    }
}

new p5(restTimerApp, "restTimer");