const pending = 'PEMDIMG' //等待
const fulfilled = 'FULFILLED' //成功
const rejected = 'REJECTED' //失败

/*
*   executor执行器，传入resolve和reject两个方法
*   status为保存Promise的状态，有三个值。等待、成功、失败。不可逆
*   value成功传入的值
*   reason失败传入的原因
*   resolveCallbackS在异步或者先调用then方法时的情况下，需要保存传入的成功回调函数
*   rejectCallbackS在异步或者先调用then方法时的情况下，需要保存传入的失败回调函数
*/
class MyPromise{
    constructor(executor){
        this.status = pending //Promise的状态
        this.value = null
        this.reason = null
        this.resolveCallbackS = []
        this.rejectCallbackS = []
        try {
            executor(this.resolved, this.rejected)
        } catch (error) {
            this.reject(error)
        }

    }
    resolved = value=>{
        if (this.status !== pending) return
        this.status = fulfilled
        this.value = value
        while (this.resolveCallbackS.length) this.resolveCallbackS.shift()()
        // this.runCbs()
    }
    rejected = reason => {
        if (this.status !== pending) return
        this.status = rejected
        this.reason = reason
        this.runCbs()
    }
    runCbs(){
        if (this.status === fulfilled) {
            this.resolveCallbackS.forEach(cb=>cb())
            this.resolveCallbackS=[]
        }else if (this.status === rejected) {
            this.rejectCallbackS.forEach(cb=>cb())
            this.rejectCallbackS=[]
        }
    }
    then(resolveCallback=val=>val, rejectCallback=err=>{throw err}){
        var resPromise = new MyPromise((resolve, reject)=>{
            if (this.status === fulfilled) {
                try {
                    const res = resolveCallback(this.value)
                    resolvePromise(res, resPromise, resolve, reject)
                } catch (error) {
                    this.reject(error)
                }
            }else if (this.status === rejected) {
                try {
                    const res = rejectCallback(this.reason)
                    resolvePromise(res, resPromise, resolve, reject)
                } catch (error) {
                    this.reject(error)
                }
            }else{
                this.resolveCallbackS.push(()=>{
                    try {
                        resolveCallback(this.value)
                    } catch (error) {
                        this.reject(error)
                    }
                })
                this.rejectCallbackS.push(()=>{
                    try {
                        rejectCallback(this.reason)
                    } catch (error) {
                        this.reject(error)
                    }
                })
            }
        })
        return resPromise
    }
    catch( rejectCallback=err=>{throw err}){
       return this.then(undefined, rejectCallback)
    }
    static all = promiseList=>{
        let count = 0
        return new MyPromise((resolve, reject)=>{
            const resList = []
            // const resList = new Array(promiseList.length).fill(null)
            for (let i = 0; i < promiseList.length; i++) {
                const el = promiseList[i];
                if (el instanceof MyPromise) {
                    el.then(res=>{
                        resList[i] = res
                        count === promiseList.length&&resolve(resList)
                        // resList.every(item=>item) &&resolve(resList)
                    },err=>{
                       return reject(err)
                    })
                }else{
                    resList[i] = el
                }
                count++
            }
        })
    }

    static resolve(val){
        if (val instanceof MyPromise) {
            return val
        }else{
            return new MyPromise(resolve=>resolve(val))
        }
        
    }
    static reject(reason){
        if (reason instanceof MyPromise) {
            return reason
        }else{
            return new MyPromise((r, reject)=>reject(reason))
        }
    }
}

function resolvePromise(res,resPromise, resolve, reject) {
    if (res === resPromise) return reject('error')
    if (res instanceof MyPromise) {
        res.then(resolve, reject)
    }else{
        resolve(res)
    }
}
module.exports = MyPromise