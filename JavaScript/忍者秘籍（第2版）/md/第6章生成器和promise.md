# 生成器和promise
`生成器是一种特殊类型的函数。当从头到尾运行标准函数时，只能生成一个值。然而生成器函数会在几次运行请求中暂停，因此每次运行都可能会生成一个值。`

`promise对象是一个占位符，暂时替代那些尚未计算出但未来会计算出的值。`

## 使用生成器函数

生成器函数几乎是一个完全崭新的函数类型，它和标准的普通函数完全不同。生成器函数能生成一组值的序列，但每个值的生成是基于每次请求，并不同于标准函数那样立即生成。我们必须显示地向生成器请求一个新的值，随后生成器要么响应一个新生成的值，要么就告诉我们它之后都不会再生成新值。生成器几乎从不挂起，当对另一个值的请求到来后，生成器就会从上次离开的位置恢复执行。

举个🌰

```js
function* WeaponGenerator(){
    yield "Katana";
    yield "Wakizashi";
    yield "Kusarigama";
}

for(let weapon of WeaponGenerator()) {
  assert(weapon !== undefined, weapon);
}

function assert(value, text){
  value&&console.log(text)
}

// Katana
// Wakizashi
// Kusarigama
```

首先定义一个生成器，，能够生成一系列武器的数据。创建一个生成器函数非常简单：只需要在关键字function后面加上一个星号(*)。这样生成器函数体内就能够使用关键字yield，从而生成独立的值。

### 通过迭代器对象控制生成器

调用生成器函数不一定会执行生成器函数体。通过创建迭代器对象，可以与生成器通信。

举个🌰

```js
let num = 0
function* WeaponGenerator(){
  console.log(++num);
  yield "Katana";
  console.log(++num);
  yield "Wakizashi";
  console.log(++num);
}

const weaponsIterator = WeaponGenerator();

const result1 = weaponsIterator.next();
assert(typeof result1 === "object" && result1.value === "Katana" && !result1.done,
       "Katana received!");

const result2 = weaponsIterator.next();
assert(typeof result2 === "object" && result2.value === "Wakizashi" && !result2.done,
       "Wakizashi received!");

const result3 = weaponsIterator.next();
assert(typeof result3 === "object" && result3.value === undefined && result3.done,
       "There are no more results!");
function assert(value, text){
  value&&console.log(text)
}


// 1
// Katana received!
// 2
// Wakizashi received!
// 3
// There are no more results!

```

调用生成器后，就会创建一个迭代器(iterator)

迭代器用于控制生成器的执行。迭代器对象暴露的最基本接口是next方法。这个方法可以用来向生成器请求一个值，从而控制生成器：

next函数调用后，生成器就开始执行代码，当代码执行到yield关键字时，就会生成一个中间结果（生成值序列中的一项），然后返回一个新对象，其中封装了结果值和一个指示完成的指示器。

每当生成一个当前值后，生成器就会非阻塞地挂起执行，随后耐心等待下一次值请求的到达。

以上代码，第一次调用生成器的next方法让生成器代码执行到第一个yield表达式` yield "Katana";`，然后返回一个对象。该对象的属性value值为 Katana ，done属性值为false，表示还有值会生成。

随后，在次调用weaponsIterator.next()，再次向生成器请求另一个值

该操作操作将生成器从挂起状态唤醒，中断执行的生成器从上次离开的位置继续执行代码，直到再次遇到另一个yield

#### 对迭代器进行迭代

通过调用生成器得到的迭代器，暴露出一个next方法能让我们向迭代器请求一个新值。next方法返回一个携带生成值的对象，而该对象中包含的另一个属性done也向我们指示了生成器是否还会追加生成值。

利用这一原理，用普通的while循环累迭代生成器生成的值序列

举个🌰

```js
function* WeaponGenerator(){
  yield "Katana";
  yield "Wakizashi";
}

const weaponsIterator = WeaponGenerator();
var item;
while(!(item = weaponsIterator.next()).done) {
  assert(item !== null, item.value);
}

function assert(value, text){
  value&&console.log(text)
}

// Katana
// Wakizashi
```

本例中，首先通过调用生成器函数创建了一个迭代器对象。

还创建了一个变量item，用于保存生成器生成的单个值，随后，我们给while循环制定了条件。

