# awsome-knowledge-back-end

## 面试题
### 算法

1. 两数之和

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

<details><summary><b>答案</b></summary>
我的思路很简单，先给一个空对象，再遍历数组中的每一个数字，让目标值和每个值做差，然后判断对象中是否有差，如果有则返回对象的该差的value和i，没有则将该下标对应的值和该下标作为key和value塞进对象中
<pre> 
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let map = {}
    for (let i = 0; i < nums.length; i++) {
        let tep = target - nums[i]
        let val = map.hasOwnProperty(tep)
        if (val) {
            return [map[tep], i]
        }
        map[nums[i]] = i
    }
};
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---

2. 两数相加


给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807


<details><summary><b>答案</b></summary>
这道题的思路本身也不太难，主要考察的是对链表的操作，要理解链表的组成方式，增删查的方式。另一个就是按位进行加法计算，需要考虑进位（数a+数b+进位cin，返回数c和新的进位cin）。 

<pre> 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // list中放入值为0的链表
    var List = new ListNode(0);
    var head = List;
    var sum = 0;
    var carry = 0;
    // 当l1或l2不为空时或sum大于0
    while (l1 !== null || l2 !== null || sum > 0) {
        // 如果l1不为空
        if (l1 !== null) {
            // sum等于sum加上l1的值
            sum += l1.val;
            // l1转下一个
            l1 = l1.next;
        }
        if (l2 !== null) {
            sum += l2.val;
            l2 = l2.next;
        }
        // 如果总和大于10，那么进位等于1，取余数
        if (sum >= 10) {
            carry = 1;
            sum = sum - 10;
        }
        // head链表的头的下一个是sum
        head.next = new ListNode(sum);
        // 然后现在指向sum
        head = head.next;
        // 进位数放进sum
        sum = carry;
        // 清空进位
        carry = 0;

    }

    return List.next;
};
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---

3. 无重复字符的最长子串

给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

<details><summary><b>答案</b></summary>
<pre> 
/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 初始化空map和变量left
    let map = {}
    var left = 0
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
    // 将字符串s分割组装成数组
    // 这个函数返回每个字符最大的索引值
    // 如"abcabcbb"，返回的map就是{'a':3,'b':7,'c':5}
    return s.split('').reduce((max, v, i) => {
        left = map[v] >= left ? map[v] + 1 : left
        map[v] = i
        return Math.max(max, i - left + 1)
    }, 0)
};
</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---


4. 寻找两个有序数组的中位数

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。

请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。

你可以假设 nums1 和 nums2 不会同时为空。

示例 1:
```
nums1 = [1, 3]
nums2 = [2]
```

则中位数是 2.0
示例 2:
```
nums1 = [1, 2]
nums2 = [3, 4]
```
则中位数是 (2 + 3)/2 = 2.5

<details><summary><b>答案</b></summary>
这道题的思路本身也不太难，主要是看看你对数组的api熟不熟，比如常见的push，sort等。

1. 先将两个数组塞进第三个数组中，这个数组进行正排或逆排，然后筛选中位数


2. 再取数组长度，判断是偶数还是奇数，奇数则取最中间的数，偶数取最中间的两者的平均数


<pre> 
/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个有序数组的中位数
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    var nums = new Array()
    var medianVal
    for (let i in nums1) {
        nums.push(nums1[i])
    }
    for (let j in nums2) {
        nums.push(nums2[j])
    }
    nums.sort(function (a, b) {
        return a - b
    })
    var l = nums.length
    if (l % 2 !== 0) {
        medianVal = nums[(l - 1) / 2]
    } else {
        medianVal = (nums[l / 2 - 1] + nums[l / 2]) / 2
    }
    return medianVal
};
</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)


---

5. 最长回文子串

给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
```
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
```
示例 2：

```
输入: "cbbd"
输出: "bb"
```
<details><summary><b>答案</b></summary>
遍历字符串s

初始化left

当字符串左边存在并等于字符串右边

left往前挪一位

right往后挪一位

如果右边减去左边大于max的长度

那么max就等于字符串s截取left+1到right

<pre> 
/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */
/**
 * @param {string} s
 * @return {string}
 */
// var longestPalindrome = function (s) {
//     let arr = new Array()
//     let obj = {}
//     arr = s.split('')

//     for (let i in arr) {
//         if (obj.hasOwnProperty(arr[i])) {
//             let s = obj[arr[i]]
//             let e = (parseInt(i) + 1)
//             // slice() 方法返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变。
//             let endVal = arr.slice(s, e).join('')
//             return endVal
//         } else {
//             obj[arr[i]] = i
//         }
//     }
// };

// 遍历字符串s
// 初始化left
// 当字符串左边存在并等于字符串右边
// left往前挪一位
// right往后挪一位
// 如果右边减去左边大于max的长度
// 那么max就等于字符串s截取left+1到right
var longestPalindrome = function(s) {
    var max = '';
    for (var i = 0; i < s.length; i++) {
      for (var j = 0; j < 2; j++) {
        var left = i;
        var right = i + j;
        while (s[left] && s[left] === s[right]) {
          left--;
          right++;
        }
        if ((right - left - 1) > max.length) {
          max = s.substring(left + 1, right);
        }
      }
    }
    return max;
  };

</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---

6. Z 字形变换

将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
```
L   C   I   R
E T O E S I I G
E   D   H   N
```
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：
```
string convert(string s, int numRows);
```
示例 1:
```
输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
```
示例 2:
```
输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

L     D     R
E   O E   I I
E C   I H   N
T     S     G
```
<details><summary><b>答案</b></summary>
如果行数等于1或者字符串长度小于行数，那就返回字符串

申明行数、变换、翻转、计数

遍历行数，为每一行申明一个数组

遍历字符串

每一行塞进字符串值


翻转是真的,则计数自增，否则自减

如果计数等于行数-1或者计数等于0，则翻转真假替换

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。


<pre> 
/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
// 如果行数等于1或者字符串长度小于行数，那就返回字符串
// 申明行数、变换、翻转、计数
// 遍历行数，为每一行申明一个数组
// 遍历字符串
// 每一行塞进字符串值
// 翻转是真的,则计数自增，否则自减
// 如果计数等于行数-1或者计数等于0，则翻转真假替换
// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

