var reverse = function(x) {
    if (x<0 || x >= 2147483647) return false
    let num = 0

    const str = Math.abs(x).toString()
    for (let i = 0; i < str.length; i++) {
        num+=str[i] * Math.pow(10,i)
    }
    // if ( num <= -2147483648 || num >= 2147483647 ) {
    //     num = 0
    // }
    console.log(num, num === x);
    
    return num === x
};
reverse(10)