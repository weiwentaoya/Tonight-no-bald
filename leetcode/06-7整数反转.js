var reverse = function(x) {
    let num = 0
    let a =x<0?-1:1
        const str = Math.abs(x).toString()
        for (let i = 0; i < str.length; i++) {
            num+=str[i] * Math.pow(10,i)
        }
    if ( num <= -2147483648 || num >= 2147483647 ) {
        num = 0
    }
    console.log(num*a);
    
    return num*a
};
reverse(1534236469)