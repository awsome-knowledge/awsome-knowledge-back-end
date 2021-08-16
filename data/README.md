## 数据结构
数据结构(`data structure`)是带有结构特性的数据元素的集合，它研究的是数据的逻辑结构和数据的物理结构以及它们之间的相互关系，并对这种结构定义相适应的运算，设计出相应的算法，并确保经过这些运算以后所得到的新结构仍保持原来的结构类型。简而言之，数据结构是相互之间存在一种或多种特定关系的数据元素的集合，即带“结构”的数据元素的集合。“结构”就是指数据元素之间存在的关系，分为逻辑结构和存储结构。 

数据的逻辑结构和物理结构是数据结构的两个密切相关的方面，同一逻辑结构可以对应不同的存储结构。算法的设计取决于数据的逻辑结构，而算法的实现依赖于指定的存储结构。

数据结构的研究内容是构造复杂软件系统的基础，它的核心技术是分解与抽象。通过分解可以划分出数据的3个层次；再通过抽象，舍弃数据元素的具体内容，就得到逻辑结构。类似地，通过分解将处理要求划分成各种功能，再通过抽象舍弃实现细节，就得到运算的定义。上述两个方面的结合可以将问题变换为数据结构。这是一个从具体（即具体问题）到抽象（即数据结构）的过程。然后，通过增加对实现细节的考虑进一步得到存储结构和实现运算，从而完成设计任务。这是一个从抽象（即数据结构）到具体（即具体实现）的过程。 
### 树
树状图是一种数据结构，它是由n（n>=1）个有限结点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。它具有以下的特点：
每个结点有零个或多个子结点；没有父结点的结点称为根结点；每一个非根结点有且只有一个父结点；除了根结点外，每个子结点可以分为多个不相交的子树；
#### 规律
##### 完全二叉树的公式
1. 第n层的节点数最多为2<sup>n</sup>
2. n层二叉树最多有2<sup>0</sup>+...+2<sup>n</sup>=2<sup>n+1</sup>-1个节点
3. 第一个非叶子节点：length/2
4. 一个节点的孩子节点：2n、2n+1
   
##### 插入，遍历，深度，查找
```js
   function Node(data, left, right) {
       this.data = data;
       this.left = left;
       this.right = right;
   }

   Node.prototype = {
       show: function () {
           console.log(this.data);
       }
   }

   function Tree() {
       this.root = null;
   }

   Tree.prototype = {
       insert: function (data) {
           var node = new Node(data, null, null);
           if (!this.root) {
               this.root = node;
               return;
           }
           var current = this.root;
           var parent = null;
           while (current) {
               parent = current;
               if (data < parent.data) {
                   current = current.left;
                   if (!current) {
                       parent.left = node;
                       return;
                   }
               } else {
                   current = current.right;
                   if (!current) {
                       parent.right = node;
                       return;
                   }
               }

           }
       },
       preOrder: function (node) {
           if (node) {
               node.show();
               this.preOrder(node.left);
               this.preOrder(node.right);
           }
       },
       middleOrder: function (node) {
           if (node) {
               this.middleOrder(node.left);
               node.show();
               this.middleOrder(node.right);
           }
       },
       laterOrder: function (node) {
           if (node) {
               this.laterOrder(node.left);
               this.laterOrder(node.right);
               node.show();
           }
       },
       getMin: function () {
           var current = this.root;
           while (current) {
               if (!current.left) {
                   return current;
               }
               current = current.left;
           }
       },
       getMax: function () {
           var current = this.root;
           while (current) {
               if (!current.right) {
                   return current;
               }
               current = current.right;
           }
       },
       getDeep: function (node, deep) {
           deep = deep || 0;
           if (node == null) {
               return deep;
           }
           deep++;
           var dleft = this.getDeep(node.left, deep);
           var dright = this.getDeep(node.right, deep);
           return Math.max(dleft, dright);
       },
       getNode: function (data, node) {
           if (node) {
               if (data === node.data) {
                   return node;
               } else if (data < node.data) {
                   return this.getNode(data, node.left);
               } else {
                   return this.getNode(data, node.right);
               }
           } else {
               return null;
           }
       }
   }

   var t = new Tree();
   t.insert(3);
   t.insert(8);
   t.insert(1);
   t.insert(2);
   t.insert(5);
   t.insert(7);
   t.insert(6);
   t.insert(0);
   console.log(t);
   t.middleOrder(t.root);
   console.log(t.getMin(), t.getMax());
   console.log(t.getDeep(t.root, 0));
   console.log(t.getNode(5, t.root));
```

```
{ root:
   { data: 3,
     left:
      { data: 1,
        left: { data: 0, left: null, right: null },
        right: { data: 2, left: null, right: null } },
     right:
      { data: 8,
        left:
         { data: 5,
           left: null,
           right:
            { data: 7,
              left: { data: 6, left: null, right: null },
              right: null } },
        right: null } } }

0
1
2
3
5
6
7
8
{ data: 0, left: null, right: null } { data: 8,
  left:
   { data: 5,
     left: null,
     right:
      { data: 7,
        left: { data: 6, left: null, right: null },
        right: null } },
  right: null }
5
{ data: 5,
  left: null,
  right:
   { data: 7,
     left: { data: 6, left: null, right: null },
     right: null } 
```

