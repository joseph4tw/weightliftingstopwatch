const millisecondColor = "#c4dfe6";
const secondColor = "#66a5ad";
const minuteColor = "#07575b";
const hourColor = "#003b46";
const textColor = "#003b46";

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent("stopwatch");

    angleMode(DEGREES);
}

function draw() {
    clear();
    background(0, 0);

    let totalMilliseconds = millis();
    let totalSeconds = totalMilliseconds / 1000;
    let totalMinutes = totalSeconds / 60;
    let totalHours = totalMinutes / 60;

    let milliseconds = totalMilliseconds % 1000;
    let seconds = totalSeconds % 60;
    let minutes = totalMinutes % 60;
    let hours = totalHours % 24;

    let milliSecondsAngle = map(milliseconds, 0, 1000, 0, 360);
    let secondsAngle = map(seconds, 0, 60, 0, 360);
    let minutesAngle = map(minutes, 0, 60, 0, 360);

    drawMilliseconds(milliSecondsAngle);
    drawSeconds(secondsAngle);
    drawMinutes(minutesAngle);

    let secondsText = Math.floor(seconds).toString().padStart(2, "0");
    let minutesText = Math.floor(minutes).toString().padStart(2, "0");
    let hoursText = Math.floor(hours).toString().padStart(2, "0");
    let timeText = hoursText + ":" + minutesText + ":" + secondsText;
    
    fill(textColor);
    strokeWeight(1);
    textSize(64);
    textAlign(CENTER, CENTER);
    text(timeText, width / 2, height / 2);
}

function drawMilliseconds(milliSecondsAngle) {
    noFill();
    stroke(millisecondColor);
    strokeWeight(6);
    arc(200, 200, 280, 280, 0, milliSecondsAngle);
}

function drawSeconds(secondsAngle) {
    noFill();
    stroke(secondColor);
    strokeWeight(6);
    arc(200, 200, 300, 300, 0, secondsAngle);
}

function drawMinutes(minutesAngle) {
    noFill();
    stroke(minuteColor);
    strokeWeight(6);
    arc(200, 200, 320, 320, 0, minutesAngle);
}