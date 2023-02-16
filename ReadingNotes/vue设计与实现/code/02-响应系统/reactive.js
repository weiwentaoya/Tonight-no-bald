export function reactive(target) {
  const handle = {
    get(target, key, receiver){
      // 收集依赖
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const val = Reflect.get(target, key, receiver)
      // 判断若新值和旧值相等则不做操作,但是要保证set返回true，表示设置成功
      if (val === value) return true
      Reflect.set(target, key, value, receiver)
      // 触发更新
      trigger(target, key, value)
      return true
    }
  }
  return new Proxy(target, handle)
}

// 正在执行的副作用函数，在状态的
let activeEffect = null

//副作用函数栈，当effect函数嵌套使用时有可能会出现副作用函数覆盖的问题
const  effectStack = []



export function effect(fn,options = {}) {
  const effectFn = ()=>{
    clearup(effectFn)
    // 副作用函数
    effectStack.push((activeEffect = effectFn))
    let res = fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length-1]
    return res
  }

  effectFn.deps = []
  effectFn.options = options
  if (!options.lazy) {
    effectFn()
  }
  return effectFn
}

// 数据依赖容器
const bucket = new WeakMap()
// 键 为target对象
// 值 Map对象，存储，每个key与对应的effect函数集合



// 收集依赖
function track(target, key) {
  // 若没有副作用函数，则不用收集
  if (!activeEffect) return
  // 获取当前目标对象下的依赖，数据类型为Map()
  let deps = bucket.get(target)
  if (!deps) {
    // 若当前对象还没有收集过依赖，则创建一个Map数据并设置到当前对象
    bucket.set(target, (deps = new Map()))
  }
  // 在deps中通过key值获取，属性收集到对应的effect
  let effects = deps.get(key)
  if (!effects) {
    // 同理，若没有获取到effects,则当前key未曾被收集过依赖，创建一个Set数据并设置到当前属性
    deps.set(key, effects = new Set())
  }
  // 将副作用函数设置到当前属性的依赖集合中
  effects.add(activeEffect)

  // 反向依赖
  // effects 是触发当前属性get时所收集到的所有依赖方法
  // activeEffect 是 是触发当前属性get时所收集到的单个正在执行中的依赖方法
  // 每一个副作用函数都会反向收集触发响应属性的所有副作用函数
  // 而这里的目的是需要清除
  // 当当前正在执行中的依赖被触发时重新收集 
  activeEffect.deps.push(effects)
}

//触发更新
function trigger(target, key, value) {
  console.log('trigger', key, value);
  const deps = bucket.get(target)
  if (!deps) return
  const effects = deps.get(key)
  if (effects) {
    const effectFnS = new Set(effects)
    effectFnS && effectFnS.forEach(effect => {
      if (activeEffect !== effect) {
        if (effect.options.scheduler) {
          effect.options.scheduler(effect)
        }else{
          effect()
        }
      }
    });

  }
}


function clearup(fn){
  // 清除依赖
  // 首先要明确到这里的 fn 是当前正在执行的 effectFn
  // fn.deps 是 单个属性所以对应的所有的副作用函数，而 正在执行的 effectFn也是包含其中
  // 将当前的effectFn函数从其中删除，取消依赖
  // 而触发跟新时会执行effectFn，会重新再次收集依赖
  fn.deps.forEach(effect=>{
    effect.delete(fn)

  })
  fn.deps.length = 0
}