![avatar](http://images.qiufeihong.top/tree.jpg)

上述的查找运用了二分查找
##### 二分查找
二分查找的条件是必须是有序的线性表。

那目标值和线性表中的中点值进行比较，如果相等则返回他在表中的位置；如果小于，那线性表就要对折，起始不变，终点为线性表之前的中点；如果大于，那线性表就要对折，终点不变，起始为线性表之前的中点。依次迭代下去，如果找不到就返回-1

```
function binarySearch(data, arr, start, end) {
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (data == arr[mid]) {
        return mid;
    } else if (data < arr[mid]) {
        return binarySearch(data, arr, start, mid - 1);
    } else {
        return binarySearch(data, arr, mid + 1, end);
    }
}
var arr = [0, 1, 1, 1, 1, 1, 4, 6, 7, 8]
console.log(binarySearch(1, arr, 0, arr.length-1));

```

##### 求二叉树的遍历
给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

输入描述:

两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

输出描述:

输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

样例：
```
输入
ABC
BAC
FDXEAG
XDEFAG

输出
BCA
XEDGAF
```

和上面题目的思路基本相同

1. 前序遍历找到根结点root
2. 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
3. 截取左子树的中序遍历、右子树的中序遍历
4. 截取左子树的前序遍历、右子树的前序遍历
5. 递归拼接二叉树的后序遍历

<pre>

let pre;
let vin;
 
while((pre = readline())!=null){
    vin = readline();
    print(getHRD(pre,vin));
}
 
    function getHRD(pre, vin) {
      if (!pre) {
        return '';
      }
      if (pre.length === 1) {
        return pre;
      }
      const head = pre[0];
      const splitIndex = vin.indexOf(head);
      const vinLeft = vin.substring(0, splitIndex);
      const vinRight = vin.substring(splitIndex + 1);
      const preLeft = pre.substring(1, splitIndex + 1);
      const preRight = pre.substring(splitIndex + 1);
      return getHRD(preLeft, vinLeft) + getHRD(preRight, vinRight) + head;
    }
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### LeetCode
##### 105. 从前序与中序遍历序列构造二叉树
根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出
```
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
```
返回如下的二叉树：
```
    3
   / \
  9  20
    /  \
   15   7
```


前序遍历：根左右
后序遍历：左根右

![avatar](http://images.qiufeihong.top/105.jpg)

<pre>
/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    p = i = 0
    build = function(stop) {
        if (inorder[i] != stop) {
            var root = new TreeNode(preorder[p++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build()
};


</pre>

<pre>
✔ Accepted
  ✔ 203/203 cases passed (108 ms)
  ✔ Your runtime beats 86.27 % of javascript submissions
  ✔ Your memory usage beats 91.53 % of javascript submissions (35.9 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 94. 二叉树的中序遍历
给定一个二叉树，返回它的中序 遍历。

示例:
```
输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

迭代：

1. root或者stack不为空，循环不停止
2. 如果root不为空，root塞进stack，root被root的左分支替换
3. 如果root为空，root等于stack中的最后一个元素,root的值塞进res数组
4. root被root右分支替换
5. 最后返回res

<pre>
/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const stack = [];
    const res = [];
  
    while (root || stack.length) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        res.push(root.val);
        root = root.right;
      }
    }
  
    return res;
};


</pre>

<pre>
✔ Accepted
  ✔ 68/68 cases passed (88 ms)
  ✔ Your runtime beats 26.11 % of javascript submissions
  ✔ Your memory usage beats 41.05 % of javascript submissions (33.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 100. 相同的树
给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:
```
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
```
示例 2:
```
输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
```
示例 3:
```
输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```
根据题意得知，底层已经实现了TreeNode,只要判断是否是相同的树

1. 如果两者都为空，那么返回true
2. 如果两者有一者为空或者值不相同，那么返回false
3. 迭代每一层分支

<pre>
/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
    if (!p && !q) return true
    if (!p || !q || p.val !== q.val) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
</pre>

<pre>
✔ Accepted
  ✔ 57/57 cases passed (76 ms)
  ✔ Your runtime beats 72.47 % of javascript submissions
  ✔ Your memory usage beats 39.77 % of javascript submissions (33.7 MB)
</pre>


[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 101. 对称二叉树
给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```
    1
   / \
  2   2
   \   \
   3    3
```
说明:

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。


根据题意得知，底层已经实现了TreeNode,只要判断是否是对称树

迭代

1. 需要迭代每一层p和q，判断p的left和q的right是否相同
2. 迭代中p和q其中只有一个为空，那肯定就是不对称

<pre>
/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    function middle(p, q) {
        if (p == null && q == null) return true
        if (p == null || q == null) return false
        return p.val == q.val && middle(p.left, q.right) && middle(p.right, q.left)
    }
    return middle(root, root)
};
</pre>
<pre>
√ Accepted
  √ 195/195 cases passed (88 ms)
  √ Your runtime beats 74.55 % of javascript submissions
  √ Your memory usage beats 38.91 % of javascript submissions (35.5 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 104. 二叉树的最大深度（快手）
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。


根据题意得知，底层已经实现了 `TreeNode`，只要计算二叉树的最大深度

递归
1. 需要递归每一层root，如果root的left和right没定义或者为空，则返回0
2. 在每次递归过程中，取出左边或者右边的最大值，然后加上1

<pre>
/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (root === undefined || root === null) {
        return 0
    }
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

</pre>
<pre>
√ Accepted
  √ 39/39 cases passed (96 ms)
  √ Your runtime beats 54.83 % of javascript submissions
  √ Your memory usage beats 12.78 % of javascript submissions (37.4 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 107. 二叉树的层次遍历 II
给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
例如：
给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回其自底向上的层次遍历为：
```
[
  [15,7],
  [9,20],
  [3]
]
```
1. 先定义queue存储root节点，循环queue的长度，长度为0停止，每次循环，从queue底部出来一个节点crt，将crt放进stack中
2. 如果crt左和右的节点还有值，那就覆盖。
3. 第二个循环stack长度，crt是stack头部出来的值
4. 定义的maxLevel是最大层数，定义maxLevel长度的result数组，将crt值到塞进result

<pre>
/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    
    var queue = [ {node : root, level : 0} ],
        crt,
        stack = [],
        maxLevel,
        result = [];
    
    if(!root)
        return result;
        
    while(queue.length > 0) {
        crt = queue.shift(); // dequeue()
        
        stack.push(crt);
        
        if(crt.node.right)
            queue.push( { node : crt.node.right, level : crt.level + 1 } );
            
        if(crt.node.left)
            queue.push( { node : crt.node.left, level : crt.level + 1 });
        
      maxLevel = crt.level + 1;
    }
    
    while(stack.length > 0) {
        crt = stack.pop();
        if(crt.level < maxLevel) {
            result.push([]);
            maxLevel--;
        }
        result[result.length - 1].push(crt.node.val);
        
    }
    
    return result;
};

</pre>

<pre>
✔ Accepted
  ✔ 34/34 cases passed (92 ms)
  ✔ Your runtime beats 32.74 % of javascript submissions
  ✔ Your memory usage beats 5.59 % of javascript submissions (35.6 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 110. 平衡二叉树
Category|Difficulty|Likes|Dislikes
algorithms|Easy (49.05%)|151|-

Tags

tree | depth-first-search

Companies

bloomberg

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:

给定二叉树 [3,9,20,null,null,15,7]
```
    3
   / \
  9  20
    /  \
   15   7
```
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]
```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
返回 false 。

1. 递归
2. 给一个中间函数
3. 判断若是node为空，则返回0
4. 左孩子和右孩子递归
5. 如果左孩子右孩子和深度差大于1，则返回-1，否则返回二叉树的最大深度
6. 最后递归结束，判断是否等于-1

```js
/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
    function middle(node) {
        if (!node) {
            return 0
        }
        let left = middle(node.left)
        let right = middle(node.right)
        if (left == -1 || right == -1 || Math.abs(left - right) > 1) {
            return -1
        }
        return Math.max(left, right) + 1
    }
    return middle(root) != -1
};
```

<pre>
√ Accepted
  √ 227/227 cases passed (108 ms)
  √ Your runtime beats 49.74 % of javascript submissions
  √ Your memory usage beats 66.34 % of javascript submissions (37.4 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 111. 二叉树的最小深度
Category|Difficulty|Likes|Dislikes
algorithms|Easy (39.81%)|148|-

Tags

tree | depth-first-search | breadth-first-search

Companies

Unknown

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明: 叶子节点是指没有子节点的节点。

示例:

给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最小深度  2.
递归，分治，
1. root为空则返回0
2. 左孩子为空，则右孩子最小深度加1
3. 右孩子为空，则左孩子最小深度加1
4. 左右都有，那就是递归，重新执行1，2，3

```js
/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (!root) {
        return 0
    }
    if (!root.left) {
        return minDepth(root.right) + 1
    }
    if (!root.right) {
        return minDepth(root.left) + 1
    }
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1

};
```
<pre>
✔ Accepted
  ✔ 41/41 cases passed (88 ms)
  ✔ Your runtime beats 84.4 % of javascript submissions
  ✔ Your memory usage beats 78.39 % of javascript submissions (37 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 114. 二叉树的前序遍历
给定一个二叉树，返回它的 前序 遍历。

 示例:
```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [1,2,3]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

递归算法

```js
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root, res = []) {
    if (root) {
        res.push(root.val)
        preorderTraversal(root.left, res)
        preorderTraversal(root.right, res)
    }
    return res
};
```
<pre>
√ Accepted
  √ 68/68 cases passed (76 ms)
  √ Your runtime beats 71.5 % of javascript submissions
  √ Your memory usage beats 46.63 % of javascript submissions (33.7 MB)
</pre>


迭代算法

1. 定义res和tmp数组
2. 目标节点进入res和tmp
3. 左孩子进入res和tmp，直到左边结束
4. 将tmp中的值出栈，右孩子进入，再执行2，3，4

```js
/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    let res = [],
        tmp = []
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            res.push(current.val)
            tmp.push(current)
            current = current.left
        }
        current = tmp.pop()
        current = current.right
    }
    return res
};
```
<pre>
√ Accepted
  √ 68/68 cases passed (84 ms)
  √ Your runtime beats 37.76 % of javascript submissions
  √ Your memory usage beats 40.42 % of javascript submissions (33.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 145. 二叉树的后序遍历
给定一个二叉树，返回它的 后序 遍历。

示例:
```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```
进阶: 递归算法很简单，你可以通过迭代算法完成吗？

递归算法

```js
/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root, res = []) {

    if (root) {
        postorderTraversal(root.left, res)
        postorderTraversal(root.right, res)
        res.push(root.val)
    }

    return res
};
```
<pre>
√ Accepted
  √ 68/68 cases passed (88 ms)
  √ Your runtime beats 24.38 % of javascript submissions
  √ Your memory usage beats 38.52 % of javascript submissions (33.7 MB)
</pre>
迭代算法

取跟节点为目标节点，开始遍历
1. 左孩子入栈 -> 直至左孩子为空的节点

2. 栈顶节点的右节点为空或右节点被访问过 -> 节点出栈并访问他，将节点标记为已访问

3. 栈顶节点的右节点不为空且未被访问，以右孩子为目标节点，再依次执行1、2、3


/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    let res = [],
        tmp = []
    // 标记为上一个访问的节点
    let last = null
    let current = root
    while (current || tmp.length > 0) {
        while (current) {
            tmp.push(current)
            current = current.left
        }
        current = tmp[tmp.length - 1]
        if (!current.right || current.right == last) {
            current = tmp.pop()
            res.push(current.val)
            last = current
            // 继续弹栈
            current = null
        } else {
            current = current.right
        }
    }
    return res
};
</pre>

<pre>
√ Accepted
  √ 68/68 cases passed (76 ms)
  √ Your runtime beats 71.18 % of javascript submissions
  √ Your memory usage beats 48.36 % of javascript submissions (33.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 226. 翻转二叉树
Category|Difficulty|Likes|Dislikes
--|--|--|--
algorithms|Easy (71.45%)|250|-

Tags

tree


Companies

Unknown


翻转一棵二叉树。

示例：

输入：
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
输出：
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
备注:
这个问题是受到 Max Howell 的 原问题 启发的 ：

谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。
<pre>
/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if(root){
      let tmp=root.left
      root.left=root.right
      root.right=tmp
      invertTree(root.left)
      invertTree(root.right)
  }
  return root
};

</pre>

<pre>
✔ Accepted
  ✔ 68/68 cases passed (80 ms)
  ✔ Your runtime beats 52.46 % of javascript submissions
  ✔ Your memory usage beats 26.63 % of javascript submissions (33.8 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 230. 二叉搜索树中第K小的元素
Category|Difficulty|Likes|Dislikes
algorithms|Medium(65.90%)|92|-

Tags

binary-search | tree

Companies

bloomberg | google | uber

给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。

说明：
你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。

示例 1:
```
输入: root = [3,1,4,null,2], k = 1
   3
  / \
 1   4
  \
   2
输出: 1
```
示例 2:

输入: root = [5,3,6,2,4,null,null,1], k = 3
```       5
      / \
     3   6
    / \
   2   4
  /
 1
输出: 3
```
进阶：
如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？

递归思路正确

利用中序遍历生成数组，找到数组中第k小的数

但是运行有误
```js
/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let arr = []
    middle(root, arr)

    if (k > 0 && k <= arr.length) {
        return arr[k - 1]
    }
        return null
  
};

function middle(node, arr) {
    if (node) {
        middle(node.left, arr)
        arr.push(node)
        middle(node.right, arr)
    }
}
```

<pre>
✘ Wrong Answer
  ✘ 0/91 cases passed (N/A)
  ✘ testcase: '[3,1,4,null,2]\n1'
  ✘ answer: NaN
  ✘ expected_answer: 1
  ✘ stdout:
</pre>

递归的正确方式
```js
/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
function kthSmallest(root, k) {
    let res

    function middle(node) {
        if (node) {
            middle(node.left)
            if (--k === 0) {
                res = node.val
            }
            middle(node.right)
        }
    }
    middle(root)

    return res
};
```
<pre>
✔ Accepted
  ✔ 91/91 cases passed (92 ms)
  ✔ Your runtime beats 94.2 % of javascript submissions
  ✔ Your memory usage beats 56.94 % of javascript submissions (39.2 MB)

</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 链表
链表是一种物理存储单元上非连续、非顺序的存储结构，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。链表由一系列结点（链表中每一个元素称为结点）组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。 相比于线性表顺序结构，操作复杂。由于不必须按顺序存储，链表在插入的时候可以达到O(1)的复杂度，比另一种线性表顺序快得多，但是查找一个节点或者访问特定编号的节点则需要O(n)的时间，而线性表和顺序表相应的时间复杂度分别是O(logn)和O(1)。
使用链表结构可以克服数组链表需要预先知道数据大小的缺点，链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。但是链表失去了数组随机读取的优点，同时链表由于增加了结点的指针域，空间开销比较大。链表最明显的好处就是，常规数组排列关联项目的方式可能不同于这些数据项目在记忆体或磁盘上顺序，数据的存取往往要在不同的排列顺序中转换。链表允许插入和移除表上任意位置上的节点，但是不允许随机存取。链表有很多种不同的类型：单向链表，双向链表以及循环链表。链表可以在多种编程语言中实现。像Lisp和Scheme这样的语言的内建数据类型中就包含了链表的存取和操作。程序语言或面向对象语言，如C,C++和Java依靠易变工具来生成链表。
##### 从尾到头打印链表
题目

输入一个链表，按链表值从尾到头的顺序返回一个ArrayList


要了解链表的数据结构：

val属性存储当前的值，next属性存储下一个节点的引用。

要遍历链表就是不断找到当前节点的next节点，当next节点是null时，说明是最后一个节点，停止遍历。

因为是从尾到头的顺序，使用一个队列来存储打印结果，每次从队列头部插入。

<pre> 
/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    const array = [];
    while(head){
        array.unshift(head.val);
        head = head.next;
    }
    return array;
}

</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
#### leetcode
##### 2. 两数相加
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 19. 删除链表的倒数第N个节点
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 206. 反转链表
Category|Difficulty|Likes|Dislikes
algorithms|Easy (63.67%)|553|-

Tags

linked-list

Companies

adobe | amazon | apple | bloomberg | facebook | microsoft | snapchat | twitter | uber | yahoo | yelp | zenefits

反转一个单链表。

示例:
```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```
进阶:
你可以迭代或递归地反转链表。你能否用两种方法解决这道题？

迭代：
1. 申明临时和最终列表
2. 临时列表头部存放的是起始列表的目前head，而尾部存放的是最终列表

<pre> 
/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @return {ListNode}
 */
var reverseList = function (head) {
    let tmp = null
    let newHead = null
    while (head !== null) {
        tmp = head
        head = head.next
        tmp.next = newHead
        newHead = tmp
    }
    return newHead
};
</pre> 

<pre> 
√ Accepted
  √ 27/27 cases passed (92 ms)
  √ Your runtime beats 40.17 % of javascript submissions
  √ Your memory usage beats 52.52 % of javascript submissions (34.9 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 数组
所谓数组，是有序的元素序列。若将有限个类型相同的变量的集合命名，那么这个名称为数组名。组成数组的各个变量称为数组的分量，也称为数组的元素，有时也称为下标变量。用于区分数组的各个元素的数字编号称为下标。数组是在程序设计中，为了处理方便， 把具有相同类型的若干元素按无序的形式组织起来的一种形式。这些无序排列的同类数据元素的集合称为数组。
数组是用于储存多个相同类型数据的集合。
##### 100万个成员的数组取第一个和最后一个是否有性能差距
答案显然是没有,因为数组是一块线性连续的内存,我们可以通过寻址公式一步取出对应的成员,这跟成员的位置没有关系.
##### 1. 两数之和（字节跳动）
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：
```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```
示例 2：
```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```
示例 3：
```
输入：nums = [3,3], target = 6
输出：[0,1]
```
我的思路很简单，先给一个空对象，再遍历数组中的每一个数字，让目标值和每个值做差，然后判断对象中是否有差，如果有则返回对象的该差的 value 和 i，没有则将该下标对应的值和该下标作为 key 和 value 塞进对象中
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

冒泡排序的方式
<pre>
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > sum) continue;

        for (var j = 0; j < arr.length; j++) {
            if (arr[j] > sum) continue;

            if (arr[i] + arr[j] == sum) return [arr[i], arr[j]];
        }
    }

    return null;
}
</pre>
查找的方式

最终的结果是要找到和为sum的两个数，那么我们可以转换一种思路：默认第一个num1数已经存在，那么第二个数就是sum - num1，这就转换为从数组中查找的问题了。虽然和第一种方法很像，但是在有序数列中进行查找明显要快于逐个比较。
<pre>
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    arr.sort();

    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > sum) continue;

        var restNum = sum - arr[i];

        // 考虑下为什么要 > i
        if (arr.indexOf(restNum) > i) return [arr[i], restNum];
    }

    return null;
}
</pre>
这种解法的前提是需要对数组进行排序（快排），故时间复杂度为O(nlogn)，二分查找的时间复杂度为O(log2n)，最坏的情况是遍历了整个数组，即时间复杂度为O(n)，那么整体的时间复杂度为O(nlog2n)，效果上要优于冒泡排序的方式。

- 快排方式
同样需要对数组进行排序（升序），我们知道排序后的数组必然是左边的数不会超过右边的数，因此我们可以把左边的数和右边的数的和作为基准值来和目标值比较，如果该值小于目标值，那么代表两个加数的值不够大，右边的值已经到达顶峰了，那么就从左边取下一个值相加和目标值比较，如果该值比目标值大，那么表示右边的值太大了，需要获取一个小一点的加数，这时需要从右边取倒数第二个数相加后比较，如果此时的值和目标值相等，恭喜你，我的小乖乖，原来你俩在这里！说了这么多感觉还是一头雾水的同学直接看代码吧，毕竟我们都是同一类猿:-)
<pre>
function getNum(arr, sum) {
    if (!Array.isArray(arr)) return null;

    arr.sort();

    for (var i = 0, j = arr.length - 1; i < j;) {
        if (arr[i] + arr[j] < sum) i++;

        else if (arr[i] + arr[j] > sum) j--;

        else return [arr[i], arr[j]];
    }

    return null;
}
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 4. 寻找两个有序数组的中位数
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
    // sort内的排序函数不可以省略，且必须是从小到大
    const arr = nums1.concat(nums2).sort((a, b) => a - b )
    const n = arr.length
    if (n % 2 == 0) {
        // 偶数
        return (arr[n / 2] + arr[n / 2 - 1]) / 2
    } else {
        // 奇数
        return arr[Math.floor(n / 2)]
    }
};
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 11. 盛最多水的容器
给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

说明：你不能倾斜容器，且 n 的值至少为 2。

![avatar](./picture/11.jpg)

图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

示例:
```
输入: [1,8,6,2,5,4,8,3,7]
输出: 49
```

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
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 15. 三数之和
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

1. 先判断数组长度，小于3则返回空数组
2. 对数组排序（升序）
3. 对数组进行遍历，索引为i变量，如果每个值都大于0，则也返回空数组；
4. 对数组遍历，索引为j变量，是i的后一位，索引为k变量，是数组的最后一位，保持j小于k
5. 如果第i，j，k个值之和为0，则返回i，j，k的数组，然后继续找
6. 如果之和大于0，那么k往前移一位
6. 如果之和小于0，那么j往后移一位
7. 当j小于k并且第j和j-1个值相等，往后移一位
8. 当j小于k并且第k和k+1个值相等，往前移一位
9.  如果之和大于0，则k往前移，否则j往后移 

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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 16. 最接近的三数之和
给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

```
例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.

与 target 最接近的三个数的和为 2. (-1 + 2 + 1 = 2).
```

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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 18. 四数之和

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
解析：
1. 老规矩——先排序（升序）
2. 三层循环，最后两个标志c和k作为活动位，
3. 如果四数之和等于目标值，找到这四个数push进arr
4. 如果之和小于目标值，说明num[c]不够大，c往后一位
5. 如果之和大于目标值，说明num[k]太大，k往前一位

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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 总结（三数四数之和问题）
遇到这类问题不要怕，老规矩——先排序，将最后两位作为头尾摇摆位，三数之和两个循环，四数之和三个循环，大了，尾位往前移，小了头位往后移。

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 26. 删除排序数组中的重复项
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

解题方案：
1. 遍历数组
2. 上一个数和下一个数进行等价比较
3. 相等则删掉这个数，下一个数往前进一位

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
    // console.log(nums)
    // 1.遍历
    for (i = 0; i < nums.length; i++) {
        // 2.上一个数和下一个数进行等价比较
        if (nums[i] == nums[i+1]) {
            // 3.相等则删掉这个数，下一个数往前进一位
            nums.splice(i, 1);
            i--;
        }
    }
};
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 27. 移除元素
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

解题步骤：

切记这是一个有序数组，如果不是也要进行排序进行下面步骤

1. 遍历数组
2. 判断当前值与目标值是否相等
3. 相等则删除当前值
4. 下一个值往前移重新判断当前下标的值
```js
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
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 31.下一个排列
```
Category	Difficulty	Likes	Dislikes
algorithms	Medium (37.15%)	1232	-
Tags
Companies
```
实现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须 原地 修改，只允许使用额外常数空间。

 

示例 1：
```
输入：nums = [1,2,3]
输出：[1,3,2]
```
示例 2：
```
输入：nums = [3,2,1]
输出：[1,2,3]
```
示例 3：
```
输入：nums = [1,1,5]
输出：[1,5,1]
```
示例 4：
```
输入：nums = [1]
输出：[1]
```

提示：
```
1 <= nums.length <= 100
0 <= nums[i] <= 100
```
算法推导
如何得到这样的排列顺序？这是本文的重点。我们可以这样来分析：

1. 我们希望下一个数比当前数大，这样才满足“下一个排列”的定义。因此只需要将后面的「大数」与前面的「小数」交换，就能得到一个更大的数。比如 123456，将 5 和 6 交换就能得到一个更大的数 123465。
2. 我们还希望下一个数增加的幅度尽可能的小，这样才满足“下一个排列与当前排列紧邻“的要求。为了满足这个要求，我们需要：
- 在尽可能靠右的低位进行交换，需要从后向前查找
- 将一个 尽可能小的「大数」 与前面的「小数」交换。比如 123465，下一个排列应该把 5 和 4 交换而不是把 6 和 4 交换
- 将「大数」换到前面后，需要将「大数」后面的所有数重置为升序，升序排列就是最小的排列。以 123465 为例：首先按照上一步，交换 5 和 4，得到 123564；然后需要将 5 之后的数重置为升序，得到 123546。显然 123546 比 123564 更小，123546 就是 123465 的下一个排列
以上就是求“下一个排列”的分析过程。

解题步骤：
1. 定义下标，默认倒数第二个数，给最后一个数空间
2. 循环判断下标是否小于0，是否小于后边的数
3. 否则i往前走
4. 循环从最后面开始判断，后面的值大于nums[i]
5. 找到后，交换两者，大的在前,实现变大
6. 如果 i = -1，说明是递减排列，如[3,2,1],没有下一排列，反转那么返回[1,2,3]

```js
/*
 * @lc app=leetcode.cn id=31 lang=javascript
 *
 * [31] 下一个排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    // 定义下标，默认倒数第二个数，给最后一个数空间
    let i = nums.length - 2
    // 循环判断下标是否小于0，是否小于后边的数
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        // 否则i往前走
        i--
    }
    if (i >= 0) {
        let j = nums.length - 1
        // 循环从最后面开始判断，后面的值大于nums[i]
        while (j >= 0 && nums[j] <= nums[i]) {
            // 否则j往前走
            j--
        }
        // 找到后，交换两者，大的在前,实现变大
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    //如果 i = -1，说明是递减排列，如[3,2,1],没有下一排列，反转那么返回[1,2,3]
    let l = i + 1
    let r = nums.length - 1
    while (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]]
        l++
        r--
    }
    return nums
};
// @lc code=end

console.log(nextPermutation([3, 2, 1]))
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 33. 搜索旋转排序数组
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

解题步骤：
1. indexOf这个方法正好用的上,返回目标值在数组中的索引
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 34. 在排序数组中查找元素的第一个和最后一个位置
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

解题步骤：
1. indexOf这个方法正好用的上,返回目标值在数组中的索引
2. lastIndexOf()从后往前找目标值,与indexOf()恰好相反
```js
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
```
<pre>
✔ Accepted
  ✔ 88/88 cases passed (80 ms)
  ✔ Your runtime beats 79.6 % of javascript submissions
  ✔ Your memory usage beats 64.12 % of javascript submissions (34.9 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 35. 搜索插入位置
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
解题步骤：
1. 使用indexOf()方法找到目标值在数组中的索引
2. 如果有则返回索引，否则就插入目标值
3. 按从小到大排序
4. 返回目标值索引
```js
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
```
<pre>
√ Accepted
  √ 62/62 cases passed (108 ms)
  √ Your runtime beats 24.06 % of javascript submissions
  √ Your memory usage beats 5.32 % of javascript submissions (35.9 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 39. 组合总和
```

Category	Difficulty	Likes	Dislikes
algorithms	Medium (72.52%)	1444	-
Tags
array | backtracking

Companies
snapchat | uber
```
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
示例 3：
```
输入: candidates = [2], target = 1
输出: []
```
示例 4：
```
输入: candidates = [1], target = 1
输出: [[1]]
```
示例 5：
```
输入: candidates = [1], target = 2
输出: [[1,1]]
``` 

提示：
```
1 <= candidates.length <= 30
1 <= candidates[i] <= 200
candidate 中的每个元素都是独一无二的。
1 <= target <= 500
```
注意是无重复元素的正整数数组

解题步骤：
1. 回溯三部曲
- 递归函数参数
定义两个全局变量，二维数组result存放结果集，数组path存放符合条件的结果。
- 递归终止条件
从叶子节点可以清晰看到，终止只有两种情况，sum大于target和sum等于target。

sum等于target的时候，需要收集结果
- 单层搜索的逻辑
单层for循环依然是从startIndex开始，搜索candidates集合。
1. 剪枝优化
对总集合排序之后，如果下一层的sum（就是本层的 sum + candidates[i]）已经大于target，就可以结束本轮for循环的遍历。
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 40. 组合总和 II
```
Category	Difficulty	Likes	Dislikes
algorithms	Medium (63.44%)	636	-
Tags
array | backtracking

Companies
snapchat
```
给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

注意：解集不能包含重复的组合。 

 

示例 1:
```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```
示例 2:
```
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
```

提示:
```
1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
```
注意是无重复元素的正整数数组

解题步骤：
1. 回溯三部曲
- 递归函数参数
定义两个全局变量，二维数组result存放结果集，数组path存放符合条件的结果。
- 递归终止条件
从叶子节点可以清晰看到，终止只有两种情况，sum大于target和sum等于target。

sum等于target的时候，需要收集结果
- 单层搜索的逻辑
单层for循环依然是从startIndex开始，搜索candidates集合。
1. 剪枝优化
对总集合排序之后，如果下一层的sum（就是本层的 sum + candidates[i]）已经大于target，就可以结束本轮for循环的遍历。
```
/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
    const res = [], path = [], len = candidates.length
    candidates.sort()
    backtracking(0, 0)
    return res
    function backtracking(sum, i) {
        if (sum > target) return
        if (sum === target) {
            res.push(Array.from(path))
            return
        }
        let f = -1
        for (let j = i; j < len; j++) {
            const n = candidates[j]
            if (n > target - sum || n === f) continue
            path.push(n)
            sum += n
            f = n
            backtracking(sum, j + 1)
            // 回溯
            path.pop()
            sum -= n
        }

    }
};
// @lc code=end



Accepted
175/175 cases passed (80 ms)
Your runtime beats 92.19 % of javascript submissions
Your memory usage beats 81.78 % of javascript submissions (39.4 MB)
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 53. 缺失的第一个正数
```
Category	Difficulty	Likes	Dislikes
algorithms	Hard (41.61%)	1141	-
Tags
array

Companies
Unknown
```
给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。

请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 

示例 1：
```
输入：nums = [1,2,0]
输出：3
```
示例 2：
```
输入：nums = [3,4,-1,1]
输出：2
```
示例 3：
```
输入：nums = [7,8,9,11,12]
输出：1
```

提示：
```
1 <= nums.length <= 5 * 105
-231 <= nums[i] <= 231 - 1
```

在评论区看到有种解法甚是巧妙,按照他的思路我写下了答案。

> 遍历一次数组把大于等于1的和小于数组大小的值放到原数组对应位置，然后再遍历一次数组查当前下标是否和值对应，如果不对应那这个下标就是答案，否则遍历完都没出现那么答案就是数组长度加1。

解题步骤：
1. 从小到大排序 
2. 去重
3. 过滤正整数
4. 空数组返回1
5. 遍历数组长度，判断下标是否等于该位置上的数值，若不等于就返回下标
6. 没找到，则返回数组中最大值+1，也就是数组长度+1

```js
/*
 * @lc app=leetcode.cn id=41 lang=javascript
 *
 * [41] 缺失的第一个正数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    // 1.从小到大排序 
    nums.sort((a, b) => a - b)
    // 2.去重
    nums = [...new Set(nums)]
    // 3.过滤正整数
    nums = nums.filter(n => n > 0)
    // 4.空数组返回1
    if (nums.length === 0) {
        return 1
    }
    // 5.遍历数组长度，判断下标是否等于该位置上的数值，若不等于就返回下标
    for (let i = 0; i < nums.length; i++) {
        if (i + 1 !== nums[i]) {
            return i + 1
        }
    }
    // 6.没找到，则返回数组中最大值+1，也就是数组长度+1
    // return Math.max(...nums) + 1
    return nums.length + 1
};
// @lc code=end

console.log(firstMissingPositive([0, 2, 2, 1, 1]))

Accepted
171/171 cases passed (196 ms)
Your runtime beats 8.1 % of javascript submissions
Your memory usage beats 5.03 % of javascript submissions (102 MB)
``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 42.接雨水
```
Category	Difficulty	Likes	Dislikes
algorithms	Hard (56.66%)	2515	-
Tags
array | two-pointers | stack

Companies
amazon | apple | bloomberg | google | twitter | zenefits
```
给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

![avatar](./../picture/rainwatertrap42.png)

示例 1：
```
输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
```
示例 2：
```
输入：height = [4,2,0,3,2,5]
输出：9
```

提示：
```
n == height.length
0 <= n <= 3 * 104
0 <= height[i] <= 105
```

解题思路：

当前位置的接水量=当前位置左边和右边的最小值-当前位置

解题步骤：
1. 遍历数组
2. 遍历找到当前值左边的最大值
3. 遍历找到当前值右边的最大值
4. 左边和右边取出最小值必须大于当前值，否则不可能接雨水
5. 当前位置接雨水量=最小值减去当前值

```js
/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let sum = 0
    // 1.遍历数组
    for (let i = 0; i < height.length; i++) {
        // console.log('i====', i)
        let leftMax = 0
        let rightMax = 0
        // 2.遍历找到当前值左边的最大值
        for (let p = i - 1; p >= 0; p--) {
            // console.log('p====', p)
            leftMax = Math.max(leftMax, height[p])
            // console.log('leftMax====', leftMax)
        }
        // 3.遍历找到当前值右边的最大值
        for (let q = i + 1; q < height.length; q++) {
            // console.log('q====', q)
            rightMax = Math.max(rightMax, height[q])
            // console.log('rightMax====', rightMax)
        }
        // console.log('sum====', sum)
        // 4.左边和右边取出最小值必须大于当前值，否则不可能接雨水
        if (Math.min(leftMax, rightMax) > height[i]) {
            // 5.当前位置接雨水量=最小值减去当前值
            sum += Math.min(leftMax, rightMax) - height[i]
        }
    }
    return sum
};

