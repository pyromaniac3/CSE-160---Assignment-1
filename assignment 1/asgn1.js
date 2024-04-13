 // Draw a shape when mouse is clicked
 // ColoredPoints.js
 // Vertex shader program
 var VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_Size;
    void main(){
    gl_Position = a_Position;
    gl_PointSize = u_Size;
    }`

 // Fragment shader program -- chaning the colors?
 var FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor; 
    void main(){
    gl_FragColor = u_FragColor;
    }`

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
var g_selectedColor = [255, 255, 255, 1];
var g_selectedSize = 5;

function setupWebGL(){
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
    return;
    }
}

function connectVariablesToGLSL(){

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

     // Get the storage location of attribute variable
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }
    // Get the storage location of u_FragColor variable
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(a_Position <0){
        console.log("failed to get the storage location locqtion of u_FragColor");
        return;
    }

    u_Size = gl.getUniformLocation(gl.program, 'u_Size');
    if(!u_Size){
        console.log("failed to get the storage location locqtion of u_Size");
        return;
    }
}

function addActionsForHtmlUI(){
    //#region [[Button Events Shape Type]]
    document.getElementById('square').onclick = function(){console.log("square")};
    document.getElementById('triangle').onclick = function(){console.log("triangle")};
    document.getElementById('circle').onclick = function(){console.log("circle")};
    //#endregion

    //#region [[Slider Events]]
    let redSlider = document.getElementById('red');
    let greenSlider = document.getElementById('green');
    let blueSlider = document.getElementById('blue');

    // Add event listeners for slider input changes
    redSlider.addEventListener('input', function() {g_selectedColor[0] = redSlider.value/255;});

    greenSlider.addEventListener('input', function() {g_selectedColor[1] = greenSlider.value/255;});

    blueSlider.addEventListener('input', function() {g_selectedColor[2] = blueSlider.value/255;});
    //#endregion

    //#region [[Clear canvas]]
    document.getElementById('clearCanvas').onclick = function(){
        //shapesList=[];
    };
    //#endregion 

    //#region [[Change Point Size]]
    let sizeSlider = document.getElementById('size');

    sizeSlider.addEventListener('input', function() {g_selectedSize = sizeSlider.value;});
    //#endregion
}

 function main() {

    setupWebGL();
    connectVariablesToGLSL();
    addActionsForHtmlUI();

    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = click;

    // Set the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
 }

 var g_points = []; // The array for a mouse press
 var g_colors = []; // The array to store the color of a point
 var g_sizes = [];  // The array to store the sizes of a point

 function click(ev) {
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

    // Store the coordinates to g_points array
    g_points.push([x, y]);
    // Updates color
    g_colors.push(g_selectedColor.slice());

    g_sizes.push(g_selectedSize);

    renderAllShapes();
 }


 function renderAllShapes(){
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgba = g_colors[i];
        var size = g_sizes[i];
       
  
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0],rgba[1],rgba[2],rgba[3]); 
        // Pass the size of the object
        gl.uniform1f(u_Size, size);
        // Draw a point
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}