/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
    const n = s1.length;
    const dp = new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(null).map(() => new Array(n + 1).fill(false)));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j][1] = s1[i] === s2[j];
        }
    }

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len <= n; i++) {
            for (let j = 0; j + len <= n; j++) {
                for (let k = 1; k < len; k++) {
                    if ((dp[i][j][k] && dp[i + k][j + k][len - k]) || (dp[i][j + len - k][k] && dp[i + k][j][len - k])) {
                        dp[i][j][len] = true;
                        break;
                    }
                }
            }
        }
    }

    return dp[0][0][n];
};