Accepted
320/320 cases passed (144 ms)
Your runtime beats 12.07 % of javascript submissions
Your memory usage beats 74.09 % of javascript submissions (39.4 MB)
``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 45.跳跃游戏 II
```
Category	Difficulty	Likes	Dislikes
algorithms	Medium (41.66%)	1072	-
Tags
array | greedy

Companies
Unknown
```
给你一个非负整数数组 nums ，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

假设你总是可以到达数组的最后一个位置。

 

示例 1:
```
输入: nums = [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
```
示例 2:
```
输入: nums = [2,3,0,1,4]
输出: 2
``` 

提示:
```
1 <= nums.length <= 104
0 <= nums[i] <= 1000
```

题目思路：

>在思考这道题目的时候，我们首先会想，要先知道每一次都走当前可选范围的最大值，这样可能最快的走出去，所以我们要记录当前所走的步数能到达的最远距离，并且在可选范围中找到比这个值更大的最远距离，并且每次排查可选范围后，在走到最远距离时记录我们的步数。

>首先需要循环这个数组，所以一定有一个变量 i 代表当前遍历的位置，我们定义一个变量 maxReach 代表遍历时所能触达的最远距离，因为题目需要输出的是步数，所以需要一个 step 变量来记录所走的步数，当找到当前可走范围的时候已经找到范围内的最远距离，我们就走到这里，其实第一次的 maxReach 就是这个范围的边界，然而由于在寻找范围内最远距离的过程中最远距离可能会更新，所以用一个 end 变量来记录


