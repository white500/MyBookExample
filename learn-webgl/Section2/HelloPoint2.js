const VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
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

    const a_Postion = gl.getAttribLocation(gl.program, 'a_Position')
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')

    if (a_Postion < 0 || a_PointSize < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    gl.vertexAttrib3f(a_Postion, 0.0, 0.0, 0.0)
    gl.vertexAttrib1f(a_PointSize, 20.0)

    // 设置<canvas>的背景色 用齐次坐标表示顶点坐标的时候 只要将最后一个分量赋值为1.0就可以了
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);
}