var convert = function(s, numRows) {
        // return original string if can't zigzag
        if (numRows === 1 || s.length < numRows) return s;

        let rows = []
        let converted = '';
        let reverse = false;
        let count = 0
    
        // prepare rows
        for (let i = 0; i < numRows; i++) rows[i] = [];
        // reverse the push flow when reaching turning points
        for (let i = 0; i < s.length; i++) {
            rows[count].push(s[i]);
            reverse ? count-- : count++;
            if (count === numRows - 1 || count === 0) reverse = !reverse;
        }
        // put together converted string
        return rows.reduce((converted, cur) => converted + cur.join(''), '');
};


console.log(convert('LEETCODEISHIRING',4))
</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---

7. 整数反转

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例 1:
```
输入: 123
输出: 321
```
 示例 2:
```
输入: -123
输出: -321
```
示例 3:
```
输入: 120
输出: 21
```
注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。
<details><summary><b>答案</b></summary>
如果行数等于1或者字符串长度小于行数，那就返回字符串


申明行数、变换、翻转、计数


遍历行数，为每一行申明一个数组

遍历字符串

每一行塞进字符串值

翻转是真的,则计数自增，否则自减

如果计数等于行数-1或者计数等于0，则翻转真假替换

reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。


<pre> 
/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */
/**
 * @param {number} x
 * @return {number}
 */
// 在JavaScript中模拟溢出真的有意义吗?JS中没有int。Number类型是浮点类型。如果必须模拟溢出，“整数”单元格大小应该定义为任务中的某个值，例如双单词。
var reverse = function (x) {
    if (x > 0) {
        let arr = x.split('')
        arr.reverse()
        let str = arr.join('')
        return str
    } else {
        let arr = x.replace('-', '').split('')
        arr.reverse()
        let str = arr.join('')
        return '-' + str
    }
};


</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---

8. 字符串转换整数 (atoi)

请你来实现一个 atoi 函数，使其能将字符串转换成整数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

说明：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 [−231,  231 − 1]。如果数值超过这个范围，qing返回  INT_MAX (231 − 1) 或 INT_MIN (−231) 。

示例 1:
```
输入: "42"
输出: 42
```
示例 2:
```
输入: "   -42"
输出: -42
解释: 第一个非空白字符为 '-', 它是一个负号。
     我们尽可能将负号与后面所有连续出现的数字组合起来，最后得到 -42 。
```
示例 3:
```
输入: "4193 with words"
输出: 4193
解释: 转换截止于数字 '3' ，因为它的下一个字符不为数字。
```
示例 4:
```
输入: "words and 987"
输出: 0
解释: 第一个非空字符是 'w', 但它不是数字或正、负号。
     因此无法执行有效的转换。
```
示例 5:
```
输入: "-91283472332"
输出: -2147483648
解释: 数字 "-91283472332" 超过 32 位有符号整数范围。 
     因此返回 INT_MIN (−231) 。
```
<details><summary><b>答案</b></summary>
Math.min() 返回零个或更多个数值的最小值。

Math.max() 返回零个或更多个数值的最大值。


1. 我们要用parseInt取整过滤字符串


2. 取不大于2^31 − 1的数


3. 取不小于−2^31的数
<pre> 
/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */
/**
 * @param {string} str
 * @return {number}
 */

var myAtoi = function (str) {
    let intStr = parseInt(str) || 0
    let minStr = Math.min(intStr, 2147483647)
    return Math.max(minStr, -2147483648)
};
</pre> 
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---

9. 回文数

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:
```
输入: 121
输出: true
```
示例 2:
```
输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```
示例 3:
```
输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```
进阶:

你能不将整数转为字符串来解决这个问题吗？
<details><summary><b>答案</b></summary>
初级版：

1. 将整数转化为字符串

2. 将字符串分割成数组


3. 将数组反转


4. 将数组变为字符串


5. 比较前后字符串



进阶版：

Math.pow(10, i)：返回10的i次幂

1. 小于0和10的先判断


2. length是整数长度


3. isLengthOdd整数长度是否为奇数


4. halfIndex是整数长度除于二


5. maxIndex是整数的长度减一


6. calcX是整数截取后还剩的部分


7. currentNum从头取


8. result是正确的回文数


9.  result和x比对

<pre> 
/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    let str = x.toString().split('').reverse().join('')

    if (x.toString() === str) {
        return true
    } else {
        return false
    }
};
</pre> 
<pre>
var isPalindrome = function(x) {
    if (x < 0) return false
    if (x < 10) return true
    let result = 0
    
    for (let i = 2; i <= 15; i++) {
        if (x < Math.pow(10, i)) {
            const length = i
            const isLengthOdd = length % 2 !== 0
            const maxIndex = length - 1
            const halfIndex = Math.floor(length / 2)
            let calcX = x
            
            for (let j = maxIndex; j >= halfIndex; j--) {
                const edge = Math.pow(10, j)
                if (calcX < edge) continue  // e.g. 101, '0' no need calculate
                
                const currentNum = parseInt(calcX / edge)
                
                if (j === halfIndex && isLengthOdd) {
                   result += currentNum * edge
                } else {
                   result += currentNum * edge + currentNum * Math.pow(10, length - 1 - j) 
                }
                
                calcX = calcX - currentNum * edge
            }
            
            break
        }
    }
    
    return result === x
};

// 99  length = 2，max = 1, half = 1, first loop edge = 10,  first loop currentNum = parseInt(99 / 10) = 9
// 99 = 9 * 10 ** 1 + 9 * 10 ** 0

// 121 length = 3，isLengthOdd = true, max = 2, half = 1, first loop edge = 100, first loop currentNum = parseInt(121 / 100) = 1
// 121 = 1 * 10 ** 2 + 1 * 10 ** 0 + 2 * 10 ** 1
</pre>
</details>   