```js
/*
 * @lc app=leetcode.cn id=45 lang=javascript
 *
 * [45] 跳跃游戏 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    // 单步最大搜索长度
    let maxReach = 0;
    // 跳跃步数
    let step = 0;
    // 最远距离
    let end = 0;
    // 遍历数组
    for (let i = 0; i < nums.length - 1; i++) {
        // 单步最远距离=当前位置的值+下标
        maxReach = Math.max(maxReach, nums[i] + i);
        // console.log('maxReach====', maxReach)
        // console.log('i====', i)
        // 如果下标等于最远距离，往前再跳一个，步数+1
        if (i === end) {
            step++;
            end = maxReach;
            // console.log('end====', end)
        }
    }

    return step;
};
// @lc code=end
console.log(jump([2, 3, 0, 1, 4]))


Accepted
106/106 cases passed (80 ms)
Your runtime beats 76.82 % of javascript submissions
Your memory usage beats 54.84 % of javascript submissions (39.7 MB)
``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 53. 最大子序和（快手）
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
示例:
```
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```
进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

1. 最小数是最大值的负数，就是-Number.MAX_VALUE，现将该值赋值给max、
2. 申明sum
3. 遍历nums
4. 如果sum小于零，重置，因为一个数加上负数肯定变小
5. sum加上nums数组中的每个值
6. 判断max和sum取最大值赋值给max
7. 循环结束返回max

```
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
``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 56. 合并区间
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

 

示例 1：
```
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
```
示例 2：
```
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
```

提示：
```
1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
```
```js
/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 var merge = function (intervals) {
    // 数组为空，返回空
    if (intervals.length === 0) {
        return []
    }
    // 数组首位进行从小到大排序
    intervals.sort((a, b) => a[0] - b[0])
    // 取出数组第一位
    let pre = intervals[0]
    let cur = []
    let res = []
    // 从第二位开始遍历数组
    for (let i = 1; i < intervals.length; i++) {
        // 取出第二位后的数据
        cur = intervals[i]
        // 如果前者的右端值>=后者的左端值
        if (pre[1] >= cur[0]) {
            // 前者的左端值不变，右端值取两者最大
            pre[1] = Math.max(pre[1], cur[1])
        } else {
            // 不连续，就将前者塞入结果集
            res.push(pre)
            // 后者替上
            pre = cur
        }
    }
    // 将最后一个塞上
    res.push(pre)
    return res

};

``` 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 57. 插入区间
给你一个 无重叠的 ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

 

示例 1：
```
输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
输出：[[1,5],[6,9]]
```
示例 2：
```
输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出：[[1,2],[3,10],[12,16]]
解释：这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
```
示例 3：
```
输入：intervals = [], newInterval = [5,7]
输出：[[5,7]]
```
示例 4：
```
输入：intervals = [[1,5]], newInterval = [2,3]
输出：[[1,5]]
```
示例 5：
```
输入：intervals = [[1,5]], newInterval = [2,7]
输出：[[1,7]]
```

提示：
```
0 <= intervals.length <= 104
intervals[i].length == 2
0 <= intervals[i][0] <= intervals[i][1] <= 105
intervals 根据 intervals[i][0] 按 升序 排列
newInterval.length == 2
0 <= newInterval[0] <= newInterval[1] <= 105
```

```js
/*
 * @lc app=leetcode.cn id=57 lang=javascript
 *
 * [57] 插入区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
 var insert = function (intervals, newInterval) {
    intervals.push(newInterval)
    // 数组为空，返回空
    if (intervals.length === 0) {
        return []
    }
    // 数组首位进行从小到大排序
    intervals.sort((a, b) => a[0] - b[0])
    // 取出数组第一位
    let pre = intervals[0]
    let cur = []
    let res = []
    // 从第二位开始遍历数组
    for (let i = 1; i < intervals.length; i++) {
        // 取出第二位后的数据
        cur = intervals[i]
        // 如果前者的右端值>=后者的左端值
        if (pre[1] >= cur[0]) {
            // 前者的左端值不变，右端值取两者最大
            pre[1] = Math.max(pre[1], cur[1])
        } else {
            // 不连续，就将前者塞入结果集
            res.push(pre)
            // 后者替上
            pre = cur
        }
    }
    // 将最后一个塞上
    res.push(pre)
    return res
};
// @lc code=end


```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 66. 加一

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
```js
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
```
<pre>
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 75. 颜色分类
给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

 

示例 1：
```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```
示例 2：
```
输入：nums = [2,0,1]
输出：[0,1,2]
```
示例 3：
```
输入：nums = [0]
输出：[0]
```
示例 4：
```
输入：nums = [1]
输出：[1]
```

提示：
```
n == nums.length
1 <= n <= 300
nums[i] 为 0、1 或 2
``` 

进阶：

你可以不使用代码库中的排序函数来解决这道题吗？
你能想出一个仅使用常数空间的一趟扫描算法吗？

```js
/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
 var sortColors = function(nums) {
    return nums.sort((a,b)=>a-b)
    };
// @lc code=end


```
[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 78. 子集
给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

 

示例 1：
```
输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```
示例 2：
```
输入：nums = [0]
输出：[[],[0]]
```

提示：
```
1 <= nums.length <= 10
-10 <= nums[i] <= 10
nums 中的所有元素 互不相同
```
```js
/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsets = function (nums) {
    // 初始值是二维数组
    let res = [
        []
    ]
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        let temp = []
        // 遍历结果集
        for (let j = 0; j < res.length; j++) {
            // 结果集合并数组中的当前值，在塞进临时数组
            temp.push(res[j].concat(nums[i]))
        }
       res= res.concat(temp)
    }
    return res
};
// @lc code=end


```
[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 88. 合并两个有序数组
给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

说明:
```
初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
```
示例:
```
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

1. 必须要更改数组本身，所以只能用splice和sort，而不能用slice和concat等api
2. sort要指定升序

<pre>
/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    nums1.splice(m)
    nums2.splice(n)
    for (let i in nums2) {
        nums1.splice(m + i, 0, nums2[i])
    }
    return nums1.sort((a, b) => {
        return a - b
    })
};
</pre>

<pre>
✔ Accepted
  ✔ 59/59 cases passed (92 ms)
  ✔ Your runtime beats 42.32 % of javascript submissions
  ✔ Your memory usage beats 7.67 % of javascript submissions (35.2 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 118. 杨辉三角
给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

![avatar](./picture/118.png)

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

输入: 5
输出:
```
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

1. 先申明一个最终数组
2. 这肯定是需要二重循环，分别是行和列
3. 每一行的头和尾是1,其余的每个位置上的数是前一行的这个位置减一加上这个位置
   
</pre>
/*
 * @lc app=leetcode.cn id=118 lang=javascript
 *
 * [118] 杨辉三角
 */
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    if (numRows === 0) {
        return []
    }
    let resArr = []
    for (let i = 0; i < numRows; i++) {
        let currRow = []
        for (j = 0; j <= i; j++) {
            if (j === 0 || j === i) {
                currRow.push(1)
            } else {
                currRow.push(resArr[i - 1][j - 1] + resArr[i - 1][j])
            }
        }
        resArr.push(currRow)
    }
    return resArr
};
</pre>

<pre>
✔ Accepted
  ✔ 15/15 cases passed (72 ms)
  ✔ Your runtime beats 84.63 % of javascript submissions
  ✔ Your memory usage beats 23.41 % of javascript submissions (33.8 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 167. 两数之和 II - 输入有序数组
给定一个已按照 升序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。

函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

 
示例 1：

输入：numbers = [2,7,11,15], target = 9
输出：[1,2]
解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
示例 2：

输入：numbers = [2,3,4], target = 6
输出：[1,3]
示例 3：

输入：numbers = [-1,0], target = -1
输出：[1,2]
 

提示：

2 <= numbers.length <= 3 * 104
-1000 <= numbers[i] <= 1000
numbers 按 递增顺序 排列
-1000 <= target <= 1000
仅存在一个有效答案

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    for(let i=0;i<numbers.length;i++){
        for(let j=i+1;j<numbers.length;j++){
            if(target-numbers[i]===numbers[j]){
                return [i+1,j+1]
            }
        }
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 169. 多数元素
给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

 

示例 1：

输入：[3,2,3]
输出：3
示例 2：

输入：[2,2,1,1,1,2,2]
输出：2
 

进阶：

尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    // map对象
    const len = nums.length
    let map = new Map()
    // 遍历存储各个数字出现的次数
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }
    // 遍历map找出数字
    for (let [key, value] of map) {
        if (value > len / 2) {
            return key
        }
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 217. 存在重复元素
给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

 

示例 1:

输入: [1,2,3,1]
输出: true
示例 2:

输入: [1,2,3,4]
输出: false
示例 3:

输入: [1,1,1,3,3,4,3,2,4,2]
输出: true

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
    // 用set去重
    let newSet = new Set(nums)
    // 原来的和现在的数组比较，判断长度是否一致
    if (newSet.size === nums.length) {
        return false
    } else {
        return true
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 219. 存在重复元素 II
给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

 

示例 1:

输入: nums = [1,2,3,1], k = 3
输出: true
示例 2:

输入: nums = [1,0,1,1], k = 1
输出: true
示例 3:

输入: nums = [1,2,3,1,2,3], k = 2
输出: false

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    // 双层遍历
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            // 找到相同的值，判断绝对值至多为k
            if (nums[i] === nums[j] && Math.abs(i - j) <= k) {
                return true
            }
        }
    }
    return false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 228. 汇总区间
给定一个无重复元素的有序整数数组 nums 。

返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。

列表中的每个区间范围 [a,b] 应该按如下格式输出：

"a->b" ，如果 a != b
"a" ，如果 a == b
 

示例 1：

输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]
解释：区间范围是：
[0,2] --> "0->2"
[4,5] --> "4->5"
[7,7] --> "7"
示例 2：

输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]
解释：区间范围是：
[0,0] --> "0"
[2,4] --> "2->4"
[6,6] --> "6"
[8,9] --> "8->9"
示例 3：

输入：nums = []
输出：[]
示例 4：

输入：nums = [-1]
输出：["-1"]
示例 5：

输入：nums = [0]
输出：["0"]
 

提示：

0 <= nums.length <= 20
-231 <= nums[i] <= 231 - 1
nums 中的所有值都 互不相同
nums 按升序排列