每次迭代中，通过调用迭代器`weaponsIterator.next()`方法从生成器中取一个值，然后把值存放在item变量中。和所有next返回的对象一样，item变量引用的对象中包含一个属性value为生成器返回的值，一个属性done指示生成器是否已经完成了值的生成。如果生成器中的值没有生成完毕，我们就会进入下次迭代，反之停止循环

**这就是生成器实例中for-of循环的原理。for-of循环不过是对迭代器进行迭代的语法糖。不同于手动调用迭代器的next方法，for-of循环同时还要查看生成器是否完成，它在后台自动做了完全相同的工作。**

#### 嵌套生成器

像标准函数中调用另一个函数，也可以吧生成器的执行委托到另一个生成器。

举个🌰

```js
function* WarriorGenerator(){
  yield "Sun Tzu";
  yield* NinjaGenerator();
  yield "Genghis Khan";
}

function* NinjaGenerator(){
  yield "Hatori";
  yield "Yoshi";
}

for(let warrior of WarriorGenerator()){
  assert(warrior !== null, warrior);
}

function assert(value, text){
  value&&console.log(text)
}


// Sun Tzu
// Hatori
// Yoshi
// Genghis Khan
```

在迭代器上使用` yield* `操作符，程序会跳转到另外一个生成器上执行。

### 使用生成器

#### 用生成器生成ID

在创建对象时，经常需要为其赋一个唯一的ID值。通常最简单的是通过一个全局的变量，但这并不是完美的写法，因为全局变量很容易就会淹没在代码中，甚至发生冲突。使用生成器可以解决这一问题。

```js
function *IdGenerator(){
  let id = 0;
  while(true){
    yield ++id;
  }
}

const idIterator = IdGenerator();

const ninja1 = { id: idIterator.next().value };
const ninja2 = { id: idIterator.next().value };
const ninja3 = { id: idIterator.next().value };

assert(ninja1.id === 1, "First ninja has id 1");
assert(ninja2.id === 2, "Second ninja has id 2");
assert(ninja3.id === 3, "Third ninja has id 3");

function assert(value, text){
  value&&console.log(text)
}

// First ninja has id 1
// Second ninja has id 2
// Third ninja has id 3

```

上述代码中生成器函数中包含了一个局部变量id，然后是while循环，每次迭代都能生成一个新的ID值并执行挂起，直到下一次id请求到达。

这样方法就简单了，代码中没有会被不小心修改的全局变量。只需要使用迭代器从生成器函数中请求值。

#### 使用迭代器遍历DOM树

网页布局是基于DOM结构的，它是由HTML节点组成的树形结构，遍历DOM的相对简单方式就是实现一个递归函数，在每次访问节点的时候都会被执行

```html
 <div id="subTree">
    <form>
      <input type="text"/>
    </form>
    <p>Paragraph</p>
    <span>Span</span>
  </div>
<script>
  function traverseDOM(element, callback) {
    callback(element);
    console.log(element);
    // console.log('.firstElementChild', element.firstElementChild);

    element = element.firstElementChild;
    while (element) {
      console.log('element',element);
      traverseDOM(element, callback);
      element = element.nextElementSibling;
    }
  }

  const subTree = document.getElementById("subTree");
  traverseDOM(subTree, function(element) {
    assert(element !== null, element.nodeName);
  });

  function assert(value, text){
    value&&console.log(text)
  }
  
  
  // DIV
  // FORM
  // INPUT
  // P
  // SPAN
</script>


```

以上代码使用递归函数来遍历subTree下的所有节点，现在可以使用生成器来实现

🌰

```html
<div id="subTree">
  <form>
    <input type="text"/>
  </form>
  <p>Paragraph</p>
  <span>Span</span>
</div>

<script>
  function* DomTraversal(element){
    yield element;
    element = element.firstElementChild;
    while (element) {
      yield* DomTraversal(element);
      element = element.nextElementSibling;
    }
  }

  const subTree = document.getElementById("subTree");
  for(let element of DomTraversal(subTree)) {
    assert(element !== null, element.nodeName);
  }
  function assert(value, text){
    value&&console.log(text)
  }
  
  
  // DIV
  // FORM
  // INPUT
  // P
  // SPAN
</script>
```

以上代码展示了通过生成器实现DOM遍历，和递归一样简单。不同于在下一层递归处理每个访问过的节点子树，我们为每个访问过的节点创建了一个生成器并将执行权交给它，从而能够以迭代的方式书写概念上递归的代码。这样我们就可以用for-of循环处理生成的节点了