[[↑] 回到顶部](#awsome-interview-back-end)

---

10.  正则表达式匹配
给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
```
'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
```
所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。

说明:

- s 可能为空，且只包含从 a-z 的小写字母。
- p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
示例 1:
```
输入:
s = "aa"
p = "a"
输出: false
解释: "a" 无法匹配 "aa" 整个字符串。
```
示例 2:
```
输入:
s = "aa"
p = "a*"
输出: true
解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
```
示例 3:
```
输入:
s = "ab"
p = ".*"
输出: true
解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
```
示例 4:
```
输入:
s = "aab"
p = "c*a*b"
输出: true
解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
```
示例 5:

```
输入:
s = "mississippi"
p = "mis*is*p*."
输出: false
```
<details><summary><b>答案</b></summary>
[正则表达式匹配](https://blog.csdn.net/softwareX4/article/details/90761502)
[正则表达式匹配](https://www.cnblogs.com/wangshaowei/p/11015383.html)

<pre> 
/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
    var lenS = s.length;
    var lenP = p.length;
    var map = {};

    return check(0, 0);

    function check(idxS, idxP) {
        if (map[idxS + ':' + idxP] !== undefined) return map[idxS + ':' + idxP];

        if (idxS > lenS) return false;
        if (idxS === lenS && idxP === lenP) return true;

        if (p[idxP] === '.' || p[idxP] === s[idxS]) {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                check(idxS + 1, idxP) || check(idxS, idxP + 2) :
                check(idxS + 1, idxP + 1);
        } else {
            map[idxS + ':' + idxP] = p[idxP + 1] === '*' ?
                check(idxS, idxP + 2) : false;
        }
        return map[idxS + ':' + idxP];
    }
};

</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)

---

11. 盛最多水的容器

给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![avatar](./11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

 

示例:
```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```
<details><summary><b>答案</b></summary>
Math.min() 返回零个或更多个数值的最小值。

Math.max() 返回零个或更多个数值的最大值。

有图可知，必须两头往中间走，取出最大的面积

1. 定义i和j

2. i从头开始往后走

3. j从后往前走

4. 如果i < j，则可以继续运行

5. 取height[i]和height[j]中的最小值和距离乘

6. 与之前的面积比较，取最大值

7. 判断height[i]和height[j]的大小，哪个大则另一个往大的靠，相等则一起走
<pre> 
/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    // var max = 0
    // var min = 0
    // var arrArea = []
    // for (let i in height) {
    //     for (let j = 1; height.length - j > i; j++) {
    //         min = Math.min(height[height.length - j], height[i])
    //         area = min * (height.length - j - i)
    //         arrArea.push(area)
    //     }
    // }
    // for (let j in arrArea) {
    //     max = Math.max(arrArea[j], max)
    // }
    let maxArea = 0
    let i = 0
    let j = height.length - 1
    while (i < j) {
        maxArea = Math.max(maxArea, Math.min(height[i], height[j]) * (j - i))
        if (height[i] > height[j]) {
            j--
        } else if (height[i] < height[j]) {
            i++
        } else {
            j--
            i++
        }
    }
    return maxArea
};
</pre> 
</details>   


[[↑] 回到顶部](#awsome-interview-back-end)


---

12. 整数转罗马数字
罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

- I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
- X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
- C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:
```
输入: 3
输出: "III"
```
示例 2:
```
输入: 4
输出: "IV"
```
示例 3:
```
输入: 9
输出: "IX"
```
示例 4:
```
输入: 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```
示例 5:
```
输入: 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```
<details><summary><b>答案</b></summary>
整数转罗马数字，千万不要一个个if/else去判断，要学聪明。

1. 将关键节点列出来，分别是整数数组和罗马数组，做到一一映射

2. 申明一个初始值等于num的值res

3. 全局监听res的变化，如果res！==0，那就继续循环

4. 申明valRoman值，这是一个最终结果值

5. 遍历整数数组，如果res大于当前整数组，那就将valRoman添加进罗马数组中的对应值，相应的res要减去对应整数值
<pre> 
/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */
/**
 * @param {number} num
 * @return {string}
 */

var intToRoman = function (num) {
    var arrRoman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arrInt = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var res = num
    var valRoman = ''
    while (res !== 0) {
        for (let i = 0; i < arrInt.length; i++) {
            if (res >= arrInt[i]) {
                valRoman += arrRoman[i]
                res -= arrInt[i]
                break
            }
        }
    }
    return valRoman
};
</pre> 
</details>   


[[↑] 回到顶部](#awsome-interview-back-end)

---

13. 罗马数字转整数
罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。
```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

- I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
- X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
- C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个整数，将其转为罗马数字。输入确保在 1 到 3999 的范围内。

示例 1:
```
输入: "III"
输出: 3
```
示例 2:
```
输入: "IV"
输出: 4
```
示例 3:
```
输入: "IX"
输出: 9
```
示例 4:
```
输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.
```
示例 5:
```
输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```
<details><summary><b>答案</b></summary>

罗马数字转整数还是很简单的

1. 将s遍历，去跟罗马数字匹配，找到对应的索引

2. 将索引对应的整数相加

3. 但是要减去多加的部分，根据规律发现：只要前者比后者小，那就是多加的，而且还要减去2倍


<pre> 
/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    var arrRoman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
    var arrInt = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    var res = 0
    var arrRes = []
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < arrRoman.length; j++) {
            if (s[i] === arrRoman[j]) {
                res += arrInt[j]
                arrRes.push(arrInt[j])
            }
        }
    }
    for (let i = 0; i < arrRes.length; i++) {
        if (arrRes[i] < arrRes[i + 1]) {
            res -= 2 * arrRes[i]
        }
    }
    return res
};

</pre> 
</details>   


[[↑] 回到顶部](#awsome-interview-back-end)


---

14.  最长公共前缀


编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:
```
输入: ["flower","flow","flight"]
输出: "fl"
```
示例 2:
```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```
说明:

所有输入只包含小写字母 a-z 。
<details><summary><b>答案</b></summary>
- reduce：这个方法对数组中的每个元素执行一个自定义的函数，并将结果汇总
- slice：这个方法对字符串截取

1. 使用reduce方法对字符串数组进行遍历

2. 判断前后字符串每个位子上的值是否相等，循环中相等i+1,否则跳出循环

3. slice按照索引截取公共前缀
<pre> 
/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (strs.length === 0) {
        return ''
    }
    return strs.reduce((former, latter) => {
        let i = 0

        while (former[i] && latter[i] && former[i] === latter[i]) {
            i++
        }
        return former.slice(0, i)

    })
};
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)

---


15. 三数之和
给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。

注意：答案中不可以包含重复的三元组。
```
例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

满足要求的三元组集合为：
[
  [-1, 0, 1],
  [-1, -1, 2]
]
```

<details><summary><b>答案</b></summary>

1. 先判断数组长度，小于3则返回空数组

2. 对数组排序（升序）

3. 对数组进行遍历，索引为i变量，如果每个值都大于0，则也返回空数组；

4. 对数组遍历，索引为j变量，是i的后一位，索引为k变量，是数组的最后一位，保持j小于k

5. 如果第i，j，k个值之和为0，则返回i，j，k的数组，然后继续找，j向后移，k向前移

6. 当j小于k并且第j和j-1个值相等，往后移一位

7. 当j小于k并且第k和k+1个值相等，往前移一位

8. 如果之和大于0，则k往前移，否则j往后移 

<pre> 
/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    arr = []
    if (nums.length < 3) {
        return arr
    }
    nums = nums.sort(function (a, b) {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) {
            return arr
        }
        if (i > 0 && nums[i] == nums[i - 1]) {
            continue
        }

        for (var j = i + 1, k = nums.length - 1; j < k;) {
            if (nums[i] + nums[j] + nums[k] === 0) {
                arr.push([nums[i], nums[j], nums[k]])
                j++;
                k--;
                while (j < k && nums[j] == nums[j - 1]) {
                    j++
                }
                while (j < k && nums[k] == nums[k + 1]) {
                    k--
                }
            } else if (nums[i] + nums[k] + nums[j] > 0) {
                k--
            } else {
                j++
            }
        }
    }
    return arr
};
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)

---


16. 最接近的三数之和

给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```
<details><summary><b>答案</b></summary>
方法有点笨

- a1:原数组三数值和所有可能值的数组
- a2:a1遍历后取距离值的数组
- a3:对a2排序
- a4:a1的模板

1. 先判断数组长度，小于3则直接返回数组和

2. 对数组排序（升序）

3. 双重循环:最外层对数组进行遍历，索引为i变量;最内层对数组遍历，索引为j变量，是i的后一位，索引为k变量，是数组的最后一位，保持j小于k

4. 如果第i，j，k个值之和为target，则返回target

5. 如果第i，j，k个值之和大于target，则和值push进a1,并且k往前移一位

6. 如果第i，j，k个值之和小于target，则和值还是push进a1,并且j往后移一位

7. 然后a1遍历,每个值与target做差和绝对值,获取的值放进a2和a4

8. a3是a2排序后的结果(升序)

9. 在a4中取a3最小值的索引位

10. 最后返回a1中的值  


<pre> 
/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
    let sum = 0
    let a1 = []
    let a2 = []
    let a3 = []
    let a4 = []
    let index
    if (nums.length <= 3) {
        sum = nums.reduce((prev, next) => {
            return prev + next
        })
        return sum
    }
    nums = nums.sort((a, b) => {
        return a - b
    })
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1, k = nums.length - 1; j < k;) {
            if ((nums[i] + nums[j] + nums[k]) === target) {
                return target
            } else if ((nums[i] + nums[j] + nums[k]) > target) {
                a1.push(nums[i] + nums[j] + nums[k])
                k--
            } else {
                a1.push(nums[i] + nums[j] + nums[k])
                j++
            }
        }
    }

    a1.forEach(item => {
        a2.push(Math.abs(item - target))
        a4.push(Math.abs(item - target))
    })


    a3 = a2.sort((a, b) => {
        return a - b
    })

    index = a4.indexOf(a3[0])
    return a1[index]

};
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)


