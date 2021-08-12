/*



 * @lc app=leetcode.cn id=819 lang=javascript
 *
 * [819] 最常见的单词
 */
// @lc code=start
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
 var mostCommonWord = function (paragraph, banned) {
    let arr = paragraph.replace(',', '').replace('!', '').replace('.', '').split(' ')
    arr = arr.filter(a => {
        // 过滤禁用的
        if (!banned.includes(a)) {
            return a
        }
    })
    // 变成小写
    arr = arr.map(a => {
        return a.toLocaleLowerCase()
    })
    // 统计次数
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1)
        } else {
            map.set(arr[i], 1)
        }
    }
    let word = ""
    let max = 0
    // 挑出出现次数最多的值
    for (let [key, val] of map) {
        if (val > max) {
            word = key
            max = val
        }
    }
    return word
};
// @lc code=end
console.log(mostCommonWord("Bob hit a ball, the hit BALL flew far far far after it was hit.", ["hit"]))