/**
 * 滑动窗口
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let l = r = 0;
    const len = s.length;
    const win = new Set();
    let maxlen = 0
    while (r < len) {
        const cur = s[r]
        if (win.has(cur)) {
            win.delete(s[l])
            l++
        } else {
            maxlen = Math.max(maxlen, r - l + 1)
            win.add(cur)
            r++
        }
    }
    return maxlen
};
console.log(lengthOfLongestSubstring("pwwkew"))