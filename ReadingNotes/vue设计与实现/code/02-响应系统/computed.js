import {  effect } from './reactive.js'

export function computed(fn) {
  
  let dirty = true, value
  const getValue =  effect(fn, {
    scheduler: fn=>{
      fn()
      dirty = true
    },
    lazy: true
  })


  
  const obj = {
    get value(){
      if (dirty) {
        dirty = false
        value = getValue()
      }
      return value
    }
  }
  return obj
}