var lengthOfLongestSubstring = function(s) {
    let start = 0
    const obj = {}
    let num = 0
    for (let i = 0; i < s.length; i++) {
        const key = s[i];
        if (key in obj) {
            // start = obj[key]>start?obj[key]:start
            // console.log(i,start);

            const n = i-start
            num=n>num?n:num
            start=i
        }
        obj[key] = i
    }
    const n = s.length-start
    num=n>num?n:num
    console.log(num);
    
    return num
};
// lengthOfLongestSubstring('abba')
// lengthOfLongestSubstring('abcabcbb')
// lengthOfLongestSubstring('bbbbb')
// lengthOfLongestSubstring('pwertyuioi')
// lengthOfLongestSubstring('')
lengthOfLongestSubstring("dvdf")