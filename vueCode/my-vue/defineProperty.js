function defineReactive(obj, key , value) {
    Observe(value)
    Object.defineProperty(obj,key,{
        get(){
            console.log('get:', value);
            return value
        },
        set(newVal){
            if (newVal!==value) {
                console.log('set:', newVal);
                Observe(newVal)
                value = newVal
            }
        }
        
    })
}
function Observe(obj) {
    if (typeof obj === 'object' ) {
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key])
        })
    }
}
function set(obj,key,val) {
    defineReactive(obj,key,val)
}
