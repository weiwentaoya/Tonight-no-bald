var isValid = function(s) {
    const sarr =s.split('')
    const arr =[]
    let vaild = sarr.length>1
    for (let i = 0; i < sarr.length; i++) {
        if(!vaild) return vaild
        if (sarr[i]=== '('||sarr[i ]=== '{'||sarr[i ]=== '[') {
            arr.push(sarr[i])
        }else if (sarr[i]=== ')') {
            vaild = arr.pop() ==='('
        }else if (sarr[i]=== '}') {
            vaild = arr.pop() ==='{'
        }else if (sarr[i]=== ']') {
            vaild = arr.pop() ==='['
        }
        
    }
    // vaild=arr.length === 0
    return vaild?arr.length === 0:vaild
    
};

console.log(isValid("(]"));
// console.log(isValid("()[]{}"));
// console.log(isValid("(]"));
// console.log(isValid("([)]"));
// console.log(isValid("{[]}"));
