const defAttr = ()=>({
    gl:null,
    vertices:[],
    geoData:[],
    size:2,
    attrName: null,
    count:0,
    types:['POINT'],
    circleDot:false,
    u_IsPOINTS:null,
})
export default class Poly{
    constructor(attr){
        Object.assign(this,defAttr(),attr)
        this.init()
    }
    init(){
        const {gl,size,attrName,circleDot} = this
        const vertexBuffer = gl.createBuffer()
        // 绑定缓冲区对象
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        if (circleDot) {
            this.u_IsPOINTS = gl.getUniformLocation(gl.program, 'u_IsPOINTS')
        }
        const a_Position = gl.getAttribLocation(gl.program, attrName)
        // 将缓冲区分配给一个变量
        gl.vertexAttribPointer(a_Position, size, gl.FLOAT, false, 0, 0)
        this.updateBuffer()
        
        // 开启变量
        gl.enableVertexAttribArray(a_Position)
    }
    addVertices(...params){
        this.vertices.push(...params)
        this.updateBuffer()
    }
    setVertices(ind,...params){
        const {size,vertices} = this
        const i = ind*size
        params.forEach((el,index)=>{
            vertices[i+index] = el
        })
        this.updateBuffer()
    }
    popVertices(){
        const {size,vertices} = this
        const len = vertices.length
        this.vertices.splice(len-size,size)
        this.updateBuffer()
    }
    updateBuffer(){
        const {gl,vertices} = this
        // 将数据写入缓冲区对象
        this.updateCount()
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    }
    updateCount(){
        const {vertices,size} = this
        this.count = vertices.length/size
    }
    draw(types = this.types){
        const {gl,count,vertices,circleDot,u_IsPOINTS } = this
        types.forEach(ele => {
            circleDot&&gl.uniform1f(u_IsPOINTS, ele==='POINTS');
            gl.drawArrays(gl[ele], 0, count)
        });
    }
}