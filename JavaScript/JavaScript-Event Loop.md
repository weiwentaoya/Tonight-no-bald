# JavaScript事件循环机制&Vue.$nextTick()

## 前言

由于JavaScript的主要用途是与浏览器交互，以及操作DOM，所以为了避免复杂性，从一诞生，JavaScript就是单线程。在H5中可以创建多个线程了，但是子线程也是完全受控于主线程的。

## Event  Loop

JavaScript中的任务分为同步任务和异步任务，主要运行机制如下：

1. 首先执行所有的同步任务，形成一个执行栈
2. 异步任务执行有了结果，放置在任务队列中（task queue）
3. 执行栈中的同步任务执行完毕，系统自动读取任务列表，执行异步任务的结果
4. 重复第三步



接下来了解以下概念：

- 执行栈：存放同步任务，按顺序执行
- 任务队列：存放异步任务，**异步任务要等执行栈清空后才会执行**，异步任务也分为两类
  - 宏任务：`setInterval()`  、  `setTimeout()` 、`AJAX`
  - 微任务: `new Promise()`   、  `new MutaionObserver()`   、 `async/await`

