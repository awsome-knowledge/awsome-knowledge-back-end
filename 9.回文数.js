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
    
    console.log(isPalindrome(12323121))
    // 99  length = 2，max = 1, half = 1, first loop edge = 10,  first loop currentNum = parseInt(99 / 10) = 9
    // 99 = 9 * 10 ** 1 + 9 * 10 ** 0
    
    // 121 length = 3，isLengthOdd = true, max = 2, half = 1, first loop edge = 100, first loop currentNum = parseInt(121 / 100) = 1
    // 121 = 1 * 10 ** 2 + 1 * 10 ** 0 + 2 * 10 ** 1.