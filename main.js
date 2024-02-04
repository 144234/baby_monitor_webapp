img = "";
status = "";
baby_detected = "";
objects = [];

function setup(){
   canvas = createCanvas(380,380);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
}


function preload(){
   song = loadSound("music.mp3");
}


function start(){
   objectDetector = ml5.objectDetector('cocossd', modeLoaded);
   document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function draw(){
   image(video, 0, 0, 380, 380);
   if(status != ""){
       r = random(255);
       g = random(255);
       b = random(255);
       objectDetector.detect(video, gotResults);
       for(i = 0; i < objects.length; i++)
       {
           document.getElementById("status").innerHTML = "Status : Detecting Objects";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are = " + objects.length;


           fill(r, g, b);
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " "+ percent + "%", objects[i].x, objects[i].y);
           noFill();
           stroke(r, g, b);
           rect(objects[i].x,objects[i].y, objects[i].width, objects[i].height);
       }

       if(baby_detected != ""){
         document.getElementById("baby_detected").innerHTML = "Baby Detected";

       }
       else {
         document.getElementById("baby_detected").innerHTML = "Baby Not Detected";
         song.play();

       }
       if(objects < 0)){
         document.getElementById("baby_detected").innerHTML = "Baby Not Detected";
         song.play();

       }
   }
}


function modeLoaded(){
   console.log("Model Loaded!");
   status = true;
}


function gotResults(error, results){
   if(error) {
       console.log(error);    
   }
   console.log(results);
   objects = results;
}

