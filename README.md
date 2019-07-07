# awsome-interview-back-end

- 欢迎大家将所有面试题都可以放进来，方便总结和反思。

- 欢迎大家都来看看，提供各个阶段的前端爱好者学习和面试的必备题库。

- 欢迎大家将自己面过的题目或看到比较经典的贡献出来，众人拾柴火焰高，相信有很多人都会受到影响和帮助。


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