---

17. 电话号码的字母组合

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![avatar](./17.png)

示例:

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

<details><summary><b>答案</b></summary>

- substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

- split() 方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。 

- concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

- undefined 一个声明未定义的变量的初始值，或没有实际参数的形式参数。

- Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。

1. 首先用map映射出电话号码和字母

2. 将第一个字符串的字母放进数组arr

3. 原字符串去掉第一个

4. 将字符串分割成字符串数组,并对该数组遍历

5. 根据每一个字符串digit,从map取出对应的字母数组,并对字母数组遍历

6. 遍历arr,返回其中的item拼接letter的值

7. 然后用t合并所有的返回值数组

8. 最后返回arr
<pre> 
/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    var map = {
        "2": ["a", "b", "c"],
        "3": ["d", "e", "f"],
        "4": ["g", "h", "i"],
        "5": ["j", "k", "l"],
        "6": ["m", "n", "o"],
        "7": ["p", "q", "r", "s"],
        "8": ["t", "u", "v"],
        "9": ["w", "x", "y", "z"]
    };
    var arr = map[digits[0]];
    digits = digits.substr(1);
    digits.split("").forEach((digit) => {
        let t = [];
        map[digit].forEach((letter) => {
            t = t.concat(arr.map((item) => {
                return item + letter;
            }));
        });
        arr = t;
    });
    return arr === undefined ? [] : arr;
};
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)


---

18. 四数之和

给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

注意：

答案中不可以包含重复的四元组。

示例：
```
给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。

满足要求的四元组集合为：
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```

<details><summary><b>答案</b></summary>

<pre> 
/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */

// 未成功
// var fourSum = function (nums, target) {
//     let arr = []
//     if (nums.length < 4) {
//         return arr
//     }
//     nums = nums.sort((a, b) => {
//         return a - b
//     })
//     for (let i = 0; i < nums.length - 3; i++) {
//         if (nums[i] > target) {
//             return arr
//         }
//         for (let j = i + 1; j < nums.length - 2; j++) {
//             for (let k = j+1, l = nums.length - 1; k < l;) {
//                 // console.log(i, j, k, l)
//                 // console.log(nums[i] + nums[j] + nums[k] + nums[l])
//                 if ((nums[i] + nums[j] + nums[k] + nums[l]) === target) {
//                     arr.push([nums[i], nums[j], nums[k], nums[l]])
//                     k++;
//                     l--
//                     while (k < l && nums[j] === nums[j - 1]) {
//                         j++
//                     }
//                     while (k < l && nums[k] === nums[k - 1]) {
//                         k++
//                     }
//                     while (k < l && nums[l] === nums[l + 1]) {
//                         l--
//                     }
//                 } else if ((nums[i] + nums[j] + nums[k] + nums[l]) > target) {
//                     l--
//                 } else {
//                     k++
//                 }
//             }
//         }
//     }
//     return arr
// };

