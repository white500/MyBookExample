
function main() {
    // 获取canvas元素
    /** @type { HTMLCanvasElement } */
    const canvas = document.getElementById("example")
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
    }

    // 获取绘制二维图形的绘图上下文
    const ctx = canvas.getContext('2d')

    // 绘制蓝色矩形
    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
    ctx.fillRect(120, 10, 150, 150);
}