```js
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    const len = nums.length
    // 空数组返回
    if (len === 0) {
        return []
    }
    // 长度为1返回
    if (len === 1) {
        return [nums[0].toString()]
    }
    let res = []
    // 双指针
    let left = nums[0]
    let right = nums[0]
    // 遍历数组
    for (let i = 0; i < len; i++) {
        if (nums[i] + 1 === nums[i + 1]) {
            // 最小递增为1
            // 右指针为最大值
            right = nums[i + 1]
        } else if (left === right) {
            //    左右指针相同
            //    塞入最小值
            res.push(left.toString())
            left = nums[i + 1]
            right = nums[i + 1]
        } else {
            // 否则，塞入左右指针
            // 左右指针归位
            res.push([left, '->', right].join(''))
            left = nums[i + 1]
            right = nums[i + 1]
        }
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 229. 求众数 II
给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。

 

示例 1：

输入：[3,2,3]
输出：[3]
示例 2：

输入：nums = [1]
输出：[1]
示例 3：

输入：[1,1,1,3,3,2,2,2]
输出：[1,2]
 

提示：

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var majorityElement = function (nums) {
    let res = []
    // 申请map对象
    let map = new Map()
    // 遍历数组,计算每个数字出现的次数
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }
    // 遍历map,找到符合条件的
    for (let [key, val] of map) {
        if (val > nums.length / 3) {
            res.push(key)
        }
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 238. 除自身以外数组的乘积
给你一个长度为 n 的整数数组 nums，其中 n > 1，返回输出数组 output ，其中 output[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积。

 

示例:

输入: [1,2,3,4]
输出: [24,12,8,6]
 

提示：题目数据保证数组之中任意元素的全部前缀元素和后缀（甚至是整个数组）的乘积都在 32 位整数范围内。

说明: 请不要使用除法，且在 O(n) 时间复杂度内完成此题。

进阶：
你可以在常数空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    let res = []
    // 每个值,除自身之外的乘积
    let pro = 1
    // 双层遍历数组
    for (let i = 0; i < nums.length; i++) {
        pro = 1
        for (let j = 0; j < nums.length; j++) {
            // 排除自身
            if (j !== i) {
                // 取得自身之外的乘积
                pro *= nums[j]
            }
        }
        res.push(pro)
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 268. 丢失的数字
给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

 

进阶：

你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?
 

示例 1：

输入：nums = [3,0,1]
输出：2
解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
示例 2：

输入：nums = [0,1]
输出：2
解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
示例 3：

输入：nums = [9,6,4,2,3,5,7,0,1]
输出：8
解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
示例 4：

输入：nums = [0]
输出：1
解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。
 

提示：

n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
nums 中的所有数字都 独一无二
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    // 排序
    let newNums = nums.sort((a,b)=>a-b)
    // 遍历数组,判断当前下标是否等于当前值
    for (let i = 0; i <= newNums.length; i++) {
        // 不相等,就是答案
        // 判断次数等于长度+1
        if (i !== newNums[i]) {
            return i
        }
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 287. 寻找重复数
给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。

假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。

你设计的解决方案必须不修改数组 nums 且只用常量级 O(1) 的额外空间。

 

示例 1：

输入：nums = [1,3,4,2,2]
输出：2
示例 2：

输入：nums = [3,1,3,4,2]
输出：3
示例 3：

输入：nums = [1,1]
输出：1
示例 4：

输入：nums = [1,1,2]
输出：1
 

提示：

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
 

进阶：

如何证明 nums 中至少存在一个重复的数字?
你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let newNums = new Map()
    // 遍历数组,统计所有数字出现的次数
    for (let i = 0; i < nums.length; i++) {
        if (newNums.has(nums[i])) {
            newNums.set(nums[i], newNums.get(nums[i]) + 1)
        } else {
            newNums.set(nums[i], 1)
        }
    }
    // 找到重复的数字返回
    for (let [key, val] of newNums) {
        if (val >= 2) {
            return key
        }
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 414. 第三大的数
给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。

 

示例 1：

输入：[3, 2, 1]
输出：1
解释：第三大的数是 1 。
示例 2：

输入：[1, 2]
输出：2
解释：第三大的数不存在, 所以返回最大的数 2 。
示例 3：

输入：[2, 2, 3, 1]
输出：1
解释：注意，要求返回第三大的数，是指在所有不同数字中排第三大的数。
此例中存在两个值为 2 的数，它们都排第二。在所有不同数字中排第三大的数为 1 。
 

提示：

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
    let set = new Set(nums)
    let arr = [...set]
    arr.sort((a, b) => a - b)
    if (arr[arr.length - 3] !== undefined) {
        return arr[arr.length - 3]
    } else {
        return arr[arr.length - 1]
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 448. 找到所有数组中消失的数字
给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。

 

示例 1：

输入：nums = [4,3,2,7,8,2,3,1]
输出：[5,6]
示例 2：

输入：nums = [1,1]
输出：[2]
 

提示：

n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
进阶：你能在不使用额外空间且时间复杂度为 O(n) 的情况下解决这个问题吗? 你可以假定返回的数组不算在额外空间内。


```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    let set = new Set(nums)
    let res = []
    for (let i = 1; i <= nums.length; i++) {
        if (!set.has(i)) {
            res.push(i)
        }
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 485. 最大连续 1 的个数
给定一个二进制数组， 计算其中最大连续 1 的个数。

 

示例：

输入：[1,1,0,1,1,1]
输出：3
解释：开头的两位和最后的三位都是连续 1 ，所以最大连续 1 的个数是 3.
 

提示：

输入的数组只包含 0 和 1 。
输入数组的长度是正整数，且不超过 10,000。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
    let max = 0,
        sum = 0
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            sum += 1
        } else {
            max = Math.max(max, sum)
            sum = 0
        }
    }
    max = Math.max(max, sum)
    return max
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 495. 提莫攻击
在《英雄联盟》的世界中，有一个叫 “提莫” 的英雄，他的攻击可以让敌方英雄艾希（编者注：寒冰射手）进入中毒状态。现在，给出提莫对艾希的攻击时间序列和提莫攻击的中毒持续时间，你需要输出艾希的中毒状态总时长。

你可以认为提莫在给定的时间点进行攻击，并立即使艾希处于中毒状态。

 

示例1:

输入: [1,4], 2
输出: 4
原因: 第 1 秒初，提莫开始对艾希进行攻击并使其立即中毒。中毒状态会维持 2 秒钟，直到第 2 秒末结束。
第 4 秒初，提莫再次攻击艾希，使得艾希获得另外 2 秒中毒时间。
所以最终输出 4 秒。
示例2:

输入: [1,2], 2
输出: 3
原因: 第 1 秒初，提莫开始对艾希进行攻击并使其立即中毒。中毒状态会维持 2 秒钟，直到第 2 秒末结束。
但是第 2 秒初，提莫再次攻击了已经处于中毒状态的艾希。
由于中毒状态不可叠加，提莫在第 2 秒初的这次攻击会在第 3 秒末结束。
所以最终输出 3 。
 

提示：

你可以假定时间序列数组的总长度不超过 10000。
你可以假定提莫攻击时间序列中的数字和提莫攻击的中毒持续时间都是非负整数，并且不超过 10,000,000。

```js
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
    let sum = duration
    let min = 0
    for (let i = 1; i < timeSeries.length; i++) {
        min = timeSeries[i] - timeSeries[i - 1]
        if (min >= duration) {
            sum += duration
        } else {
            sum += min
        }
    }
    return sum
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 561. 数组拆分 I
给定长度为 2n 的整数数组 nums ，你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从 1 到 n 的 min(ai, bi) 总和最大。

返回该 最大总和 。

 

示例 1：

输入：nums = [1,4,3,2]
输出：4
解释：所有可能的分法（忽略元素顺序）为：
1. (1, 4), (2, 3) -> min(1, 4) + min(2, 3) = 1 + 2 = 3
2. (1, 3), (2, 4) -> min(1, 3) + min(2, 4) = 1 + 2 = 3
3. (1, 2), (3, 4) -> min(1, 2) + min(3, 4) = 1 + 3 = 4
所以最大总和为 4
示例 2：

输入：nums = [6,2,6,5,1,2]
输出：9
解释：最优的分法为 (2, 1), (2, 5), (6, 6). min(2, 1) + min(2, 5) + min(6, 6) = 1 + 2 + 6 = 9
 

提示：

1 <= n <= 104
nums.length == 2 * n
-104 <= nums[i] <= 104

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var arrayPairSum = function (nums) {
    // 排序，然后将下标为 0、2、4 ... 个数相加即可。
    let sum = 0
    nums.sort((a, b) => a - b)
    for (let i = 0; i < nums.length; i += 2) {
        sum += nums[i]
    }
    return sum
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 581. 最短无序连续子数组
给你一个整数数组 nums ，你需要找出一个 连续子数组 ，如果对这个子数组进行升序排序，那么整个数组都会变为升序排序。

请你找出符合题意的 最短 子数组，并输出它的长度。

 

示例 1：

输入：nums = [2,6,4,8,10,9,15]
输出：5
解释：你只需要对 [6, 4, 8, 10, 9] 进行升序排序，那么整个表都会变为升序排序。
示例 2：

输入：nums = [1,2,3,4]
输出：0
示例 3：

输入：nums = [1]
输出：0
 

提示：

1 <= nums.length <= 104
-105 <= nums[i] <= 105

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function (nums) {
    let newNums = nums.slice(0)
    nums.sort((a, b) => a - b)
    let left = 0
    let right = 0
    for (let i = 0; i < newNums.length; i++) {
        if (nums[i] !== newNums[i]) {
            left = i
            break
        }
    }
    for (let j = newNums.length; j > 0; j--) {
        if (nums[j] !== newNums[j]) {
            right = j
            break
        }
    }
    if (left || right) {
        return right - left + 1
    } else {
        return 0
    }
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 628. 三个数的最大乘积
给你一个整型数组 nums ，在数组中找出由三个数组成的最大乘积，并输出这个乘积。

 

示例 1：

输入：nums = [1,2,3]
输出：6
示例 2：

输入：nums = [1,2,3,4]
输出：24
示例 3：

输入：nums = [-1,-2,-3]
输出：-6
 

提示：

3 <= nums.length <= 104
-1000 <= nums[i] <= 1000
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
    nums.sort((a, b) => b - a)
    let product = 1
    let len = nums.length
    // 。因为负数必须要成双使用才会得正，所以要用最后两位相乘再乘以第1位得到的结果，与前三位相乘得到的结果对比。更大的值返回。
    for (let i = 0; i < len; i++) {
        if (i < 3) {
            product *= nums[i]
        }
    }
    if (len > 3) {
        product = Math.max(product, nums[len - 1] * nums[len - 2] * nums[0])
    }
    return product
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 643. 子数组最大平均数 I
给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。

 

示例：

输入：[1,12,-5,-6,50,3], k = 4
输出：12.75
解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 

提示：

1 <= k <= n <= 30,000。
所给数据范围 [-10,000，10,000]。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
    let sum = 0
    // 首部基础综合
    for (let i = 0; i < nums.length; i++) {
        if (i < k) {
            sum += nums[i]
        }
    }
    let result = sum
    // 往后移，取最大
    for (let i = k; i < nums.length; i++) {
        // 加尾去头
        sum += nums[i] - nums[i - k]
        result = Math.max(result, sum)
    }
    return result / k
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 724. 寻找数组的中心下标
给你一个整数数组 nums ，请计算数组的 中心下标 。

数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

 

示例 1：

输入：nums = [1, 7, 3, 6, 5, 6]
输出：3
解释：
中心下标是 3 。
左侧数之和 sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11 ，
右侧数之和 sum = nums[4] + nums[5] = 5 + 6 = 11 ，二者相等。
示例 2：

输入：nums = [1, 2, 3]
输出：-1
解释：
数组中不存在满足此条件的中心下标。
示例 3：

输入：nums = [2, 1, -1]
输出：0
解释：
中心下标是 0 。
左侧数之和 sum = 0 ，（下标 0 左侧不存在元素），
右侧数之和 sum = nums[1] + nums[2] = 1 + -1 = 0 。
 

提示：

1 <= nums.length <= 104
-1000 <= nums[i] <= 1000

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    // 求和
    let total = nums.reduce((pre, cur) => pre + cur)
    let sum = 0
    // 左边的两倍加上当前值就是总和
    for (let i = 0; i < nums.length; i++) {
        if (2 * sum + nums[i] === total) {
            return i
        }
        sum += nums[i]
    }
    // 如果数组不存在中心下标，返回 -1 
    return -1
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 747. 至少是其他数字两倍的最大数
给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。

请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。如果是，则返回 最大元素的下标 ，否则返回 -1 。

 

示例 1：

输入：nums = [3,6,1,0]
输出：1
解释：6 是最大的整数，对于数组中的其他整数，6 大于数组中其他元素的两倍。6 的下标是 1 ，所以返回 1 。
示例 2：

输入：nums = [1,2,3,4]
输出：-1
解释：4 没有超过 3 的两倍大，所以返回 -1 。
示例 3：

输入：nums = [1]
输出：0
解释：因为不存在其他数字，所以认为现有数字 1 至少是其他数字的两倍。
 

提示：

1 <= nums.length <= 50
0 <= nums[i] <= 100
nums 中的最大元素是唯一的

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
    if (nums.length === 1) {
        return 0
    }
    // 找出最大值
    let max = Math.max(...nums)
    // 找出最大值的下标
    let index = nums.findIndex(a => a === max)
    // 过滤出数组中两倍大于最大值的数字
    let num = nums.filter((n, i) => {
        if (i !== index && n * 2 > max) {
            return n
        }
    })
    return num.length === 0 ? index : -1
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 852. 山脉数组的峰顶索引   
符合下列属性的数组 arr 称为 山脉数组 ：
arr.length >= 3
存在 i（0 < i < arr.length - 1）使得：
arr[0] < arr[1] < ... arr[i-1] < arr[i]
arr[i] > arr[i+1] > ... > arr[arr.length - 1]
给你由整数组成的山脉数组 arr ，返回任何满足 arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1] 的下标 i 。

 

示例 1：

输入：arr = [0,1,0]
输出：1
示例 2：

输入：arr = [0,2,1,0]
输出：1
示例 3：

输入：arr = [0,10,5,2]
输出：1
示例 4：

输入：arr = [3,4,5,1]
输出：2
示例 5：

输入：arr = [24,69,100,99,79,78,67,36,26,19]
输出：2
 

提示：

3 <= arr.length <= 104
0 <= arr[i] <= 106
题目数据保证 arr 是一个山脉数组
 

进阶：很容易想到时间复杂度 O(n) 的解决方案，你可以设计一个 O(log(n)) 的解决方案吗？

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function (arr) {
    let max = Math.max(...arr)
    let index = arr.findIndex(a => a === max)
    return index
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 905. 按奇偶排序数组 
给定一个非负整数数组 A，返回一个数组，在该数组中， A 的所有偶数元素之后跟着所有奇数元素。

你可以返回满足此条件的任何数组作为答案。

 

示例：

输入：[3,1,2,4]
输出：[2,4,3,1]
输出 [4,2,3,1]，[2,4,1,3] 和 [4,2,1,3] 也会被接受。
 

提示：

1 <= A.length <= 5000
0 <= A[i] <= 5000

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
    let even = []
    let odd = []
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            even.push(nums[i])
        } else {
            odd.push(nums[i])
        }
    }
    return even.concat(odd)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 941. 有效的山脉数组
给定一个整数数组 arr，如果它是有效的山脉数组就返回 true，否则返回 false。

让我们回顾一下，如果 A 满足下述条件，那么它是一个山脉数组：

arr.length >= 3
在 0 < i < arr.length - 1 条件下，存在 i 使得：
arr[0] < arr[1] < ... arr[i-1] < arr[i]
arr[i] > arr[i+1] > ... > arr[arr.length - 1]
 

![avatar](./../picture/941.png)

 

示例 1：

输入：arr = [2,1]
输出：false
示例 2：

输入：arr = [3,5,5]
输出：false
示例 3：

输入：arr = [0,3,2,1]
输出：true
 

提示：

1 <= arr.length <= 104
0 <= arr[i] <= 104

```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
    let len = arr.length
    let left = 0
    let right = len - 1
    while (arr[left] < arr[left + 1]) {
        left++
    }
    while (arr[right] < arr[right - 1]) {
        right--
    }
    return left && right && left === right && right !== len - 1 ? true : false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 977. 有序数组的平方
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

 