// var fourSum = function(nums, target) {
//     const counts = new Map();  // counts of elements in `nums`
//     const aPlusB = new Map();  // sum tuples e.g. 5 => [[2, 3], [1, 4], ... ]
//     for (let i = 0; i < nums.length - 1; i++) {
//         counts.set(nums[i], (counts.get(nums[i]) || 0) + 1);
//         for (let j = i + 1; j < nums.length; j++) {
//             let a = nums[i], b = nums[j];
//             aPlusB.set(a + b, [...aPlusB.get(a + b) || [], [a, b]]);
//         }
//     }
//     counts.set(nums[nums.length - 1], (counts.get(nums[nums.length - 1]) || 0) + 1);
//     const res = new Set();  // Sets are unique, so no worries about duplicates
//     for (let i = 0; i < nums.length - 1; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             let c = nums[i], d = nums[j];
//             if (!aPlusB.has(target - c - d)) continue;  // move on if wrong sum
//             aPlusB.get(target - c - d)
//                 .forEach(ab => {
//                     const abcd = [...ab, c, d];
//                     if (!abcd.some(e => abcd.reduce((qty, a) => qty + (a === e), 0) > counts.get(e))) {
//                         res.add(abcd.sort().join(','));
//                     }
//                 });
//         }
//     }
//     return [...res].map(abcd => abcd.split(',').map(e => parseInt(e)));
// };

var fourSum = function (nums, target) {
    nums = nums.sort(function (a, b) {
        return a - b
    }); //先排序
    var arr = [];
    for (i = 0; i < nums.length - 3; i++) { //第一个
        if (i > 0 && nums[i - 1] == nums[i]) continue
        for (j = i + 1; j < nums.length - 2; j++) { //第二个
            if (j > i + 1 && nums[j - 1] == nums[j]) continue
            var k = nums.length - 1
            var c = j + 1;
            while (c < nums.length - 1 && c != k) { //第三个
                var sum = nums[i] + nums[j] + nums[c] + nums[k]
                if (c > j + 1 && nums[c] == nums[c - 1]) {
                    c++;
                    continue;
                }
                if (k < nums.length - 1 && nums[k] == nums[k + 1]) {
                    k--;
                    continue;
                }
                if (sum == target) {
                    arr.push([nums[i], nums[j], nums[c], nums[k]]);
                    c++
                    k = nums.length - 1
                } else if (sum < target) {
                    c++
                } else {
                    k--
                }
            }
        }
    }
    return arr
};
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)

---


19. 删除链表的倒数第N个节点

给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
```
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5.
```
说明：

给定的 n 保证是有效的。

进阶：

你能尝试使用一趟扫描实现吗？


<details><summary><b>答案</b></summary>


<pre> 
/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// var removeNthFromEnd = function(head, n) {
//     let nodes = [],current = head;
//     while(current){
//         nodes.push(current);
//         current = current.next;
//     }
//     let originLen = nodes.length;
//     nodes.splice(nodes.length - n,1);
//     if(nodes.length === 0)
//         return null;
//     if(n === 1){
//         nodes[nodes.length - 1].next = null;
//     }else if(n  < originLen){
//         nodes[nodes.length - n].next = nodes[nodes.length - n + 1];
//     }
//     return nodes[0];
// };

var removeNthFromEnd = function(head, n) {
    let first = head, second = head;
    while (n > 0) {
      first = first.next
      n--
    }
    if (!first) return head.next;     // 删除的是头节点
    while (first.next) {
      first = first.next;
      second = second.next;
    }
    second.next = second.next.next;
    return head
}
</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)


---

20. 有效的括号

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。

2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

```
示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true
```

<details><summary><b>答案</b></summary>

1. 先申明一个空的临时数组tmp


2. 循环s


3. 如果在“({[]})”中有的话进入下一个判断，并记下位置i


4. 如果在tmp中的最后一个数加上i等于5的话，tmp中长度-1


5. 否则将i塞进tmp中


6. 最后判断tmp的长度，等于0则为有效括号，返回true


7. 如果是有效括号，那么前面push进去的，后面都能消掉。这就是这个算法的神奇之处。


<pre> 
/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */
/**
 * @param {tmpring} s
 * @return {boolean}
 */

var isValid = function(s) {
    var tmp = []
    for(var l of s)
        if ((i="({[]})".indexOf(l))>-1)
            if (tmp[tmp.length-1]+i===5)
                tmp.length--;
            else
                tmp.push(i);
    return tmp.length===0
};

</pre> 
</details>


[[↑] 回到顶部](#awsome-interview-back-end)


---

22. 括号生成

给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

例如，给出 n = 3，生成结果为：
```
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```
<details><summary><b>答案</b></summary>

<pre> 
/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */
/**
 * @param {number} n
 * @return {string[]}
 */

var generateParenthesis = function(n) {
    var arr = [];
    compose(n, n, '');
    return arr;
  
    function compose(left, right, str) {
      if (!left && !right && str.length) return arr.push(str);
      if (left) compose(left - 1, right, str + '(');
      if (right > left) compose(left, right - 1, str + ')');
    }
  };
  
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---

26. 删除排序数组中的重复项

给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:
```
给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。

```
示例 2:
```
给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```
说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```
<details><summary><b>答案</b></summary>
读题:内部操作十分关键

无需再return

也就是说下面这段类似
```js
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < nums; i++) {
    console.log(nums[i]);
}
};
```
<pre> 
/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
};


</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---

27. 移除元素

给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例 1:
```
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。
```
示例 2:
```
给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```
说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```
<details><summary><b>答案</b></summary>
读题:内部操作十分关键

无需再return

也就是说下面这段类似
```js
var removeDuplicates = function(nums) {
    for (i = 0; i < nums.length; i++) {
        //Next number is identical to current one
        if (nums[i] == nums[i+1]) {
            nums.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < nums; i++) {
    console.log(nums[i]);
}
};
```

找到val值，splice去除，后面的值跟上
<pre> 
/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    for(i=0;i<nums.length;i++){
        if(nums[i]===val){
            nums.splice(i,1)
            i--
        }
    }
};


</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---


28. 实现strStr()
实现 strStr() 函数。

给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。

示例 1:
```
输入: haystack = "hello", needle = "ll"
输出: 2
```
示例 2:
```
输入: haystack = "aaaaa", needle = "bba"
输出: -1
```
说明:

