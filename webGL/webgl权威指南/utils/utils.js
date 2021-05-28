export function initShader(gl, vsSource, fsSource) {
    // 创建程序对象
    const program = gl.createProgram()
    // 建立着色器对象
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
    // 把顶点着色器对象装进程序对象中
    gl.attachShader(program,vertexShader)
    // 把片元着色器对象装进程序对象中
    gl.attachShader(program,fragmentShader)
    // 链接webgl上下文对象和程序对象
    gl.linkProgram(program)
    // 启动程序对象
    gl.useProgram(program)
    // 把程序对象挂在到上下文
    gl.program = program
}
function loadShader(gl, type, source) {
    // 根据着类型，建立着色器类型
    const shader = gl.createShader(type);
    // 将着色器源文件传入着色器对象中
    gl.shaderSource(shader, source)
    // 编译着色器对象
    gl.compileShader(shader)
    // 返回着色器对象
    return shader
}
export function getPosByMouse(event,dom){
    const {clientX, clientY} = event
    const {left,top,width,height} = dom.getBoundingClientRect();
    const[cssX,cssY]= [clientX-left, clientY-top]
    const [halfWidth, haleHeight] = [width/2, height/2]
    const [x,y] =[(cssX-halfWidth)/halfWidth,(haleHeight-cssY)/haleHeight]
    return {x,y}
}
export function glToCssPos({x, y}, {width,height}){
    
    return {x: x* width/2,y: -y* height/2}
}
export function getValBetweenFms(timer,fms,last) {
    for (let i = 0; i < last; i++) {
        const item = fms[i], next = fms[i+1]
        if (timer>item[0]&&timer<next[0]) {
            const t = next[0]-item[0]
            const l = next[1]-item[1]
            const s = l/t
            return s*(timer-item[0])+item[1]
        }
    }
}
export function throttle(func, delay) {            
    　　var prev = Date.now();            
    　　return function() {                
    　　　　var context = this;                
    　　　　var args = arguments;                
    　　　　var now = Date.now();                
    　　　　if (now - prev >= delay) {                    
    　　　　　　func.apply(context, args);                    
    　　　　　　prev = Date.now();                
    　　　　}            
    　　}        
    } 