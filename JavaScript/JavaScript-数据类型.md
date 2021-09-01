# 数据类型

JavaScript有七种内置类型：6种原始数据类型：undefined、null、boolean、number、string、symbol，1种对象类型：object

## 原始类型（简单类型）

### 数值

JavaScript只有一种数值类型：Number。用于表示整数和带小数的十进制数。

JavaScript没有真正意义上的整数。JavaScript中的整数就是没有小数的十进制数。所以42.0等同于整数42

```js
42.0 === 42   // true
```

1. 整数字面量

   JavaScript中基数为10的整数可以直接写成数字序列。除了基数为10的整数字面量之外，JavaScript也支持十六进制，二进制，八进制

2. 浮点字面量

   浮点字面量可以包含小数点，它们对实数使用传统语法。要定义浮点值，数值中必须包含小数点，而且小数点后面必须至少有一个数字

3. 值的范围

   JavaScript并不支持所有的数值，JavaScript能表示的最小数保存在Number.MIN_VALUE中（**5e-324**）最大值保存在Number.MAX_VALUE（

   **1.7976931348623157e+308**），当数值超出可表示范围，数值就会自动被转换为Infinity（无穷大）或-Infinity（无穷小）

4. NaN

   获取数值的操作失败时会返回NaN（无效数值）**但是任然是数值类型**

   任何涉及NaN的操作始终会返回NaN，NaN不等于包括自身的任何数值

### 字符串

### 布尔

### null

### undefined

### 符号（symbol，ES6新增）

## 对象类型（复杂类型）

### 数组

### 类

### 函数

### Set

### Map

### 定型数组

### RegExp

### Date

### Error



## 类型检查

## 内存管理：（JavaScript垃圾回收机制）