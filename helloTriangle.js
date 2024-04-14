// HelloTriangle.js
 // Vertex shader program
 var VSHADER_SOURCE =
 'attribute vec4 a_Position;\n' +
 'void main() {\n' +
 ' gl_Position = a_Position;\n' +
 '}\n';
 // Fragment shader program
 var FSHADER_SOURCE =
 'void main() {\n' +
 ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
 '}\n';

 function main() {
    var canvas = document.getElementById('webgl');
    // Get the rendering context for WebGL
    var gl = getWebGLContext(canvas);

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    var n = initVertexBuffers(gl);
    if(n<0){
        console.log("Failed to set the positions of the vertices");
        return;
    }

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    // Draw a triangle
    drawTriangles(0,0.5,  -0.5,-0.5,   0.5,-0.5);
    drawTriangles(0.8,0.9,  0.7,0.8,   0.8,-0.7);
    drawTriangles(0,0,  0.5,0,   0.5,0.5);
 }

 function initVertexBuffers(gl) {
    var vertices = new Float32Array([
    0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);
    var n = 3; // The number of vertices
    //Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log("Failed to create the buffer object");
        return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices),gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, flase, 0,0);
    gl.enableVertextAttribArray(a_Position);
    gl.drawArrays(gl.TRIANGLES,0,n);
    //return n;
}