示例 1：

输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
示例 2：

输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
 

提示：

1 <= nums.length <= 104
-104 <= nums[i] <= 104
nums 已按 非递减顺序 排序
 

进阶：

请你设计时间复杂度为 O(n) 的算法解决本问题

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
    let newNums = []
    nums.forEach(item => {
        newNums.push(item * item)
    })
    return newNums.sort((a, b) => a - b)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1287. 有序数组中出现次数超过25%的元素
给你一个非递减的 有序 整数数组，已知这个数组中恰好有一个整数，它的出现次数超过数组元素总数的 25%。

请你找到并返回这个整数

 

示例：

输入：arr = [1,2,2,6,6,6,6,7,10]
输出：6
 

提示：

1 <= arr.length <= 10^4
0 <= arr[i] <= 10^5

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
    let map = new Map()
    // 统计每个数字出现的次数
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1)
        } else {
            map.set(arr[i], 1)
        }
    }
    let max = 0
    let number = arr[0]
    // 找到出现最多的数字
    for ([key, val] of map) {
        max = Math.max(max, val)
    }
    for ([key, val] of map) {
        if (val === max) {
            number = key
        }
    }
    return number
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1346. 检查整数及其两倍数是否存在
给你一个整数数组 arr，请你检查是否存在两个整数 N 和 M，满足 N 是 M 的两倍（即，N = 2 * M）。

更正式地，检查是否存在两个下标 i 和 j 满足：

i != j
0 <= i, j < arr.length
arr[i] == 2 * arr[j]
 

示例 1：

输入：arr = [10,2,5,3]
输出：true
解释：N = 10 是 M = 5 的两倍，即 10 = 2 * 5 。
示例 2：

输入：arr = [7,1,14,11]
输出：true
解释：N = 14 是 M = 7 的两倍，即 14 = 2 * 7 。
示例 3：

输入：arr = [3,1,7,11]
输出：false
解释：在该情况下不存在 N 和 M 满足 N = 2 * M 。
 

提示：

2 <= arr.length <= 500
-10^3 <= arr[i] <= 10^3