当 needle 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 needle 是空字符串时我们应当返回 0 。这与C语言的 strstr() 以及 Java的 indexOf() 定义相符。
<details><summary><b>答案</b></summary>
很简单的,调用indexOf就行了
<pre> 
/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现strStr()
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    if (needle === '') {
        return 0
    }
    let index = ''
    index = haystack.indexOf(needle)
    return index
};

</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---


29. 两数相除
给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 dividend 除以除数 divisor 得到的商。

示例 1:
```
输入: dividend = 10, divisor = 3
输出: 3
```
示例 2:
```
输入: dividend = 7, divisor = -3
输出: -2
```
说明:

被除数和除数均为 32 位有符号整数。
除数不为 0。
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。
<details><summary><b>答案</b></summary>
方法一:

最蠢的方法,也就是用上除法运算符了,但是能解决问题,判断除数和被除数的正负,对其做绝对值,然后就是除法,最后考虑边界

方法二:

左移运算符（<<）

表示将一个数的二进制值向左移动指定的位数，尾部补0，即乘以2的指定次方（最高位即符号位不参与移动）。

右移运算符（>>）

表示将一个数的二进制值向右移动指定的位数，头部补0，即除以2的指定次方（最高位即符号位不参与移动）。
<pre> 
方法一:

/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    let res = ''
    if (divisor < 0 && dividend > 0) {
        divisor = -divisor
        res = -(Math.floor(dividend / divisor))
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }
    if (divisor > 0 && dividend < 0) {
        dividend = -dividend
        res = -(Math.floor(dividend / divisor))
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }
    if (divisor < 0 && dividend < 0) {
        divisor = -divisor
        dividend = -dividend
        res = Math.floor(dividend / divisor)
        if (res <= -2147483648) {
            return -2147483648
        }
        if (res >= 2147483647) {
            return 2147483647
        }
        return res
    }

    res = Math.floor(dividend / divisor)

    if (res <= -2147483648) {
        return -2147483648
    }
    if (res >= 2147483647) {
        return 2147483647
    }

    return res
};

方法二:
/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
var divide = function (dividend, divisor) {
    if (divisor === 0) return 0;
    if (dividend === 0) return 0;
    if (dividend === -2147483648 && divisor === -1) return 2147483647;

    var isPositive = true;
    if (dividend > 0 !== divisor > 0) isPositive = false;

    divisor = Math.abs(divisor);
    dividend = Math.abs(dividend);

    var count = 1,
        result = 0,
        base = divisor;

    while (dividend >= divisor) {
        count = 1;
        base = divisor;
        while (base <= (dividend >> 1)) {
            base = base << 1;
            count = count << 1;
        }
        result += count;
        dividend -= base;
    }

    if (!isPositive) result = -result;
    return result;
};


</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---




33. 搜索旋转排序数组
假设按照升序排序的数组在预先未知的某个点上进行了旋转。

( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。

搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。

你可以假设数组中不存在重复的元素。

你的算法时间复杂度必须是 O(log n) 级别。

示例 1:
```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```
示例 2:
```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```
<details><summary><b>答案</b></summary>
indexOf这个方法正好用的上,返回目标值在数组中的索引
<pre> 
/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return nums.indexOf(target)
};


</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---


34. 在排序数组中查找元素的第一个和最后一个位置
    
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

你的算法时间复杂度必须是 O(log n) 级别。

如果数组中不存在目标值，返回 [-1, -1]。

示例 1:
```
输入: nums = [5,7,7,8,8,10], target = 8
输出: [3,4]
```
示例 2:
```
输入: nums = [5,7,7,8,8,10], target = 6
输出: [-1,-1]
```
<details><summary><b>答案</b></summary>
indexOf这个方法正好用的上,返回目标值在数组中的索引

lastIndexOf()从后往前找目标值,与indexOf()恰好相反
<pre> 
/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let arr=[]
    let left=nums.indexOf(target)
    let right=nums.lastIndexOf(target)
    arr.push(left)
    arr.push(right)
    return arr
};


✔ Accepted
  ✔ 88/88 cases passed (80 ms)
  ✔ Your runtime beats 79.6 % of javascript submissions
  ✔ Your memory usage beats 64.12 % of javascript submissions (34.9 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---


35. 搜索插入位置
 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:
```
输入: [1,3,5,6], 5
输出: 2
```
示例 2:
```
输入: [1,3,5,6], 2
输出: 1
```
示例 3:
```
输入: [1,3,5,6], 7
输出: 4
```
示例 4:
```
输入: [1,3,5,6], 0
输出: 0
```
<details><summary><b>答案</b></summary>
indexOf这个方法正好用的上,返回目标值在数组中的索引

如果有则返回索引，否则就插入目标值排序返回索引
<pre> 
/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    if (nums.indexOf(target) >= 0) {
        return nums.indexOf(target)
    }
    nums.push(target)
    return nums.sort(function(a,b){
        return a-b
    }).indexOf(target)
};


