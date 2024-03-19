const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0; 
}
`

const FSHADER_SOURCE = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

function main() {
    // 获取<canvas>元素
    /** @type { HTMLCanvasElement } */
    const canvas = document.getElementById("webgl");

    // 获取WebGL绘图上下文
    /** @type { WebGLRenderingContext } */
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }
   
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position)
    }

    // 设置<canvas>的背景色 用齐次坐标表示顶点坐标的时候 只要将最后一个分量赋值为1.0就可以了
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)
}

const g_points = [];
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    const rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left)-canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y - rect.top))/(canvas.height/2)

    g_points.push(x)
    g_points.push(y)

    gl.clear(gl.COLOR_BUFFER_BIT)

    for (let i = 0; i < g_points.length; i+=2) {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0)

        gl.drawArrays(gl.POINTS, 0, 1)
    }
}