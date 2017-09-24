var stopwatchApp = function(p5) {
    const millisecondColor = "#c4dfe6";
    const secondColor = "#66a5ad";
    const minuteColor = "#07575b";
    const hourColor = "#003b46";
    const textColor = "#003b46";
    
    var initialMilliseconds = 0,
        isStopwatchRunning = false,
        startButton = $("#start"),
        stopButton = $("#stop");
    
    startButton.click(function() {
        isStopwatchRunning = true;
        initialMilliseconds = p5.millis();
    });
    
    stopButton.click(function() {
        isStopwatchRunning = false;
    });
    
    p5.setup = function() {
        p5.createCanvas(400, 400);
        p5.angleMode(p5.DEGREES);
    }
    
    p5.draw = function() {
        p5.clear();
        p5.background(0, 0);
    
        if (!isStopwatchRunning) {
            // show stopped stopwatch
            drawStoppedStopwatch();
            return;
        }
    
        let totalMilliseconds = p5.millis() - initialMilliseconds;
        let totalSeconds = totalMilliseconds / 1000;
        let totalMinutes = totalSeconds / 60;
        let totalHours = totalMinutes / 60;
    
        let milliseconds = totalMilliseconds % 1000;
        let seconds = totalSeconds % 60;
        let minutes = totalMinutes % 60;
        let hours = totalHours % 24;
    
        let milliSecondsAngle = p5.map(milliseconds, 0, 1000, 0, 360);
        let secondsAngle = p5.map(seconds, 0, 60, 0, 360);
        let minutesAngle = p5.map(minutes, 0, 60, 0, 360);
    
        drawMilliseconds(milliSecondsAngle);
        drawSeconds(secondsAngle);
        drawMinutes(minutesAngle);
        drawTime(seconds, minutes, hours);
    }
    
    function drawStoppedStopwatch() {
        drawMilliseconds(360);
        drawSeconds(360);
        drawMinutes(360);
        drawTime(0, 0, 0);
    }
    
    function drawTime(seconds, minutes, hours) {
        let secondsText = Math.floor(seconds).toString().padStart(2, "0");
        let minutesText = Math.floor(minutes).toString().padStart(2, "0");
        let hoursText = Math.floor(hours).toString().padStart(2, "0");
        let timeText = hoursText + ":" + minutesText + ":" + secondsText;
        
        p5.fill(textColor);
        p5.strokeWeight(1);
        p5.textSize(64);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(timeText, p5.width / 2, p5.height / 2);
    }
    
    function drawMilliseconds(milliSecondsAngle) {
        p5.noFill();
        p5.stroke(millisecondColor);
        p5.strokeWeight(6);
        p5.arc(200, 200, 280, 280, 0, milliSecondsAngle);
    }
    
    function drawSeconds(secondsAngle) {
        p5.noFill();
        p5.stroke(secondColor);
        p5.strokeWeight(6);
        p5.arc(200, 200, 300, 300, 0, secondsAngle);
    }
    
    function drawMinutes(minutesAngle) {
        p5.noFill();
        p5.stroke(minuteColor);
        p5.strokeWeight(6);
        p5.arc(200, 200, 320, 320, 0, minutesAngle);
    }
}

new p5(stopwatchApp, "stopwatch");