√ Accepted
  √ 62/62 cases passed (108 ms)
  √ Your runtime beats 24.06 % of javascript submissions
  √ Your memory usage beats 5.32 % of javascript submissions (35.9 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---


36. 有效的数独
判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

数字 1-9 在每一行只能出现一次。
数字 1-9 在每一列只能出现一次。
数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

上图是一个部分填充的有效的数独。

数独部分空格内已填入了数字，空白格用 '.' 表示。

示例 1:
```

输入:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: true
```

示例 2:
```
输入:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
输出: false
```
解释: 除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。
     但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
说明:

一个有效的数独（部分已被填充）不一定是可解的。
只需要根据以上规则，验证已经填入的数字是否有效即可。
给定数独序列只包含数字 1-9 和字符 '.' 。
给定数独永远是 9x9 形式的。
<details><summary><b>答案</b></summary>
从简单入手，每行和每列判断是颠倒下i和j就行了。最难的是九宫格判断，前提时i和j是以3，6，9分割。

举个例子：当i=0；j=4时，此时的board取得是'6'，而不是'.'或者'8',`Math.floor(i/3)*3+Math.floor(j/3)`就是`Math.floor(0/3)*3+Math.floor(4/3)`等于'1',`(i%3)*3+j%3`就是`(0%3)*3+4%3`等于0，那么取得就是board[1][0],就是'6'

<pre> 
/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */
/**
 * @param {character[][]} board
 * @return {boolean}
 */
// Math.floor() 返回小于或等于一个给定数字的最大整数。
var isValidSudoku = function (board) {
    for (let i = 0; i < 9; i++) {
        let row = new Set(),
            col = new Set(),
            sqr = new Set()
        for (let j = 0; j < 9; j++) {
            let rowc = board[i][j]
            let colc = board[j][i]
            let sqrc = board[Math.floor(i / 3) * 3 + Math.floor(j / 3)][(i % 3) * 3 + j % 3]
            if (row.has(rowc) || col.has(colc) || sqr.has(sqrc)) return false
            if (rowc !== '.') row.add(rowc)
            if (colc !== '.') col.add(colc)
            if (sqrc !== '.') sqr.add(sqrc)
        }
    }
    return true
};


√ Accepted
  √ 504/504 cases passed (148 ms)
  √ Your runtime beats 29.53 % of javascript submissions
  √ Your memory usage beats 96.77 % of javascript submissions (37.2 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


38. 报数
报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```js
1.     1
2.     11
3.     21
4.     1211
5.     111221
```
1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

示例 1:

```
输入: 1
输出: "1"
```

示例 2:

```
输入: 4
输出: "1211"
```
<details><summary><b>答案</b></summary>
1. 申明start存储来作为返回值，result为过渡值，tmp计算重复值

2. 双层循环，外层遍历n-1,内层遍历start值

3. 判断start字符串中前后值是否相等，如果相等那么tmp+1,如果不等那么result=result+tmp+start循环上的值

4. 最后循环结束得出start值 


<pre> 
/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 报数
 */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {
    let start = '1',
        result = '',
        tmp = 1
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < start.length; j++) {
            if (start[j] !== start[j + 1] || j == start.length - 1) {
                result +=tmp +  start[j]
                tmp = 1
            } else {
                tmp += 1
            }
        }
        start = result
        result = ''
    }
    return start
};


✔ Accepted
  ✔ 18/18 cases passed (80 ms)
  ✔ Your runtime beats 82.46 % of javascript submissions
  ✔ Your memory usage beats 40.19 % of javascript submissions (35.5 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


39. 组合总和

给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：
```
所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
```
示例 1:
```
输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
```
示例 2:
```
输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```
<details><summary><b>答案</b></summary>
1. 迭代 内置search方法，循环start值
<pre> 
/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    candidates.sort((a, b) => a - b)
    let buffer = []
    let res = []
    search(0, target)
    return res

    function search(start, target) {
        if (target === 0) return res.push(buffer.slice())
        if (target < 0) return
        if (start === candidates.length) return
        buffer.push(candidates[start])
        search(start, target - candidates[start])
        buffer.pop()
        search(start + 1, target)
    }
};

