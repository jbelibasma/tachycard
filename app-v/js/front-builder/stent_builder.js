Uluru.prototype.stentBuilder = function (){
    let content = "";
    content += '<h4>Drag the mouse to create a rectangle</h4>'
    content += '<div id = "canvasWrapper" style="position: relative">'
    content += '    <canvas id="overlay" width=300 height=300 style="position: absolute;border: 1px solid red"></canvas>'
    content += '    <canvas id="canvas" width=300 height=300 style="position: absolute;border: 1px solid red"></canvas>'
    content += '</div>'
    return content;
}