### 与生成器交互

生成器功能比较强大，我们还能向生成器发送值，从而实现双向通信！

#### 作为生成器函数参数发送值

像普通函数一样，调用函数时传入实参。除了在第一次调用生成器的时候向生成器提供数据，我们还能通过next方法向生成器传入参数。在这个过程中，生成器函数从挂起状态恢复到执行状态。在当前挂起的生成器中，生成器把这个传入的值用于整个yield表达式。

举个🌰

```js
function* NinjaGenerator(action) {
  const imposter = yield ("Hatori " + action);

  assert(imposter === "Hanzo","The generator has been infiltrated");

  yield ("Yoshi (" + imposter + ") " + action);
}

const ninjaIterator = NinjaGenerator("skulk");

const result1 = ninjaIterator.next();
assert(result1.value === "Hatori skulk", "Hatori is skulking");

const result2 = ninjaIterator.next("Hanzo");
assert(result2.value === "Yoshi (Hanzo) skulk", "We have an imposter!");

function assert(value, text){
  value&&console.log(text)
}

// Hatori is skulking
// The generator has been infiltrated
// We have an imposter!
```

上述实例，首次调用ninjaIterator.next()向生成器请求了一个新值，在yield表达式的位置返回了"Hatori skulk"，并挂起执行。第二次调用ninjaIterator.next("Hanzo")又请求了一个新值，但同时向生成器发送了实参"Hanzo"。这个只会在整个yield表达式中使用。同时，imposter遍历也就变成了字符串"Hanzo"

#### 向生成器抛出异常

一种稍微不正统的方式应用到生成器上：通过抛出一个异常。每个迭代器除了有一个next方法，还抛出一个方法。

```js
function* NinjaGenerator() {
  try{
    yield "Hatori";
    fail("The expected exception didn’t occur");
  }
  catch(e){
    assert(e === "Catch this!", "Aha! We caught an exception");
  }
}

const ninjaIterator = NinjaGenerator();

const result1 = ninjaIterator.next();
assert(result1.value === "Hatori", "We got Hatori");

ninjaIterator.throw("Catch this!");

function assert(value, text){
  value&&console.log(text)
}

// We got Hatori
// Aha! We caught an exception
```

上述代码中通过try-catch包裹了函数体。通过创建迭代器继续执行，最后，通过使用throw方法，向生成器抛出了一个异常。

### 探索生成器内部构成

我们已经知道了调用一个生成器实际不会执行它。相反，它创建了一个新的迭代器，通过该迭代器我们才能从生成器中请求值。在生成器生成了一个值后，生成器会挂起执行并等待下一个请求的到来。

- 挂起开始——创建了一个生成器后，它最先以这种状态开始。其中的任何代码都未执行。
- 执行——生成器中的代码已执行。执行要么是刚开始，要么是上次挂起的时候继续的。当生成器对应的迭代器调用了next方法，并且当前存在可执行的代码时，生成器都会转移到这个状态。
- 挂起让渡——当生成器在执行过程中遇到了一个yield表达式，他会创建一个包含着返回值的新对象，随后再挂起执行。生成器在这个状态暂停并等待继续执行
- 完成——在生成器执行期间，如果代码执行到return语句或者全部代码执行完毕。

用🌰看看生成器是如何跟随执行环境上下文的

```js
function * NinjaGenerator(){
  yield "Hattori";
  yield "Yoshi";
}

const ninjaIterator = NinjaGenerator()
const result1 = ninjaIterator.next()
const result2 = ninjaIterator.next()
const result3 = ninjaIterator.next()
```

上述代码执行过程，生成器在相对应的生成器调用next函数之间移动状态

1. `const ninjaIterator = NinjaGenerator()`

   创建生成器函数从挂起状态开始

2. `const result1 = ninjaIterator.next()`

   激活生成器，从挂起状态转为执行状态。执行到`yield "Hattori";`语句中止，进而转为挂起让渡状态返回`{value:"Hattori", done: false}`

3. `const result2 = ninjaIterator.next()`

   重新激活生成器，从挂起状态转为执行状态。执行到`yield "Yoshi";`语句中止，进而转为挂起让渡状态返回`{value:"Yoshi", done: false}`

4. `const result3 = ninjaIterator.next()`

   重新激活生成器，从挂起状态转为执行状态。没有代码可以执行，转为完成状态返回`{value:undefined, done: true}`

