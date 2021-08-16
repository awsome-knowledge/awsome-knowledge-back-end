/*




 * @lc app=leetcode.cn id=917 lang=javascript
 *
 * [917] 仅仅反转字母
 */
// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
 var reverseOnlyLetters = function (s) {
    let arr = Array(s.length)
    for (let i = 0; i < s.length; i++) {
        let ascii = s[i].charCodeAt()
        if (ascii < 65 || ascii > 90 && ascii < 97) {
            arr[i] = s[i]
        }
    }
    let j = arr.length - 1
    for (let i = 0; i < s.length; i++) {
        let ascii = s[i].charCodeAt()
        while (arr[j]) {
            j--
        }
        if (ascii >= 65 && ascii <= 90 || ascii >= 97 && ascii <= 122) {
            arr[j] = s[i]
        }
    }
    return arr.join('')
};
// @lc code=end
console.log(reverseOnlyLetters("a-bC-dEf-ghIj"))