var fib = function(n) {
    const obj = []
    for (let i = 0; i <=n; i++) {
        if (i < 2) {
            obj[i] = i
        } else{
            obj[i] = obj[i-2]+ obj[i-1]
        }
    }
    
    return obj[n]
};


console.log(fib(45));
