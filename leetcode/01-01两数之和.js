const nums = [2,7,11,15], target = 13;
function twoSum1(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const ind2 = nums.indexOf(target-nums[i])
        if (ind2>=0&&ind2!==i) return [i, ind2] 
    }
}
const inds1 = twoSum1(nums, target)
console.log(inds1);
function twoSum2(nums, target) {
    const obj = {}
    for (let i = 0; i < nums.length; i++) {
        const el = nums[i]
        if (el in obj) return [obj[el], i]
        obj[target-el] = i
    }
}


const inds2 = twoSum2(nums, target)
console.log(inds2);