✔ Accepted
  ✔ 168/168 cases passed (124 ms)
  ✔ Your runtime beats 55.49 % of javascript submissions
  ✔ Your memory usage beats 99.12 % of javascript submissions (35.8 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


46. 全排列
给定一个没有重复数字的序列，返回其所有可能的全排列。

示例:
```

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```
<details><summary><b>答案</b></summary>
<pre> 
/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// remaining:剩下的
var permute = function (nums) {
    let res = []
    let permutations = (current, remaining) => {
        if (remaining.length <= 0) res.push(current.slice())
        else {
            for (let i = 0; i < remaining.length; i++) {
                current.push(remaining[i])
                permutations(current.slice(), remaining.slice(0, i).concat(remaining.slice(i + 1)))
                current.pop()
            }
        }
    }
    permutations([], nums)
    return res
};


✔ Accepted
  ✔ 25/25 cases passed (96 ms)
  ✔ Your runtime beats 90.73 % of javascript submissions
  ✔ Your memory usage beats 24.34 % of javascript submissions (37.3 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)

---

53. 最大子序和

给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:
```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
<details><summary><b>答案</b></summary>
1. 最小数是最大值的负数，就是-Number.MAX_VALUE，现将该值赋值给max、


2. 申明sum


3. 遍历nums


4. 如果sum小于零，重置，因为一个数加上负数肯定变小


5. sum加上nums数组中的每个值


6. 判断max和sum取最大值赋值给max


7. 循环结束返回max


<pre> 

方法一：动态规划

/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
    let max=-Number.MAX_VALUE
    let sum=0

    for(let i of nums){
        if(sum<0){
            sum=0
        }
        sum+=i
        max=Math.max(max,sum)
    }
    return max
};

方法二：分治

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  return divide(nums, 0, nums.length-1);
};
 
var divide = function(nums, l, r) {
  if (l === r) {
    return nums[l];
  }
  if (l === r-1) {
    return Math.max(nums[l], Math.max(nums[r], nums[l] + nums[r]));
  }
  
  let mid = parseInt((l + r) / 2);
  let lmax = divide(nums, l, mid-1);
  let rmax = divide(nums, mid+1, r);
  
  let mmax = nums[mid];  // 从中间开始计算
  let sum = mmax; // 用来求和
  for (let i = mid - 1; i >= l; i--) {
    sum += nums[i];
    mmax = Math.max(mmax, sum);
  }
  
  sum = mmax;
  for (let i = mid + 1; i <= r; i++) {
    sum += nums[i];
    mmax = Math.max(mmax, sum);
  }
  
  return Math.max(lmax, Math.max(rmax, mmax));
};
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---



58. 最后一个单词的长度
给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

示例:
```
输入: "Hello World"
输出: 5
```
<details><summary><b>答案</b></summary>
关键就是切分字符串

1. 判断字符串是否为空，空的就为0


2. 分割字符串


3. 过滤字符串数组，空的丢弃


4. 取字符串最后一个单词，如果index小于0，返回0，否则返回最后一个字符串长度。因为" "，中间有空格的是还没去掉。
<pre> 

/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    if (s === '') {
        return 0
    }
    let last = s.split(' ')
    last = last.filter(item => {
        return item !== ''
    })
    let index = last.length - 1
    if (index >= 0) {
        return last[index].length
    }else{
        return 0
    }
};


√ Accepted
  √ 59/59 cases passed (64 ms)
  √ Your runtime beats 98.61 % of javascript submissions
  √ Your memory usage beats 21.66 % of javascript submissions (33.8 MB)
</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


66. 加一
给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例 1:
```
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。
```
示例 2:
```
输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```
<details><summary><b>答案</b></summary>

<pre> 
/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let num=parseInt(digits.join(''))
    num+=1
    let arr=num.toString().split('')
    return arr
};

× Wrong Answer
  × 69/109 cases passed (N/A)
  × testcase: '[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3]'
  × answer: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,0,0,0]
  × expected_answer: [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]
  × stdout:
</pre> 
parseInt当数字过大时，精度出错

正确方法：

1. 由于之前转数字错误的示范，这次就要改邪归正了


2. 遍历数组，从尾到头，命中数字加1


3. 和值如果大于等于10，该位置上清0，再来一遍循环，否则就返回目标值


4. 循环结束，所有位置上都大于等于10，那么在目标值头部加1
<pre>

/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++
        if (digits[i] >= 10) {
            digits[i]=0
        } else {
            return digits
        }   
    }
    digits.unshift(1)
    return digits
}

</pre>

<pre>
√ Accepted
  √ 109/109 cases passed (68 ms)
  √ Your runtime beats 96.42 % of javascript submissions
  √ Your memory usage beats 41.65 % of javascript submissions (33.7 MB)
  
</pre>
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


67. 二进制求和

给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为非空字符串且只包含数字 1 和 0。

示例 1:
```
输入: a = "11", b = "1"
输出: "100"
```
示例 2:
```
输入: a = "1010", b = "1011"
输出: "10101"
```
<details><summary><b>答案</b></summary>

<pre> 
/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    // 精度不够
    // 1. 
    let suma = 0,
        sumb = 0,
        sum = 0
    for (let i = a.length - 1; i >= 0; i--) {
        suma += a[i] * Math.pow(2, a.length - 1 - i)
    }
    for (let i = b.length - 1; i >= 0; i--) {
        sumb += b[i] * Math.pow(2, b.length - 1 - i)
    }
    sum = suma + sumb
    console.log(sum)

    return sum.toString(2)

    // 2.
    suma = parseInt(a, 2)
    sumb = parseInt(b, 2)
    sum = suma + sumb
    return sum.toString(2)

};
console.log(addBinary("10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101", "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"))
</pre> 
提供的API当数字过大时，精度出错


正确方法：

前提:字符串必须转化为数字


1. 将a和b都倒置

2. 取出两者中的最长长度

3. 申明一个空数组

4. 循环最长长度,当前a和b和res之和等于一个当前值

5. 如果当前值大于等于2,取模,该位置清0,res最后塞进1,否则res当前位置上的值就等于当前值

6. 跳出循环,返回倒置之后的2进制数

<pre>
/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    a = a.split('').reverse().join('')
    b = b.split('').reverse().join('')
    let length = a.length > b.length ? a.length : b.length
    let res = []
    for (let i = 0; i < length; i++) {
        numa = Number(a[i] || 0)
        numb = Number(b[i] || 0)

        let current = Number(res[i] || 0) + numa + numb
        if (current >= 2) {
            res[i] = current % 2
            res.push(1)
        } else {
            res[i] = current
        }
    }
    return res.reverse().join('')
};
</pre>

<pre>
✔ Accepted
  ✔ 294/294 cases passed (104 ms)
  ✔ Your runtime beats 48.91 % of javascript submissions
  ✔ Your memory usage beats 50.21 % of javascript submissions (35.7 MB)
</pre>
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---


69. x 的平方根


实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:
```
输入: 4
输出: 2
```
示例 2:

```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

<details><summary><b>答案</b></summary>

耗时太长,千万不要这要弄

<pre> 
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    x=Number(x)
    if (x === 0) {
        return 0
    }
    Array.prototype.max = function () {
        return Math.max.apply({}, this)
    }
    let minArr = []
    for (let i = 0; i <= x; i++) {
        let s = i*i
        if (s === x) {
            return i
        } else if (s < x) {
            minArr.push(i)
        }
    }
    return minArr.max()

};
console.log(mySqrt('1978959248'))
</pre> 

采用二分法才是王道


1.  定义两个边界left和right,right就是x的一半加一,结果值为mid

2.  左边小于右边一直循环

3.  mid等于left和right的一半

4.  如果mid的平方大于x,那么right等于mid减一

5.  如果小于x,那么left加一

6.  否则,结果就是mid值

7.  如果循环结束没有匹配到,那结果就是right值

<pre>
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    x = Number(x)
    let left = 1,
        right = Math.floor((x / 2)) + 1,
        mid = 0
    while (left <= right) {
        mid = Math.floor((left + right) / 2)

        if (mid * mid > x) {
            right = mid - 1
        } else if (mid * mid < x) {
            left += 1
        } else {
            return mid
        }
    }
    return right
};
</pre>

<pre>
✔ Accepted
  ✔ 1017/1017 cases passed (240 ms)
  ✔ Your runtime beats 5.25 % of javascript submissions
  ✔ Your memory usage beats 32.03 % of javascript submissions (35.7 MB)
</pre>
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---



395.   至少有K个重复字符的最长子串

找到给定字符串（由小写字符组成）中的最长子串 T ， 要求 T 中的每一字符出现次数都不少于 k 。输出 T 的长度。

示例 1:
```
输入:
s = "aaabb", k = 3

输出:
3

最长子串为 "aaa" ，其中 'a' 重复了 3 次。
```
示例 2:
```
输入:
s = "ababbc", k = 2

输出:
5

最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
```
<details><summary><b>答案</b></summary>

<pre> 
/*
 * @lc app=leetcode.cn id=395 lang=javascript
 *
 * [395] 至少有K个重复字符的最长子串
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
    let map = new Map()
    let j = 1
    let total = 0
    for (let i = 0; i < s.length; i++) {
        if (map.size === 0) {
            map.set(s[i], j)
        } else
        if (map.has(s[i])) {
            j = map.get(s[i])
            j++
            map.set(s[i], j)

        } else {
            j = 1
            map.set(s[i], j)
        }
    }
    map.forEach(item => {
        if (item >= k) {
            total += item
        }
    })
    return total
};

</pre> 
</details>

[[↑] 回到顶部](#awsome-interview-back-end)


---
