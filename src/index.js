////////////////////////////////VideoContext - QCA3642

///////do not modify
import VideoContext from "videocontext";
import * as fs from "fs";

////////////////////// ACTION - enter the video URL and properties
var videoName =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

//var shaderColour = [1.0, 1.0, 1.0]; //white
//var shaderColour = [1.0, 0, 0]; //red
var shaderColour = [1.25, 1.18, 0.9]; //sepia

var shaderProperties = {
  inputMix: { type: "uniform", value: [0.4, 0.6, 0.2] },
  outputMix: { type: "uniform", value: shaderColour }
};

///////do not modify
var canvas = document.createElement("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
document.body.scrollTop = 0; // <-- pull the page back up to the top
document.body.style.overflow = "hidden";
document.body.style.top = 0;
document.body.style.left = 0;
document.body.style.margin = 0;
document.body.style.border = "none";
document.body.appendChild(canvas);

var videoCtx = new VideoContext(canvas);
//Create a video node
var videoNode = videoCtx.video(videoName);
//videoNode.connect(videoCtx.destination);

//////////////////////////////////SHADER
var shaderVert = fs.readFileSync('shader.vert','utf8');
var shaderFrag = fs.readFileSync('shader.frag','utf8');

var shaderDescription = {
  title: "",
  description: "",
  vertexShader: shaderVert,
  fragmentShader: shaderFrag,
  properties: shaderProperties,
  inputs: ["u_image"]
};

var shaderEffect = videoCtx.effect(shaderDescription);

////////////////////// ACTION - enter start/end time
//shaderEffect.outputMix = [1.25, 1.18, 0.9];

// Set-up the processing chain.
videoNode.connect(shaderEffect);
shaderEffect.connect(videoCtx.destination);

////////////////////// ACTION - enter start/end time

videoNode.start(0);
//videoNode.stop(20);

///////do not modify
videoCtx.play();