```js
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] * 2 === arr[j]) {
                return true
            }
        }
    }
    return false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1385. 两个数组间的距离值
给你两个整数数组 arr1 ， arr2 和一个整数 d ，请你返回两个数组之间的 距离值 。

「距离值」 定义为符合此距离要求的元素数目：对于元素 arr1[i] ，不存在任何元素 arr2[j] 满足 |arr1[i]-arr2[j]| <= d 。

 

示例 1：

输入：arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
输出：2
解释：
对于 arr1[0]=4 我们有：
|4-10|=6 > d=2 
|4-9|=5 > d=2 
|4-1|=3 > d=2 
|4-8|=4 > d=2 
所以 arr1[0]=4 符合距离要求

对于 arr1[1]=5 我们有：
|5-10|=5 > d=2 
|5-9|=4 > d=2 
|5-1|=4 > d=2 
|5-8|=3 > d=2
所以 arr1[1]=5 也符合距离要求

对于 arr1[2]=8 我们有：
|8-10|=2 <= d=2
|8-9|=1 <= d=2
|8-1|=7 > d=2
|8-8|=0 <= d=2
存在距离小于等于 2 的情况，不符合距离要求 

故而只有 arr1[0]=4 和 arr1[1]=5 两个符合距离要求，距离值为 2
示例 2：

输入：arr1 = [1,4,2,3], arr2 = [-4,-3,6,10,20,30], d = 3
输出：2
示例 3：

输入：arr1 = [2,1,100,3], arr2 = [-5,-2,10,-3,7], d = 6
输出：1
 

提示：

1 <= arr1.length, arr2.length <= 500
-10^3 <= arr1[i], arr2[j] <= 10^3
0 <= d <= 100

```js
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function (arr1, arr2, d) {
    let res = []
    // 遍历数组
    for (let i = 0; i < arr1.length; i++) {
        // 申请标志位
        let tag = true
        // 不存在任何元素 arr2[j] 满足 |arr1[i]-arr2[j]| <= d 
        for (let j = 0; j < arr2.length; j++) {
            if (Math.abs(arr1[i] - arr2[j]) <= d) {
                tag = false
            }
        }
        // 满足条件塞入结果集
        if (tag) {
            res.push(arr1[i])
        }
    }
    return res.length
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1394. 找出数组中的幸运数
在整数数组中，如果一个整数的出现频次和它的数值大小相等，我们就称这个整数为「幸运数」。

给你一个整数数组 arr，请你从中找出并返回一个幸运数。

如果数组中存在多个幸运数，只需返回 最大 的那个。
如果数组中不含幸运数，则返回 -1 。
 

示例 1：

输入：arr = [2,2,3,4]
输出：2
解释：数组中唯一的幸运数是 2 ，因为数值 2 的出现频次也是 2 。
示例 2：

输入：arr = [1,2,2,3,3,3]
输出：3
解释：1、2 以及 3 都是幸运数，只需要返回其中最大的 3 。
示例 3：

输入：arr = [2,2,2,3,3]
输出：-1
解释：数组中不存在幸运数。
示例 4：

输入：arr = [5]
输出：-1
示例 5：

输入：arr = [7,7,7,7,7,7,7]
输出：7
 

提示：

1 <= arr.length <= 500
1 <= arr[i] <= 500

```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
    if (arr.length === 1) return -1
    // 统计数字个数
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1)
        } else {
            map.set(arr[i], 1)
        }
    }
    let temp = []
    // 找出数值等于个数的数
    for ([key, val] of map) {
        if (key === val) {
            temp.push(key)
        }
    }

    return temp.length > 0 ? Math.max(...temp) : -1
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1408. 数组中的字符串匹配
给你一个字符串数组 words ，数组中的每个字符串都可以看作是一个单词。请你按 任意 顺序返回 words 中是其他单词的子字符串的所有单词。

如果你可以删除 words[j] 最左侧和/或最右侧的若干字符得到 word[i] ，那么字符串 words[i] 就是 words[j] 的一个子字符串。

 

示例 1：

输入：words = ["mass","as","hero","superhero"]
输出：["as","hero"]
解释："as" 是 "mass" 的子字符串，"hero" 是 "superhero" 的子字符串。
["hero","as"] 也是有效的答案。
示例 2：

输入：words = ["leetcode","et","code"]
输出：["et","code"]
解释："et" 和 "code" 都是 "leetcode" 的子字符串。
示例 3：

输入：words = ["blue","green","bu"]
输出：[]
 

提示：

1 <= words.length <= 100
1 <= words[i].length <= 30
words[i] 仅包含小写英文字母。
题目数据 保证 每个 words[i] 都是独一无二的。

```js
/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
    let res = []
    for (let w = 0; w < words.length; w++) {
        for (let j = 0; j < words.length; j++) {
            if (w !== j && words[w].indexOf(words[j]) > -1) {
                res.push(words[j])
            }
        }
    }
    // 去重
    return [...(new Set(res))]
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1460. 通过翻转子数组使两个数组相等
给你两个长度相同的整数数组 target 和 arr 。

每一步中，你可以选择 arr 的任意 非空子数组 并将它翻转。你可以执行此过程任意次。

如果你能让 arr 变得与 target 相同，返回 True；否则，返回 False 。

 

示例 1：

输入：target = [1,2,3,4], arr = [2,4,1,3]
输出：true
解释：你可以按照如下步骤使 arr 变成 target：
1- 翻转子数组 [2,4,1] ，arr 变成 [1,4,2,3]
2- 翻转子数组 [4,2] ，arr 变成 [1,2,4,3]
3- 翻转子数组 [4,3] ，arr 变成 [1,2,3,4]
上述方法并不是唯一的，还存在多种将 arr 变成 target 的方法。
示例 2：

输入：target = [7], arr = [7]
输出：true
解释：arr 不需要做任何翻转已经与 target 相等。
示例 3：

输入：target = [1,12], arr = [12,1]
输出：true
示例 4：

输入：target = [3,7,9], arr = [3,7,11]
输出：false
解释：arr 没有数字 9 ，所以无论如何也无法变成 target 。
示例 5：

输入：target = [1,1,1,1,1], arr = [1,1,1,1,1]
输出：true
 

提示：

target.length == arr.length
1 <= target.length <= 1000
1 <= target[i] <= 1000
1 <= arr[i] <= 1000

```js
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
    target.sort((a, b) => a - b)
    arr.sort((a, b) => a - b)
    let tag = true
    for (let i = 0; i < target.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i === j && target[i] !== arr[j]) {
                tag = false
            }
        }
    }
    return tag ? true : false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1464. 数组中两元素的最大乘积
给你一个整数数组 nums，请你选择数组的两个不同下标 i 和 j，使 (nums[i]-1)*(nums[j]-1) 取得最大值。

请你计算并返回该式的最大值。

 

示例 1：

输入：nums = [3,4,5,2]
输出：12 
解释：如果选择下标 i=1 和 j=2（下标从 0 开始），则可以获得最大值，(nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12 。 
示例 2：

输入：nums = [1,5,4,5]
输出：16
解释：选择下标 i=1 和 j=3（下标从 0 开始），则可以获得最大值 (5-1)*(5-1) = 16 。
示例 3：

输入：nums = [3,7]
输出：12
 

提示：

2 <= nums.length <= 500
1 <= nums[i] <= 10^3


```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    nums.sort((a, b) => b - a)
    return (nums[0] - 1) * (nums[1] - 1)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1470. 重新排列数组
给你一个数组 nums ，数组中有 2n 个元素，按 [x1,x2,...,xn,y1,y2,...,yn] 的格式排列。

请你将数组按 [x1,y1,x2,y2,...,xn,yn] 格式重新排列，返回重排后的数组。

 

示例 1：

输入：nums = [2,5,1,3,4,7], n = 3
输出：[2,3,5,4,1,7] 
解释：由于 x1=2, x2=5, x3=1, y1=3, y2=4, y3=7 ，所以答案为 [2,3,5,4,1,7]
示例 2：

输入：nums = [1,2,3,4,4,3,2,1], n = 4
输出：[1,4,2,3,3,2,4,1]
示例 3：

输入：nums = [1,1,2,2], n = 2
输出：[1,2,1,2]
 

提示：

1 <= n <= 500
nums.length == 2n
1 <= nums[i] <= 10^3

```js
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
    let a1 = []
    let a2 = []
    let res = []
    for (let i = 0; i < nums.length; i++) {
        if (i < n) {
            a1.push(nums[i])
        } else {
            a2.push(nums[i])
        }
    }
    for (let i = 0; i < n; i++) {
        res = res.concat(a1[i]).concat(a2[i])
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1480. 一维数组的动态和
给你一个数组 nums 。数组「动态和」的计算公式为：runningSum[i] = sum(nums[0]…nums[i]) 。

请返回 nums 的动态和。

 

示例 1：

输入：nums = [1,2,3,4]
输出：[1,3,6,10]
解释：动态和计算过程为 [1, 1+2, 1+2+3, 1+2+3+4] 。
示例 2：

输入：nums = [1,1,1,1,1]
输出：[1,2,3,4,5]
解释：动态和计算过程为 [1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1] 。
示例 3：

输入：nums = [3,1,2,10,1]
输出：[3,4,6,16,17]
 

提示：

1 <= nums.length <= 1000
-10^6 <= nums[i] <= 10^6

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
// map 该方法创建一个新数组，是该数组中每个元素调用依次提供的函数后的返回值。
// 该方法不改变原数组，该方法有返回值
// forEach 该方法没有返回值，其余可以说和map相似
var runningSum = function (nums) {
    let res = nums.map((n, index) => {
        let sum = n
        for (let i = 0; i < index; i++) {
            sum += nums[i]
        }
        return sum
    })
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1491. 去掉最低工资和最高工资后的工资平均值
给你一个整数数组 salary ，数组里每个数都是 唯一 的，其中 salary[i] 是第 i 个员工的工资。

请你返回去掉最低工资和最高工资以后，剩下员工工资的平均值。

 

示例 1：

输入：salary = [4000,3000,1000,2000]
输出：2500.00000
解释：最低工资和最高工资分别是 1000 和 4000 。
去掉最低工资和最高工资以后的平均工资是 (2000+3000)/2= 2500
示例 2：

输入：salary = [1000,2000,3000]
输出：2000.00000
解释：最低工资和最高工资分别是 1000 和 3000 。
去掉最低工资和最高工资以后的平均工资是 (2000)/1= 2000
示例 3：

输入：salary = [6000,5000,4000,3000,2000,1000]
输出：3500.00000
示例 4：

输入：salary = [8000,9000,2000,3000,6000,1000]
输出：4750.00000
 

提示：

3 <= salary.length <= 100
10^3 <= salary[i] <= 10^6
salary[i] 是唯一的。
与真实值误差在 10^-5 以内的结果都将视为正确答案。

```js
/**
 * @param {number[]} salary
 * @return {number}
 */
 var average = function (salary) {
    let max = Math.max(...salary)
    let min = Math.min(...salary)
    let maxIndex = salary.findIndex(a => a === max)
    salary.splice(maxIndex, 1)
    let minIndex = salary.findIndex(a => a === min)
    salary.splice(minIndex, 1)
    return salary.reduce((a, b) => a + b) / salary.length
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1662. 检查两个字符串数组是否相等
给你两个字符串数组 word1 和 word2 。如果两个数组表示的字符串相同，返回 true ；否则，返回 false 。

数组表示的字符串 是由数组中的所有元素 按顺序 连接形成的字符串。

 

示例 1：

输入：word1 = ["ab", "c"], word2 = ["a", "bc"]
输出：true
解释：
word1 表示的字符串为 "ab" + "c" -> "abc"
word2 表示的字符串为 "a" + "bc" -> "abc"
两个字符串相同，返回 true
示例 2：

输入：word1 = ["a", "cb"], word2 = ["ab", "c"]
输出：false
示例 3：

输入：word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
输出：true
 

提示：

1 <= word1.length, word2.length <= 103
1 <= word1[i].length, word2[i].length <= 103
1 <= sum(word1[i].length), sum(word2[i].length) <= 103
word1[i] 和 word2[i] 由小写字母组成

```js
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
 var arrayStringsAreEqual = function (word1, word2) {
    let str1 = word1.join('')
    let str2 = word2.join('')
    return str1 === str2 ? true : false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1822. 数组元素积的符号
已知函数 signFunc(x) 将会根据 x 的正负返回特定值：

如果 x 是正数，返回 1 。
如果 x 是负数，返回 -1 。
如果 x 是等于 0 ，返回 0 。
给你一个整数数组 nums 。令 product 为数组 nums 中所有元素值的乘积。

返回 signFunc(product) 。

 

示例 1：

输入：nums = [-1,-2,-3,-4,3,2,1]
输出：1
解释：数组中所有值的乘积是 144 ，且 signFunc(144) = 1
示例 2：

输入：nums = [1,5,0,2,-3]
输出：0
解释：数组中所有值的乘积是 0 ，且 signFunc(0) = 0
示例 3：

输入：nums = [-1,1,-1,1,-1]
输出：-1
解释：数组中所有值的乘积是 -1 ，且 signFunc(-1) = -1
 

提示：

1 <= nums.length <= 1000
-100 <= nums[i] <= 100

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
 var arraySign = function (nums) {
    let product = nums.reduce((a, b) => a * b)
    return product > 0 ? 1 : (product < 0 ? -1 : 0)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1929. 数组串联
给你一个长度为 n 的整数数组 nums 。请你构建一个长度为 2n 的答案数组 ans ，数组下标 从 0 开始计数 ，对于所有 0 <= i < n 的 i ，满足下述所有要求：

ans[i] == nums[i]
ans[i + n] == nums[i]
具体而言，ans 由两个 nums 数组 串联 形成。

返回数组 ans 。

 

示例 1：

输入：nums = [1,2,1]
输出：[1,2,1,1,2,1]
解释：数组 ans 按下述方式形成：
- ans = [nums[0],nums[1],nums[2],nums[0],nums[1],nums[2]]
- ans = [1,2,1,1,2,1]
示例 2：

输入：nums = [1,3,2,1]
输出：[1,3,2,1,1,3,2,1]
解释：数组 ans 按下述方式形成：
- ans = [nums[0],nums[1],nums[2],nums[3],nums[0],nums[1],nums[2],nums[3]]
- ans = [1,3,2,1,1,3,2,1]
 

提示：

n == nums.length
1 <= n <= 1000
1 <= nums[i] <= 1000

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
 var getConcatenation = function (nums) {
    return nums.concat(nums)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

### 栈
栈（stack）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。
### 队列
队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。
### 哈希表
散列表（Hash table，也叫哈希表），是根据关键码值(Key value)而直接进行访问的数据结构。也就是说，它通过把关键码值映射到表中一个位置来访问记录，以加快查找的速度。这个映射函数叫做散列函数，存放记录的数组叫做散列表。
给定表M，存在函数f(key)，对任意给定的关键字值key，代入函数后若能得到包含该关键字的记录在表中的地址，则称表M为哈希(Hash）表，函数f(key)为哈希(Hash) 函数。
##### 3. 无重复字符的最长子串
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 36. 有效的数独
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

从简单入手，每行和每列判断是颠倒下i和j就行了。最难的是九宫格判断，前提时i和j是以3，6，9分割。

举个例子：当i=0；j=4时，此时的board取得是'6'，而不是'.'或者'8',`Math.floor(i/3)*3+Math.floor(j/3)`就是`Math.floor(0/3)*3+Math.floor(4/3)`等于'1',`(i%3)*3+j%3`就是`(0%3)*3+4%3`等于0，那么取得就是board[1][0],就是'6'

```
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
```

<pre> 
√ Accepted
  √ 504/504 cases passed (148 ms)
  √ Your runtime beats 29.53 % of javascript submissions
  √ Your memory usage beats 96.77 % of javascript submissions (37.2 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 堆
堆(Heap)是计算机科学中一类特殊的数据结构的统称。堆通常是一个可以被看做一棵完全二叉树的数组对象。
### 字符串
字符串主要用于编程，概念说明、函数解释、用法详述见正文，这里补充一点：字符串在存储上类似字符数组，所以它每一位的单个元素都是可以提取的，如s=“abcdefghij”，则s[1]=“b”，s[9]="j"，而字符串的零位正是它的长度，如s[0]=10（※上述功能Ansistring没有。），这可以给我们提供很多方便，如高精度运算时每一位都可以转化为数字存入数组。
##### 5. 最长回文子串
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 6. Z 字形变换
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
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 8. 字符串转换整数 (atoi)
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 10.  正则表达式匹配
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 14.  最长公共前缀
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
1.  最后一个单词的长度
给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

示例:
```
输入: "Hello World"
输出: 5
```
关键就是切分字符串

1. 判断字符串是否为空，空的就为0
2. 分割字符串
3. 过滤字符串数组，空的丢弃
4. 取字符串最后一个单词，如果index小于0，返回0，否则返回最后一个字符串长度。因为" "，中间有空格的是还没去掉。

```
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
```
<pre>
√ Accepted
  √ 59/59 cases passed (64 ms)
  √ Your runtime beats 98.61 % of javascript submissions
  √ Your memory usage beats 21.66 % of javascript submissions (33.8 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 17. 电话号码的字母组合
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
![avatar](./picture/17.png)
示例:

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

说明:
尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 20. 有效的括号
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



[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 22. 括号生成
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


[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 28. 实现strStr()
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 38. 报数
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 50. Pow(x, n)
实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

 

示例 1：

输入：x = 2.00000, n = 10
输出：1024.00000
示例 2：

输入：x = 2.10000, n = 3
输出：9.26100
示例 3：

输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
 

提示：

-100.0 < x < 100.0
-231 <= n <= 231-1
-104 <= xn <= 104

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/powx-n
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
    // n=0直接返回1
    if (n === 0) return 1
    //n<0时 x的n次方等于1除以x的-n次方
    if (n < 0) {
        return 1 / myPow(x, -n)
    }
    //n是奇数时 x的n次方 = x*x的n-1次方
    if (n % 2) {
        return x * myPow(x, n - 1)
    }
    return myPow(x * x, n / 2) //n是偶数，使用分治，一分为二，等于x*x的n/2次方 
}

// 使用二分法

// 1. 问题分析
// 分：将2^n转为 (2^ 2/n) * (2^ 2/n)
// 解：求2^2/n
// 合：(2^ 2/n) * (2^ 2/n)

// 递归
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 151. 翻转字符串里的单词
给你一个字符串 s ，逐个翻转字符串中的所有 单词 。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

请你返回一个翻转 s 中单词顺序并用单个空格相连的字符串。

说明：

输入字符串 s 可以在前面、后面或者单词间包含多余的空格。
翻转后单词间应当仅用一个空格分隔。
翻转后的字符串中不应包含额外的空格。
 

示例 1：

输入：s = "the sky is blue"
输出："blue is sky the"
示例 2：

输入：s = "  hello world  "
输出："world hello"
解释：输入字符串可以在前面或者后面包含多余的空格，但是翻转后的字符不能包括。
示例 3：

输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，将翻转后单词间的空格减少到只含一个。
示例 4：

输入：s = "  Bob    Loves  Alice   "
输出："Alice Loves Bob"
示例 5：

输入：s = "Alice does not even like bob"
输出："bob like even not does Alice"
 

提示：

1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词
 

进阶：

请尝试使用 O(1) 额外空间复杂度的原地解法。
```js
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
    let arr = []
    s.split(' ').map(a => {
        if (a) {
            arr.push(a)
        }
    })
    return arr.reverse().join(' ')
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 168. Excel表列名称
给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。

例如：

A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
 

示例 1：

输入：columnNumber = 1
输出："A"
示例 2：

输入：columnNumber = 28
输出："AB"
示例 3：

输入：columnNumber = 701
输出："ZY"
示例 4：

输入：columnNumber = 2147483647
输出："FXSHRXW"
 

提示：

1 <= columnNumber <= 231 - 1

```js
/**
 * @param {number} columnNumber
 * @return {string}
 */
 var convertToTitle = function (columnNumber) {
    let S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let res = ''
    while (columnNumber > 0) {
        // 余数
        let mod = (columnNumber - 1) % 26
        // 循环取
        columnNumber = Math.floor((columnNumber - 1) / 26)
        res = S[mod] + res
    }
    return res
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 172. 阶乘后的零
给定一个整数 n，返回 n! 结果尾数中零的数量。

示例 1:

输入: 3
输出: 0
解释: 3! = 6, 尾数中没有零。
示例 2:

输入: 5
输出: 1
解释: 5! = 120, 尾数中有 1 个零.
说明: 你算法的时间复杂度应为 O(log n) 。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/factorial-trailing-zeroes
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function (n) {
    let r = 0
    while (n > 1) {
        n = parseInt(n / 5)
        r += n  
    }
    return r
};  
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 204. 计数质数
统计所有小于非负整数 n 的质数的数量。

 

示例 1：

输入：n = 10
输出：4
解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
示例 2：

输入：n = 0
输出：0
示例 3：

输入：n = 1
输出：0
 

提示：

0 <= n <= 5 * 106

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/count-primes
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function (n) {
    let arr = [], count = 0
    for (let i = 0; i < n + 1; i++) {
        arr[i] = true // 标记初始化
    }
    for (let i = 2; i < n; i++) {
        if (arr[i]) { // 如果i是质数
            // 将质数的倍数删除
            for (let j = i + i; j < n; j = j + i) {
                arr[j] = false // i的n倍数肯定不是质数
            }
            count++
        }
    }
    return count
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---


##### 224. 基本计算器
给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。

 

示例 1：

输入：s = "1 + 1"
输出：2
示例 2：

输入：s = " 2-1 + 2 "
输出：3
示例 3：

输入：s = "(1+(4+5+2)-3)+(6+8)"
输出：23
 

提示：

1 <= s.length <= 3 * 105
s 由数字、'+'、'-'、'('、')'、和 ' ' 组成
s 表示一个有效的表达式

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/basic-calculator
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {string} s
 * @return {number}
 */
 var calculate = function (s) {
    return eval(s)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---


##### 231. 2 的幂
给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。

 

示例 1：

输入：n = 1
输出：true
解释：20 = 1
示例 2：

输入：n = 16
输出：true
解释：24 = 16
示例 3：

输入：n = 3
输出：false
示例 4：

输入：n = 4
输出：true
示例 5：

输入：n = 5
输出：false
 

提示：

-231 <= n <= 231 - 1
 

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/power-of-two
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {number} n
 * @return {boolean}
 */
 var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0;
};

// 方法一：二进制表示
// 思路与算法

// 一个数 nn 是 22 的幂，当且仅当 nn 是正整数，并且 nn 的二进制表示中仅包含 11 个 11。

// 因此我们可以考虑使用位运算，将 nn 的二进制表示中最低位的那个 11 提取出来，再判断剩余的数值是否为 00 即可。下面介绍两种常见的与「二进制表示中最低位」相关的位运算技巧。

// 第一个技巧是

// \texttt{n \& (n - 1)}
// n & (n - 1)

// 其中 \texttt{\&}& 表示按位与运算。该位运算技巧可以直接将 nn 二进制表示的最低位 11 移除，它的原理如下：

// 假设 nn 的二进制表示为 (a 10\cdots 0)_2(a10⋯0) 
// 2
// ​
//  ，其中 aa 表示若干个高位，11 表示最低位的那个 11，0\cdots 00⋯0 表示后面的若干个 00，那么 n-1n−1 的二进制表示为：

// (a 01\cdots1)_2
// (a01⋯1) 
// 2
// ​
 

// 我们将 (a 10\cdots 0)_2(a10⋯0) 
// 2
// ​
//   与 (a 01\cdots1)_2(a01⋯1) 
// 2
// ​
//   进行按位与运算，高位 aa 不变，在这之后的所有位都会变为 00，这样我们就将最低位的那个 11 移除了。

// 因此，如果 nn 是正整数并且 \texttt{n \& (n - 1) = 0}n & (n - 1) = 0，那么 nn 就是 22 的幂。

// 第二个技巧是

// \texttt{n \& (-n)}
// n & (-n)

// 其中 -n−n 是 nn 的相反数，是一个负数。该位运算技巧可以直接获取 nn 二进制表示的最低位的 11。

// 由于负数是按照补码规则在计算机中存储的，-n−n 的二进制表示为 nn 的二进制表示的每一位取反再加上 11，因此它的原理如下：

// 假设 nn 的二进制表示为 (a 10\cdots 0)_2(a10⋯0) 
// 2
// ​
//  ，其中 aa 表示若干个高位，11 表示最低位的那个 11，0\cdots 00⋯0 表示后面的若干个 00，那么 -n−n 的二进制表示为：

// (\bar{a} 01\cdots1)_2 + (1)_2 = (\bar{a} 10\cdots0)_2
// ( 
// a
// ˉ
//  01⋯1) 
// 2
// ​
//  +(1) 
// 2
// ​
//  =( 
// a
// ˉ
//  10⋯0) 
// 2
// ​
 

// 其中 \bar{a} 
// a
// ˉ
//   表示将 aa 每一位取反。我们将 (a 10\cdots 0)_2(a10⋯0) 
// 2
// ​
//   与 (\bar{a} 10\cdots0)_2( 
// a
// ˉ
//  10⋯0) 
// 2
// ​
//   进行按位与运算，高位全部变为 00，最低位的 11 以及之后的所有 00 不变，这样我们就获取了 nn 二进制表示的最低位的 11。

// 因此，如果 nn 是正整数并且 \texttt{n \& (-n) = n}n & (-n) = n，那么 nn 就是 22 的幂。

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/power-of-two/solution/2de-mi-by-leetcode-solution-rny3/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 258. 各位相加
给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。

示例:

输入: 38
输出: 2 
解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。
进阶:
你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-digits
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {number} num
 * @return {number}
 */
 var addDigits = function (num) {
    let str = num.toString()
    let sum = 0
    // 终止条件：结果为一位数返回
    if (str.length === 1) {
        return Number(str)
    }
    // 累计和
    for (let i = 0; i < str.length; i++) {
        sum += Number(str[i])
    }
    // 递归
    return addDigits(sum)
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 292. Nim 游戏
你和你的朋友，两个人一起玩 Nim 游戏：

桌子上有一堆石头。
你们轮流进行自己的回合，你作为先手。
每一回合，轮到的人拿掉 1 - 3 块石头。
拿掉最后一块石头的人就是获胜者。
假设你们每一步都是最优解。请编写一个函数，来判断你是否可以在给定石头数量为 n 的情况下赢得游戏。如果可以赢，返回 true；否则，返回 false 。

 

示例 1：

输入：n = 4
输出：false 
解释：如果堆中有 4 块石头，那么你永远不会赢得比赛；
     因为无论你拿走 1 块、2 块 还是 3 块石头，最后一块石头总是会被你的朋友拿走。
示例 2：

输入：n = 1
输出：true
示例 3：

输入：n = 2
输出：true
 

提示：

1 <= n <= 231 - 1

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/nim-game
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
    // 去掉4的倍数
    return n % 4 !== 0
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 344. 反转字符串
编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

 

示例 1：

输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
 var reverseString = function (s) {
    return s.reverse()
 };
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 387. 字符串中的第一个唯一字符
给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

 

示例：

s = "leetcode"
返回 0

s = "loveleetcode"
返回 2
 

提示：你可以假定该字符串只包含小写字母。
```js
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    let arr = s.split('')
    let map = new Map()
    for (let i = 0; i < arr.length; i++) {
        if (map.has(arr[i])) {
            map.set(arr[i], map.get(arr[i]) + 1)
        } else {
            map.set(arr[i], 1)
        }
    }
    let find = []
    for ([key, val] of map) {
        if (val === 1) {
            find.push(key)
        }
    }
    let index = find.length > 0 ? arr.length : -1
    if(index!==-1){
        for (let j = 0; j < find.length; j++) {
            index = Math.min(index, arr.findIndex(a => a === find[j]))
        }
    }
    return index
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---


##### 434. 字符串中的单词数
统计字符串中的单词个数，这里的单词指的是连续的不是空格的字符。

请注意，你可以假定字符串里不包括任何不可打印的字符。

示例:

输入: "Hello, my name is John"
输出: 5
解释: 这里的单词是指连续的不是空格的字符，所以 "Hello," 算作 1 个单词。

```js
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
    let arr = s.split(' ')
    arr = arr.filter(a => a)
    return arr.length
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 459. 重复的子字符串
给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。

示例 1:

输入: "abab"

输出: True

解释: 可由子字符串 "ab" 重复两次构成。
示例 2:

输入: "aba"

输出: False
示例 3:

输入: "abcabcabcabc"

输出: True

解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)

```js
/**
 * @param {string} s
 * @return {boolean}
 */
 var repeatedSubstringPattern = function (s) {
    let str = s + s
    let res = str.slice(1, -1)
    let index = res.indexOf(s)
    return index>=0
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 520. 检测大写字母
给定一个单词，你需要判断单词的大写使用是否正确。

我们定义，在以下情况时，单词的大写用法是正确的：

全部字母都是大写，比如"USA"。
单词中所有字母都不是大写，比如"leetcode"。
如果单词不只含有一个字母，只有首字母大写， 比如 "Google"。
否则，我们定义这个单词没有正确使用大写字母。

示例 1:

输入: "USA"
输出: True
示例 2:

输入: "FlaG"
输出: False
注意: 输入是由大写和小写拉丁字母组成的非空单词。

```js
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
    let arr = word.split('')
    let res = arr.filter(a => {
        if (a.toLocaleUpperCase() === a) {
            return a
        }
    })
    // 单词中所有字母都不是大写
    // 首字母大写
    // 全部字母都是大写
    return res.length === 0 || res.length === 1 && word[0].toLocaleUpperCase() === word[0] || word.length === res.length ? true : false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 557. 反转字符串中的单词 III
给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

 

示例：

输入："Let's take LeetCode contest"
输出："s'teL ekat edoCteeL tsetnoc"
 

提示：

在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。

```js
/**
 * @param {string} s
 * @return {string}
 */
 var reverseWords = function (s) {
    let arr = s.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('').reverse().join('')
    }
    return arr.join(' ')
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 657. 机器人能否返回原点
在二维平面上，有一个机器人从原点 (0, 0) 开始。给出它的移动顺序，判断这个机器人在完成移动后是否在 (0, 0) 处结束。

移动顺序由字符串表示。字符 move[i] 表示其第 i 次移动。机器人的有效动作有 R（右），L（左），U（上）和 D（下）。如果机器人在完成所有动作后返回原点，则返回 true。否则，返回 false。

注意：机器人“面朝”的方向无关紧要。 “R” 将始终使机器人向右移动一次，“L” 将始终向左移动等。此外，假设每次移动机器人的移动幅度相同。

 

示例 1:

输入: "UD"
输出: true
解释：机器人向上移动一次，然后向下移动一次。所有动作都具有相同的幅度，因此它最终回到它开始的原点。因此，我们返回 true。
示例 2:

输入: "LL"
输出: false
解释：机器人向左移动两次。它最终位于原点的左侧，距原点有两次 “移动” 的距离。我们返回 false，因为它在移动结束时没有返回原点。

```js
/**
 * @param {string} moves
 * @return {boolean}
 */
 var judgeCircle = function (moves) {
    let obj = {
        R: 1,
        L: -1,
        U: 20,
        D: -20
    }
    let arr = moves.split('')
    let res = 0
    for (let i = 0; i < arr.length; i++) {
        res += obj[arr[i]]
    }
    return res === 0 ? true : false
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 917. 仅仅反转字母
给定一个字符串 S，返回 “反转后的” 字符串，其中不是字母的字符都保留在原地，而所有字母的位置发生反转。

 

示例 1：

输入："ab-cd"
输出："dc-ba"
示例 2：

输入："a-bC-dEf-ghIj"
输出："j-Ih-gfE-dCba"
示例 3：

输入："Test1ng-Leet=code-Q!"
输出："Qedo1ct-eeLg=ntse-T!"
 

提示：

S.length <= 100
33 <= S[i].ASCIIcode <= 122 
S 中不包含 \ or "

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/reverse-only-letters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
```js
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
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---

##### 1047. 删除字符串中的所有相邻重复项
给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。

在 S 上反复执行重复项删除操作，直到无法继续删除。

在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。

 

示例：

输入："abbaca"
输出："ca"
解释：
例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
 

提示：

1 <= S.length <= 20000
S 仅由小写英文字母组成。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/remove-all-adjacent-duplicates-in-string
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

```js
/**
 * @param {string} s
 * @return {string}
 */
 var removeDuplicates = function (s) {
    let arr = s.split('')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
            arr.splice(i, 1)
            arr.splice(i, 1)
        }
    }
    for (let i = arr.length; i >= 0; i--) {
        if (arr[i] === arr[i - 1]) {
            arr.splice(i, 1)
            arr.splice(i - 1, 1)
        }
    }
    return arr.join('')
};
```

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 全排列
从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列。
公式：全排列数f(n)=n!(定义0!=1)
##### 46. 全排列
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
```js
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
```
<pre>
✔ Accepted
  ✔ 25/25 cases passed (96 ms)
  ✔ Your runtime beats 90.73 % of javascript submissions
  ✔ Your memory usage beats 24.34 % of javascript submissions (37.3 MB)
</pre> 

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 二进制索引树
树状数组是一个优美小巧的数据结构，在很多时候可以代替线段树。一句话概括就是，凡是树状数组可以解决的问题，线段树都可以解决，反过来线段树可以解决的问题，树状数组不一定能解决。

树状数组英文名称为Binary Index Tree，直译过来就是二进制索引树，我觉得二进制索引树更能说明其本质。树状数组的本质就是一种通过二进制位来维护一个序列前i和的数据结构。

对于维护的序列A，定义C[i]=A[j+1]+...+A[i]，其中j为i的二进制表示中把最右边的1换成0的值。j的值可以通过lowbit求出，即i-lowbit(i)。

lowbit(a)为2^(a的二进制表示末尾0的个数)。
### 几何
几何，就是研究空间结构及性质的一门学科。它是数学中最基本的研究内容之一，与分析、代数等等具有同样重要的地位，并且关系极为密切。几何学发展历史悠长，内容丰富。它和代数、分析、数论等等关系极其密切。几何思想是数学中最重要的一类思想。暂时的数学各分支发展都有几何化趋向，即用几何观点及思想方法去探讨各数学理论。常见定理有勾股定理，欧拉定理，斯图尔特定理等。
### 图表
### 数学
##### 7. 整数反转
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
   
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 9. 回文数
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
  
[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 12. 整数转罗马数字
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 13. 罗马数字转整数
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 29. 两数相除
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 67. 二进制求和
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

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
##### 69. x 的平方根
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
耗时太长,千万不要这要弄
```js
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
```

采用二分法才是王道
1.  定义两个边界left和right,right就是x的一半加一,结果值为mid
2.  左边小于右边一直循环
3.  mid等于left和right的一半
4.  如果mid的平方大于x,那么right等于mid减一
5.  如果小于x,那么left加一
6.  否则,结果就是mid值
7.  如果循环结束没有匹配到,那结果就是right值

```js
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
```

<pre>
✔ Accepted
  ✔ 1017/1017 cases passed (240 ms)
  ✔ Your runtime beats 5.25 % of javascript submissions
  ✔ Your memory usage beats 32.03 % of javascript submissions (35.7 MB)
</pre>

[[↑] 回到顶部](#awsome-knowledge-back-end)

---
### 线段树
线段树是一种二叉搜索树，与区间树相似，它将一个区间划分成一些单元区间，每个单元区间对应线段树中的一个叶结点。
使用线段树可以快速的查找某一个节点在若干条线段中出现的次数，时间复杂度为O(logN)。而未优化的空间复杂度为2N，实际应用时一般还要开4N的数组以免越界，因此有时需要离散化让空间压缩。
### 前缀树
又称单词查找树，Trie树，是一种树形结构，是一种哈希树的变种。典型应用是用于统计，排序和保存大量的字符串（但不仅限于字符串），所以经常被搜索引擎系统用于文本词频统计。它的优点是：利用字符串的公共前缀来减少查询时间，最大限度地减少无谓的字符串比较，查询效率比哈希树高。

### 搜索
#### 109. 岛屿数量
描述
给一个01矩阵，1代表是陆地，0代表海洋， 如果两个1相邻，那么这两个1属于同一个岛。我们只考虑上下左右为相邻。
岛屿: 相邻陆地可以组成一个岛屿（相邻:上下左右） 判断岛屿个数。
示例1
输入：
[[1,1,0,0,0],[0,1,0,1,1],[0,0,0,1,1],[0,0,0,0,0],[0,0,1,1,1]]
复制
返回值：
3
复制
备注：
01矩阵范围<=200*200

```js
/**
 * 判断岛屿数量
 * @param grid char字符型二维数组 
 * @return int整型
 */
// BFS
// BFS用的是队列。

// 遍历整块大陆，横着竖着遍历都可以。
// 第一次碰到陆地的时候，就知道这是块岛屿了，所以将这块陆地放入探险队列，岛屿数量加一。
// 然后我们将这块岛屿的陆地探索完。每一次将这块陆地周围（上下左右）的陆地放入队列，然后将这块陆地标记为已探索（这里就直接置为'0'了）。
// 当探险队列为空时，表示这块岛屿的陆地全部被探索完了，我们继续寻找下一块陆地。


// DFS用的是栈。所以直接用递归就可以了，用的系统栈。
function solve(grid) {
    function explore(i, j) {
        if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] !== '1') return
        grid[i][j] = '0';
        explore(i - 1, j);
        explore(i + 1, j);
        explore(i, j - 1);
        explore(i, j + 1);
    }
    let count = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] !== '1') continue
            count++
            explore(i, j)
        }
    }
    return count
}

module.exports = {
    solve: solve
};
```
