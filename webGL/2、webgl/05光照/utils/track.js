export default class Track{
    constructor(target){
        this.target = target
        this.parent = null
        this.start = 0
        this.timeLen = 5
        this.loop = false
        this.keyMap = new Map()
    }
    update(t){
        const {target, start, timeLen, loop, keyMap} = this
        let timer =  t-start
        if (loop) {
            timer = timer%timeLen
        }
        for (const [key,value] of keyMap.entries()) {
            const last = value.length-1
            if (timer<=value[0][0]) {
                target[key] = value[0][1]
            }else if (timer>=value[last][0]) {
                target[key] = value[last][1]
            }else{
                target[key] =getValBetweenFms(timer,value,last)
            }
        }
    }
}
function getValBetweenFms(timer,value,last) {
    for (let i = 0; i < last; i++) {
        const item = value[i]
        const next = value[i+1]
        if (timer>item[0]&&timer<next[0]) {
            const s = (next[1]-item[1])/(next[0]-item[0])
            return (timer-item[0])*s+item[1]
        }
    }
}