执行环境上下文。它是一个用于跟踪函数的执行的JavaScript内部机制。

#### 通过执行上下文跟踪生成器函数

接下来将探索应用的状态，了解在应用执行过程中不同位置上的执行上下文栈。

```js
function * NinjaGenerator(action){
  yield "Hattori "+action;
  return "Yoshi "+action;
}

const ninjaIterator = NinjaGenerator('skulk')
const result1 = ninjaIterator.next()
const result2 = ninjaIterator.next()
```

当我们调用NinjaGenerator函数：

控制流则进入了生成器，和其他函数一样，当前会创建一个新的函数环境上下文，并将该上下文入栈。但生成器比较特殊，它不会执行任何函数代码。而是生成一个新的迭代器从中返回，通过在代码中用ninjaIterator可以用来引用这个迭代器。由于迭代器是用来控制生成器的执行的，故而迭代器中保存着一个在它创建位置处的执行上下文。

当程序从生成器中执行完毕后，一般情况下，当程序从一个标准函数返回后，对应的执行环境上下文会从栈中弹出，并被完整地销毁，但生成器不是这样的。

相对应的NinjaGenerator会从栈中弹出，但由于ninjaIterator还保存着对它的引用，所以它不会被销毁。可以理解为类似闭包的事物。在闭包中，为了在闭包创建的时候可以保证变量都可用，所以函数会对创建它的环境持有一个引用。以这种方式，我们能保证只要函数还存在，环境及变量就都存在着。生成器，从另一个角度看，还必须恢复执行。由于所有函数的执行都被执行上下文所控制，故而迭代器保持了一个对当前环境的引用，保证只要迭代器还需要它的时候它都存在。

当调用迭代器的next方法时发生了另一个有趣的事：

如果这只是一个普通的函数调用，这个语句会创建一个新的next()的执行环境上下文，并放入栈中。但生成器并不标准，对next方法调用的表现也很不同。它会重新激活对应的执行上下文。在上面🌰中是NinjaGenerator上下文，并把该上下文放入栈的顶部，从它上次离开的地方继续执行

**标准函数仅仅会被重复调用，每次调用都会创建一个新的执行环境上下文。相比之下，生成器的执行环境上下文则会暂时挂起并在将会恢复**

在🌰中，由于是第一次调用next方法，而生成器之前并没有执行过，所以生成器开始执行并进入执行状态。当生成器函数运行到这个位置的时候：

生成器函数运行得到的表达式的结果为` "Hattori skulk"`然后运行中又遇到了yield关键字。表明"Hattori skulk"是该生成器的第一个中间值，所以需要挂起生成器的执行并返回该值。从应用状态的角度来看，发生了一件类似前面的事情：NinjaGenerator上下文离开了调用栈，但由于ninjaIterator还持有着对它的引用，故而未被销毁，现在生成器挂起了，又在非阻塞的情况下移动到了挂起让渡状态。程序在全局代码中恢复执行，并将生产出的值存入变量result1。

**在产生了一个值之后，生成器的执行环境上下文就会从栈中弹出（但由于ninjaIterator还持有着对它的引用所以不会销毁），生成器挂起执行（生成器进入挂起让渡状态）**

当遇到另一个迭代器调用时，代码继续执行：

首先通过ninjaIterator激活NinjaGenerator的上下文引用，将其入栈，在上次离开的位置继续执行。运行表达式结果为` "Yoshi skulk"`但是这一次没有在遇到yield表达式，而是遇到了一个return语句。这个语句返回值Yoshi skulk并结束生成器的执行，随之生成器进入结束状态

放我们挖掘生成器的工作原理后可以发现，生成器的特殊为当我们从生成器中取得控制权后，生成器的执行环境上下文一直是保存的，而不是像标准函数一样退出后销毁。

## 深入研究promise

promise对象用于作为异步任务结果的占位符。它代表了一个我们暂时还没获得但在未来有希望获得的值。基于这个原因，在一个promise对象的整个生命周期中，它会经历多种状态。在一个promise对象从等待开始，此时我们对承诺的值一无所知。因此一个等待状态的promise对象也称为未实现的promise。

在程序执行的过程中，如果promise的resolve函数被调用，promise就会进入完成(fulfilled)状态,在该状态下我们能够成功获取到承诺的值。

如果promise的reject函数被调用，或者如果一个未处理的异常在promise调用的过程中发生了，promise就会进入到拒绝状态，尽管在该状态下我们无法获取承诺的值，但我们至少知道了原因。

