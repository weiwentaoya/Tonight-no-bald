// import _ from 'lodash'
const _ = require('lodash')

const getnum = _.curry((a,b,c)=>a+b+c)

console.log(getnum(1,3,5));
console.log(getnum(1,3)(5));
console.log(getnum(1)(3,5));
console.log(getnum(1)(3)(5));
