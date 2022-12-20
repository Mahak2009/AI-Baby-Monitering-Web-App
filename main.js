img = "";
status1 = "";
objects = [];
song = "";

function preload()
{
    img = loadImage("soccer.jpg");
    song = loadSound("song.mp3");
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting if Baby is there : ";
}

function modelLoaded()
{
    console.log("model is loaded");
    status1 = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    else 
    {
        console.log(results);
        objects = results;
    }
}

function draw()
{
    image(video, 0, 0, 380, 380);
    
    if (status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : " + objects.length;
            fill("green");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 20, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Baby is Now Found!";
                song.stop();
            }
            else
            {
                document.getElementById("status").innerHTML = "Baby is not Found Yet!";
                song.play();
            }
        }
    }

}



//CoCoSSD object identification, show x and y cordinates, confidence, and what the image is//