**一旦某个promise进入到完成状态或者拒绝状态，它的状态都不能再切换了(一个promise对象只能从未完成状态切换到完成态一次)**

### 研究promise的执行顺序

🌰

```js
console.log("At code start");

const ninjaDelayedPromise = new Promise((resolve, reject) => {
  console.log("ninjaDelayedPromise executor");
  setTimeout(() => {
    console.log("Resolving ninjaDelayedPromise");
    resolve("Hatori");
  }, 500);
});

assert(ninjaDelayedPromise !== null, "After creating ninjaDelayedPromise");

ninjaDelayedPromise.then(ninja => {
  assert(ninja === "Hatori", "ninjaDelayedPromise resolve handled with Hatori");
});

const ninjaImmediatePromise = new Promise((resolve, reject) => {
  console.log("ninjaImmediatePromise executor. Immediate resolve.");
  resolve("Yoshi");
});

ninjaImmediatePromise.then(ninja => {
  assert(ninja === "Yoshi", "ninjaImmediatePromise resolve handled with Yoshi");
});

console.log("At code end");

function assert(value, text){
  value&&console.log(text)
}


// At code start
// ninjaDelayedPromise executor
// After creating ninjaDelayedPromise
// ninjaImmediatePromise executor. Immediate resolve.
// At code end
// ninjaImmediatePromise resolve handled with Yoshi
// After creating ninjaDelayedPromise
// ninjaDelayedPromise resolve handled with Hatori
```

上述代码中从打印日志`"At code start"`开始，

接下来通过调用Promise构造函数创建了一个新的promise对象,先执行打印`"ninjaDelayedPromise executor"`然后建立一个计时器，500ms之后先执行打印`"Resolving ninjaDelayedPromise"`操作再调用promise的resolve方法

在ninjaDelayedPromise被创建后，无法得知最终会得到什么值，或者无法保证promise会成功进入完成状态。所以再构造函数调用后，ninjaDelayedPromise就进入了promise的第一个状态——等待状态

然后调用ninjaDelayedPromise的then方法，用于建立一个预计在promise被成功实现后执行的回调函数

这个回调函数总会被异步调用，无论promise当前是什么状态。

接下来我们创建另一个promise——ninjaImmediatePromise，它会在对象构造阶段立刻调用promise的resolve函数，立即完成承诺。不同于ninjaDelayedPromise对象在构造后进入等待状态，ninjaImmediatePromise对象在解决状态下完成了对象的构造，所以该promise对象就已经获得了值`"Yoshi"`

然后通过调用ninjaImmediatePromise的then方法，我们为其注册了一个回调函数，用于在promise成功被解决后调用。然而此时promise已经被解决了，但是这个成功回调函数不会被立即执行。

promise是设计用来处理异步任务的，所以JavaScript引擎经常会借助异步处理promise的行为得以遇见。JavaScript通过在本次事件循环中的所有代码都执行完毕后，调用then回调函数来处理promise。

### 拒绝promise

拒绝一个promise有两种方式：显示拒绝，即在一个promise的执行函数中调用传入的reject方法；隐式拒绝。正处理一个promise的过程中抛出了一个异常。

显示拒绝promise🌰

```js
const promise = new Promise((resolve, reject) => {
  reject("Explicitly reject a promise!");
});

promise.then(
  () => console.log("Happy path, won't be called!"),
  error =>  console.log("A promise was explicitly rejected!")
);
// A promise was explicitly rejected!
```

链式调用catch方法🌰

```js
const promise = new Promise((resolve, reject) => {
  reject("Explicitly reject a promise!");
});

promise.then(() => console.log("Happy path, won't be called!"))
  .catch(() => console.log("Third promise was also rejected"));

// Third promise was also rejected
```

隐式拒绝一个promise🌰

```js
const promise = new Promise((resolve, reject) => {
  undeclaredVariable++;
});

promise.then(() => console.log("Happy path, won't be called!"))
  .catch(error => console.log("The promise was rejected because an exception was thrown!"));

// The promise was rejected because an exception was thrown!
```

### 创建真实的promise案例

客户端最通用的异步任务就是从服务器获取数据。接下来使用内置XMLHttpRequest对象来完成底层的实现

json数据

```json
[
	{
		"name": "Hatori",
		"location": "data/hatori.json",
		"missionsUrl": "data/missions.json"
	},
	{
		"name": "Yoshi",
		"location": "data/yoshi.json",
		"missionsUrl": "data/missions.json"
	}
]
```

