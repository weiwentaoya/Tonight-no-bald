var fib = function(n) {
    const obj = {}
    for (let i = 0; i <=n; i++) {
        if (i === 0) {
            obj[i] = 0
        } else if (i === 1) {
            obj[i] = 1
        }else{
            const n =  obj[i-2]+ obj[i-1]
            obj[i] =n>( 1e9+7)?n%(1e9+7):n
        }
    }
    console.log(obj[n]);
    
    return obj[n]
};

fib(45)
console.log(1134903170%(1e9+7));
