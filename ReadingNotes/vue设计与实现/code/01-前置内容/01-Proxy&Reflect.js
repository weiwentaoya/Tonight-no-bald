// const obj = { foo: 'bar'}

// const p = new Proxy(obj, {
//   get: (target, property, receiver) => {
//     // 当执行p.foo时，会触发代理对象中的get方法
//     // 此时 target为obj、property为foo、receiver为p
//     // get返回值会成为p.foo的值
//     // return 'foo' // p.foo的值为 'foo'
//     return target[property]
//   }
// })

// console.log(p.foo)


// const obj = {}

// const p = new Proxy(obj, {
//   set: (target, property, value, receiver) => {
//     const val = property[target] // 先获取一次旧的value
//     if (val === value) {
//       // 若设置的value和旧的value相同则不需要去做重复的工作
//       // 当然不做这一步判断也是没有问题的
//       return true
//     }
//     // 设置属性值
//     target[property] = value
//     // 返回true表示设置成功
//     return true
//   }
// })
// p.foo = 'bar'
// console.log(p) // Proxy {foo: 'bar'}
// console.log(obj) // {foo: 'bar'}


// const obj = { foo: 'bar', bar: undefined}

// const p = new Proxy(obj, {
//   has: (target, key) => {
//     return key in target
//   }
// })

// console.log('foo' in p) // true
// console.log('bar' in p) // true
// console.log('toString' in p) // true
// console.log('noValue' in p) // false


// const obj = { foo: 'bar'}

// const p = new Proxy(obj, {
//   deleteProperty: (target, key) => {
//     delete target[key]
//     return true
//   }
// })

// delete p.foo

// console.log(obj); // {}

// const obj = {}

// const p = new Proxy(obj, {
//   setPrototypeOf: (target, prototype) => {
//     console.log(target, prototype);
//     Object.setPrototypeOf(target, prototype)
//     return true
//   }
// })
// Object.setPrototypeOf( p, { a: 0 })
// console.log(obj.__proto__) // {a: 0}


// const bar = { name: 'bar'}

// let args = null
// const p = new Proxy(bar, {
//   get: (target, key, receiver) => {
//     args=[target, key, receiver]
//     return target[key]
//   }
// })


// console.log(p.name) // bar
// console.log(args); // [ {name: "bar"}, "name", Proxy {name: 'bar'} ]
// const foo = { 
//   _name: 'foo',
//   get name(){
//     return this._name
//   }
// }
// let args = null
// const p = new Proxy(foo, {
//   get: (target, key, receiver) => {
//     args=[target, key, receiver]
//     return target[key]
//   }
// })

// const bar = { _name: 'bar', __proto__: p}

// console.log(bar.name) // foo
// console.log(args); // [ {_name: 'foo'}, "name", {_name: 'bar'} ]

// const foo = { 
//   _name: 'foo',
//   get name(){
//     return this._name
//   }
// }

// const bar = { _name: 'bar', __proto__: foo}

// console.log(bar.name) // bar