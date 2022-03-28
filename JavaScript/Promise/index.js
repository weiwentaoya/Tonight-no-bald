
const MyPromise = require('./myPromise')


// console.log(MyPromise);



// const res = new MyPromise((resolve, reject)=>{
    // resolve('成功')
    // setTimeout(()=>{
    //     resolve('成功')
    // },2000)
    // reject('失败')
// })

// res.then( res=>{
//     console.log(1, res);
//     return new MyPromise((resolve, reject)=>{
//         // resolve('成功111')
//         reject('失败111')
//     })
// }, err=>{
//     console.log(1, err);
// }).then(res=>{
//     console.log(res);
//     return 100
// },err=>{
//     console.log('err', err);
    
// }).then( res=>{
//     console.log( res);
// })


// var p1 = res.then(val=>{
//     console.log(37, val);
//     return p1
// }).then(val=>{
//     console.log(40, val);
// },err=>{
//     console.log('err',err);
// })

// res.then( res=>{
//     console.log(2, res);
// }, err=>{
//     console.log(2, err);
// })

// res.then( res=>{
//     console.log(3, res);
// }, err=>{
//     console.log(3, err);
// })



// const p1 = new Promise((resolve, reject)=>{
//     resolve('ok')
// })
// const p1res = p1.then(val=>{
//     console.log(val);
    
//     return p1res
// })

// const res = new MyPromise((resolve, reject)=>{
//     throw new Error('executor error')
// })

// res = new MyPromise((resolve, reject)=>{
//     // resolve('100')
//     reject('74 error')
// })
// res
// .then()
// .then(res=>{
//     console.log('res', 80, res);
// },err=>{
//     console.log('err', 82, err);
// })

const p1 = new MyPromise((resolve, reject)=>{
    resolve('111')
})
// const p2 = new MyPromise((resolve, reject)=>{
//     setTimeout(()=>{
//         resolve('222')
//     },3000)
// })
const p3 = new MyPromise((resolve, reject)=>{
    reject('333')
})

// MyPromise.all([p1, 'a',  p2, p3]).then(res=>{
//     console.log('res', res);
// },err=>{
//     console.log('err', err);
// })

MyPromise.resolve(p1).then(res=>{
    console.log('res', res);
})
MyPromise.reject(p3).then(res=>{
    console.log('res', res);
},err=>{
    console.log('err', err);
    
})