## javascript 数据类型

```js
var a;
console.log(typeof a === typeof b);
//对未初始化和未声明的变量都是undefined
//true

Boolean('')
//false
Boolean(' ')
//true


```

###### 数值类型

由于Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是**parseInt()函数**

`parseInt()`函数在转换字符串时，更多的是看其是否符合数值模式。它会忽略字符串前面的空格，直至找到第一个非空格字符

如果第一个字符不是数字字符或者负号，`parseInt()`就会返回`NaN`；也就是说，用`parseInt()`转换空字符串会返回`NaN`（`Number()`对空字符返回0）。

如果第一个字符是数字字符，`parseInt()`会继续解析第二个字符，直到解析完所有后续字符或者遇到了一个非数字字符。

例如，`"1234blue"`会被转换为1234，因为`"blue"`会被完全忽略。类似地，`"22.5"`会被转换为22，因为小数点并不是有效的数字字符。

###### 按位非**～**

按位非操作符：操作数的负值减1

```js
var num = 25
var num1 = ~num
 //num1 -26
```

按位与**&**

按位与操作符：只有两个数值的对应位都是1才返回1，任何一位是0都返回0

```js
var res = 25&3
//res  1


var num = 25
num.toString(2)
"11001"
var num1 = 3
num1.toString(2)
"11"

25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
------------------------------------------------
     0000 0000 0000 0000 0000 0000 0000 0001
```

###### 按位或 ｜

按位与操作符：只有两个数值的对应位都是0才返回0，任何一位是1都返回1

```js
var res = 25|3
//res  27


var num = 25
num.toString(2)
"11001"
var num1 = 3
num1.toString(2)
"11"

25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
------------------------------------------------
     0000 0000 0000 0000 0000 0000 0001 1011
```

###### 关系操作符

当两个操作数都是字符串的时候，比较对应字符编码值,当有一个位数值时，会对另一个操作数进行数据转换

```js
var result= '23' < '3'
//true

var result= '23' < 3
//false
```

###### 参数传递

```js
function add(num){
  num+=10; 
  return num
}; 
var num = 10;
var res= add(num);

//num 10
//res 20
```

## 函数表达式

#### 命名指针

```js
function factorial(num) {
  if (num<=1) {
    return 1
  }else{
    return num * factorial(num-1)
  }
}
var anotherFactorial = factorial
factorial= null 
anotherFactorial(10)
//Uncaught TypeError: factorial is not a function at factorial
```

