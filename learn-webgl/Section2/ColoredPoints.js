const VSHADER_SOURCE = `
attribute vec4 a_Position;
void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0; 
}
`

const FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
    gl_FragColor = u_FragColor;
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

    const a_Position = gl.getAttribLocation(gl.program, "a_Position")

    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor)
    }

    // 设置<canvas>的背景色 用齐次坐标表示顶点坐标的时候 只要将最后一个分量赋值为1.0就可以了
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)
}

const g_points = []
const g_colors = []
function click(ev, gl, canvas, a_Position, u_FragColor) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.width/2)/(canvas.width/2)
    y = (canvas.height/2 - (y-rect.top))/(canvas.height/2)

    g_points.push([x,y])
    if(x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0.0 && y < 0.0) {
        g_colors.push([0.0, 1.0, 0.0, 1.0])
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    for(let i = 0; i < g_points.length; i++) {
        let xy = g_points[i]
        let rgba = g_colors[i]

        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0) 
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3])
        
        gl.drawArrays(gl.POINTS, 0, 1)
    }
}