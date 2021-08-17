status = "";
objects = [];

function setup()
{
    canvas = createCanvas( 480 , 380);
    canvas.center();

    video = createCapture( 480 , 380);
    video.hide();

    var synth = window.speechSynthesis;
    input = utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = " Status : Detecting Objects";
    input = document.getElementById("ob_name").innerHTML;
}
function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}
function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.lenght; i++)
        {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("YesorNo").innerHTML = input + "found";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            video.stop();
            objectDetector.detect(gotResult);
        }
    }
}
function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}