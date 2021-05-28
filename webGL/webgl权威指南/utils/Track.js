export default class Track{
    constructor(target){
        this.target = target
        this.parent = null
        this.start = 0
        this.timeLen = 5
        this.loop = false
        this.keys = new Map()
    }
    update(t){
        const {target,start,loop,timeLen,keys} = this
        let timer = t- start
        if (loop) {
            timer = timer%timeLen
        }
        for (const [key,fms] of keys.entries()) {
            const last =fms.length-1 
            if (timer<fms[0][0]) {
                target[key] = fms[0][1]
            }else if(timer>fms[last][0]){
                target[key] =fms[last][1]
            }else{
                target[key] =getValBetweenFms(timer,fms,last)
            }
        }
        
    }
}
function getValBetweenFms(timer,fms,last) {
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