🌰

```js
function getJSON(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function() {
      try {
        if(this.status === 200 ){
          resolve(JSON.parse(this.response));
        } else{
          reject(this.status + " " + this.statusText);
        }
      } catch(e){
        reject(e.message);
      }
    };

    request.onerror = function() {
      reject(this.status + " " + this.statusText);
    };

    request.send();
  });
}

getJSON("./url.json").then((ninjas) => {
  assert(ninjas !== null, "Ninjas obtained!");
}).catch(e => fail("Shouldn’t be here:" + e));
```

上述代码创建一个getJSON函数，返回一个promise对象。通过该对象，我们能够在上面注册成功和失败回调函数。

### 链式调用promise

由于promise可以链式调用，所以可以用来解决件套太深将形成难以维护的回调函数序列。

举个🌰

```js
getJSON("data/ninjas.json")
  .then(ninjas => getJSON(ninjas[0].missionsUrl))
  .then(missions => getJSON(missions[0].detailsUrl))
  .then(mission => assert(mission !== null, "Ninja mission obtained!"))
  .catch(error => fail("An error has occured"));
```

如果按计划执行，这段代码会创建一系列promise，一个接一个地被解决。首先使用`getJSON("data/ninjas.json")`方法从服务器中的文件上获取了一个数据列表，然后用数据列表的第一个数据再次请求任务列表`getJSON(ninjas[0].missionsUrl)`。

使用标准回调函数书写上述代码会生成很深的嵌套回调函数序列。很难准确地识别出当前进行到哪一步，在序列中增加了一个额外的步骤也非常棘手。

当处理一连串异步任务步骤的时候，任何一步都可能出现错误。我们既可以通过then方法传递第二个回调函数，也可以链式地调用一个catch方法并向其中传入错误处理回调函数。

如果错误在前面的任何一个promise中产生，catch方法就会捕捉到它。

### 等待多个promise

除了处理相互依赖的异步任务序列以外，对于等待多个独立的异步任务，promise也能够显著地减少代码量。举个🌰

```js
Promise.all(
  [getJSON("data/ninjas.json"),
   getJSON("data/mapInfo.json"),
   getJSON("data/plan.json")]
).then(results => {
  const ninjas = results[0], mapInfo = results[1], plan = results[2];

  assert(ninjas !== undefined && mapInfo !== undefined && plan !== undefined,
         "The plan is ready to be set in motion!");
}).catch(error => fail("A problem in carrying out our plan!"));
```

上述代码，我们不必关心任务执行的顺序，以及它们是不是都已经进入完成态。通过使用内置方法Promise.all可以等待多个promise。这个方法将一个promise数组作为参数，然后创建一个新的promise对象，一旦数组中的promise全部被解决，这个返回的promise就会被解决，而一旦其中有一个promise失败了，那么整个新的promise对象也会被拒绝。后续的回调函数接受成功值组成的数组，数组中的每一项都对应promise数组中的对应项。

### promise竞赛

如果我们只关心第一个成功或失败的promise

举个🌰

```js
Promise.race(
  [getJSON("data/yoshi.json"),
   getJSON("data/hatori.json"),
   getJSON("data/hanzo.json")]
).then(ninja => {
  assert(ninja !== null, ninja.name + " responded first");
}).catch(error => fail("Failure!"));
```

使用Promise.race方法并传入第一个promise数组会返回一个全新的promise，一旦数组中某一个promise被处理或被拒绝，这个返回的promise就同样会被处理或拒绝

## 生成器和promise相结合

接下来我们将结合生成器（以及生成器暂停和恢复执行的能力）和promise，来实现更加优雅的异步代码。

当需要实现需要长期运行且相互依赖的同步代码，有可能会造成UI或代码阻塞。所以我们最好修改这样的代码。将生成器和promise相结合，从生成器中让渡后会挂起执行而不会发生阻塞，而且调用生成器迭代器的next方法就可以唤醒生成器并继续执行。

这个方法将要以如下方式结合生成器和promise：把异步任务放入了一个生成器中，然后执行生成器函数。因为我们没办法知道承诺什时候会被兑现，所以在生成器执行的时候，我们将会执行权让渡给生成器，从而不会导致阻塞。当承诺被兑现，会继续通过迭代器的next函数执行生成器。只要有需要就可以重复这个过程。

