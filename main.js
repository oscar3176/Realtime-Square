nose_x = 0;
nose_y = 0;
leftWrist = 0;
rightWrist = 0;
square_size = 0;
function preload() {

}

function setup() {

    canvas = createCanvas(550, 550);
    canvas.position(700,150);

    video = createCapture(VIDEO);
    video.size(550, 550);

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {

    background("#222222");

    document.getElementById("displayer").innerHTML = "Size of square = " + square_size + "px";

    fill("pink");
    stroke("violet");
    square(nose_x, nose_y, square_size);

}

function ModelLoaded() {
    console.log("Posenet Is Initialized.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("nose x = " + nose_x + " nose y = " + nose_y);

        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        square_size = floor(leftWrist - rightWrist);
        console.log("left wrist x = " + leftWrist + " right wrist x = " + rightWrist);
    }
}