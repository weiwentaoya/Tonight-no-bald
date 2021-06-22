export function initShaders(gl, vsSource, fsSource) {
    // 创建程序对象
    const program = gl.createProgram()
    // 建立着色对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // 把顶点着色器装进程序对象中
    gl.attachShader(program, vertexShader)
    // 把片元着色器装进程序对象中
    gl.attachShader(program, fragmentShader)
    // 连接wengl上下文对象和程序对象
    gl.linkProgram(program)
    // 启动程序对象
    gl.useProgram(program)
    // 挂载到上下文
    gl.program= program
    return true
}
function loadShader(gl, type, source) {
    // 建立着色器对象
    const shader = gl.createShader(type)
    // 将着色器源文件传入着色器对象中
    gl.shaderSource(shader, source)
    // 编译着色器对象
    gl.compileShader(shader)
    return shader
} 
export function getMousePosInWebgl(event,dom) {
    const {offsetX, offsetY} = event
    const { width, height} = dom.getBoundingClientRect()
    const [cssW, cssY] = [width/2, height/2]
    const [x,y] = [(offsetX-cssW)/cssW, (cssY-offsetY)/cssY]
    return [x,y]
}