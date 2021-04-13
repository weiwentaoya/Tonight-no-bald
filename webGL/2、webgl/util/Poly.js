const defAttr =()=>({
    gl:null,
    vertices:[],
    geoData:[],
    size:2,
    attrName:'a_Position',
    count:1,
    types:['POINTS'],
    circleDot: false,
    u_IsPOINTS: null
})
export default class Poly{
    constructor(attr){
        Object.assign(this,defAttr(),attr)
        this.init()
    }
    init(){
        const {attrName, count, size, gl, circleDot } = this
        if (!gl) return
        // 创建缓冲区对象
        const vertexBuffer = gl.createBuffer()
        // 绑定缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        // 获取a_Position变量
        const a_Position = gl.getAttribLocation(gl.program,attrName)
        if (circleDot) {
            this.u_IsPOINTS = gl.getUniformLocation(gl.program,'u_IsPOINTS')
        }
        this.updateBuffer()
        // 修改a_Position变量的值
        gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
        // 开启顶点数据的批处理功能
        gl.enableVertexAttribArray(a_Position)
    }
    updateBuffer(){
        const {gl, vertices} =this
        console.log(vertices);
        
        this.updateCount()
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    }
    updateCount(){
        this.count = this.vertices.length/this.size
    }
    addVertices(...params){
        this.vertices.push(...params)
        this.updateBuffer()
    }
    popVertices(){
        const {size, vertices} =this
        const len = vertices.length
        console.log(vertices);
        vertices.splice(len-size, len)
        console.log(vertices);
        this.updateCount()
    }
    setVertices(ind,...params){
        const {size, vertices} =this
        const i = ind*size
        params.forEach((param, paramId)=>{
            vertices[i+paramId] = param
        })
    }
    updateVertices(params){
        const {geoData} = this
        const vertices = []
        geoData.forEach(data=>{
            params.forEach(key=>{
                vertices.push(data[key])
            })
        })
        this.vertices = vertices
        
    }
    draw(types=this.types){
        const {gl,count,circleDot, u_IsPOINTS} = this
        for (const type of types) {
            circleDot&&gl.uniform1f(u_IsPOINTS,type==='POINTS')
            gl.drawArrays(gl[type],0,count)
        }
    }
}