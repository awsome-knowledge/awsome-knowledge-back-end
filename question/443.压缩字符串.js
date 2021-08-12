/*



 * @lc app=leetcode.cn id=443 lang=javascript
 *
 * [443] 压缩字符串
 */
// @lc code=start
/**
 * @param {character[]} chars
 * @return {number}
 */
 var compress = function (chars) {
    let map = new Map()
    // 统计每个数字出现的次数
    for (let i = 0; i < chars.length; i++) {
        if (map.has(chars[i])) {
            map.set(chars[i], map.get(chars[i]) + 1)
        } else {
            map.set(chars[i], 1)
        }
    }
    for ([key, val] of map) {
        if (val !== 1) {
            chars.push(key)
            // 数量转化为字符串并且分割
            chars.push(...String(val).split(''))
        } else {
            chars.push(key)
        }
    }
    return chars
};
// @lc code=end
console.log(compress(["a", "a", "b", "b", "c", "c", "c"]))