🌰

```js
async(function*(){
  try {
    const ninjas = yield getJSON("data/ninjas.json");
    const missions = yield getJSON(ninjas[0].missionsUrl);
    const missionDescription = yield getJSON(missions[0].detailsUrl);

    assert(ninjas !== null && missions !== null && missionDescription !== null, "All ready!");
  }
  catch(e) {
    console.log("We weren't able to get mission details");
  }
});

function async(generator) {
  const iterator = generator();

  function handle(iteratorResult) {
    if(iteratorResult.done) { return; }

    const iteratorValue = iteratorResult.value;

    if(iteratorValue instanceof Promise) {
      iteratorValue.then(res => handle(iterator.next(res)))
        .catch(err => iterator.throw(err))
    }
  }

  try {
    handle(iterator.next());
  }
  catch (e) { iterator.throw(e); }
}

function assert(value, text){
  value&&console.log(text)
}
```

上述代码中async函数获取了一个生成器，调用并创建了一个迭代器用来恢复生成器的执行。在async函数内，声明了一个处理函数用于处理从生成器中返回的值——迭代器的一次迭代。如果生成器的结果是一个被成功兑现的承诺，我们就用迭代器的next方法把承诺的值返回给生成器并恢复执行。如果出现错误，承诺被违背，我们就使用迭代器的throw方法抛出异常。直到生成器的工作完成前，都会一直重复这几个操作。

⚠️在第一次调用迭代器的next方法后，生成器执行第一次`getJSON("data/ninjas.json");`此次调用创建了一个promise，因为这个值是异步获取的，所以不确定何时获取。但是我们不能在等待中阻塞应用的执行。所以对于这个原因，在执行的这一刻，生成器让渡了控制权，生成器暂停，并把控制流还给了回调函数的执行。由于让渡的值是一个promise对象getJSON，在这个回调函数中，通过promise的then和catch方法，注册了一个成功和失败的回调函数，从而继续了函数的执行。然而，控制流就离开了处理函数的执行及async函数的函数体，直到调用async函数后才继续执行。这一次，生成器函数耐心地等待着挂起，也没有阻塞程序的执行。

当浏览器接收到了响应（可能是成功响应，也可能是失败响应），promise的两个回调之一会被调用，当成功时，会执行success函数，随之而来的是迭代器next方法的调用，用于向生成器请求新的值，从而生成器从挂起状态恢复，并把得到的值回传给回调函数。这意味着，程序又重新进入到了生成器函数体内，当第一次执行yield表达式后，得到的值变成了从服务器获取的数据列表。

下一行代码的生成器函数中，我们使用获取到的数据再次发起新的请求，从而创建了一个新的promise对象，最后会返回新的数据。我们仍然无法得知这个异步任务要进行多久，所以我们再一次让渡了这次执行，并重复这个过程。只要生成器中有异步任务，这个过程就会重复一次。

- 函数是第一类对象——我们向async函数传入了一个参数，该参数也是函数
- 生成器函数——用它的特性来挂起和恢复执行。
- promise——帮我们处理异步代码
- 回调函数——在promise对象上注册成功和失败的回调函数
- 箭头函数——箭头函数的简介适合用在回调函数
- 闭包——在我们控制生成器的过程中，迭代器在async函数内被创建，随之我们在promise的回调函数内通过闭包来获取该迭代器

## 总结

生成器是一种不会再同时输出所有值序列的函数，而是基于每次的请求生成值。

不同于标准函数，生成器可以挂起和回复他们的执行状态。当生成器生成了一个值后，它将会在不阻塞主线程的基础上挂起执行，随后静静地等待下次请求

生成器通过在function后面加一个星号（*）来定义。在生成器函数体内，我们可以通过关键字yield来生成一个值并挂起生成器的执行。如果我们想让渡到另一个生成器中，可以使用yield操作符。

在我们控制生成器的执行过程中，通过使用迭代器的next方法调用下一个生成器，它能够创建一个迭代器对象。除此之外，我们还能够通过next函数向生成器中传入值。

promise是计算结果值的一个占位符，它是对我们最终会得到异步计算结果的一个保证。promise既可以成功也可以失败，一旦设定好了，就不能有更多改变

promise显著地简化了我们异步处理代码的过程。通过then方法来生成promise链，我们就能轻易地处理异步时序依赖。

通过将生成器和promise相结合我们能够类似同步代码来简化异步任务
