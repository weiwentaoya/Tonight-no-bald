
export function initShaders(gl, vsSource, fsSource) {
    // 创建程序对象
    const program = gl.createProgram()
    // 初始化顶点着色器和片元着色器
    //gl.VERTEX_SHADER是顶点着色器类型
    // gl.FRAGMENT_SHADER是片元着色器类型
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const framnebtShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    // 将顶点着色器对象装进程序对象中
    gl.attachShader(program, vertexShader)
    // 将片元着色器装进程序对象中
    gl.attachShader(program, framnebtShader)
    // webgl对象与程序对象建立连接
    gl.linkProgram(program)
    // 启动程序对象
    gl.useProgram(program)
    gl.program = program
}
function loadShader(gl, type, source) {
    // 根据着色器类型，建立着色器对象
   const shader = gl.createShader(type)
    //将着色器源文件传入着色器对象中
   gl.shaderSource(shader, source)
    //编译着色器对象
   gl.compileShader(shader)
   return shader
}
