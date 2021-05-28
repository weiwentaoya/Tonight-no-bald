const defAttr=()=>({
    gl: null,
    vertices:[],
    geoData:[],
    size:2,
    attrName:'',
    count:0,
    circleDot:true,
    u_IsPOINTS:null,
    types:['POINTS'],
})
export default class Poly{
    constructor(attr){
        Object.assign(this,defAttr(),attr)
        this.init()
    }
    init() {
        const {gl,size, attrName, circleDot} = this
        if (!gl) return
        // 初始化缓冲区
        const vertexBuffer = gl.createBuffer()
        // 绑定缓冲区
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        // 获取变量
        const a_Postion = gl.getAttribLocation(gl.program, attrName)
        if (circleDot) {
            this.u_IsPOINTS = gl.getUniformLocation(gl.program, "u_IsPOINTS");
        }
        // 将缓冲区对象分配给attribute 变量
        gl.vertexAttribPointer(a_Postion, size, gl.FLOAT, false,0,0)
        // 开启顶点数据的批处理功能
        gl.enableVertexAttribArray(a_Postion)
        this.updateBuffer()
    }
    popVertices(){
        const {vertices,gl,size} = this
        vertices.splice(vertices.length-size, vertices.length)
        this.updateBuffer()
    }
    addVertices(...params){
        const {vertices,gl} = this
        vertices.push( ...params)
        this.updateBuffer()
    }
    setVertices(index,...params){
        const {vertices,gl,size} = this
        const count = index* size
        params.forEach((item,i)=>{
            vertices[count+i]=item
        })
        this.updateBuffer()
    }
    updateBuffer(){
        const {vertices,gl} = this
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices) , gl.STATIC_DRAW)
        this.updateCount()
    }
    updateCount(){
        const {vertices,size} = this
        this.count = vertices.length/size
    }
    updateVertices(params){
        const {geoData, gl} = this
        const vertices = []
        geoData.forEach(data=>{
            params.forEach(key=>{
                vertices.push(data[key])
            })
        })
        this.vertices = vertices
    }
    draw(types=this.types){
        const {count, gl, circleDot,u_IsPOINTS} = this
        for (const type of types) { 
            circleDot&&gl.uniform1f(u_IsPOINTS,type==='POINTS');
            gl.drawArrays(gl[type], 0, count)
        }
    }
}