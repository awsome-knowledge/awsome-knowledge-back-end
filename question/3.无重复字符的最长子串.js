/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */
/**
 * @param {string} s
 * @return {number}
 */


// var lengthOfLongestSubstring = function (s) {
//     // 初始化空map和变量left
//     let map = {}
//     var left = 0
//     // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
//     // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
//     // 将字符串s分割组装成数组
//     // 这个函数返回每个字符最大的索引值
//     // 如"abcabcbb"，返回的map就是{'a':3,'b':7,'c':5}
//     return s.split('').reduce((max, v, i) => {
//         left = map[v] >= left ? map[v] + 1 : left
//         map[v] = i
//         return Math.max(max, i - left + 1)
//     }, 0)
// };

// 如果我们依次递增地枚举子串的起始位置，那么子串的结束位置也是递增的！这里的原因在于，假设我们选择字符串中的第 kk 个字符作为起始位置，并且得到了不包含重复字符的最长子串的结束位置为 r_kr 
// k
// ​
//  。那么当我们选择第 k+1k+1 个字符作为起始位置时，首先从 k+1k+1 到 r_kr 
// k
// ​
//   的字符显然是不重复的，并且由于少了原本的第 kk 个字符，我们可以尝试继续增大 r_kr 
// k
// ​
//  ，直到右侧出现了重复字符为止。

// 这样一来，我们就可以使用「滑动窗口」来解决这个问题了：

// 链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/solution/wu-zhong-fu-zi-fu-de-zui-chang-zi-chuan-by-leetc-2/

// 我们使用两个指针表示字符串中的某个子串（或窗口）的左右边界，其中左指针代表着上文中「枚举子串的起始位置」，而右指针即为上文中的 rk；

// 在每一步的操作中，我们会将左指针向右移动一格，表示 我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着 以左指针开始的，不包含重复字符的最长子串。我们记录下这个子串的长度；

// 在枚举结束后，我们找到的最长的子串的长度即为答案。


var lengthOfLongestSubstring = function (s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set()
    const n = s.length
    // 右指针，初始值为-1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1))
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断移动右指针
            occ.add(s.charAt(rk + 1))
            ++rk
        }
        // 第i到rk个字符是一个极长的无重复字符字串
        ans = Math.max(ans, rk - i + 1)
    }
    return ans
}