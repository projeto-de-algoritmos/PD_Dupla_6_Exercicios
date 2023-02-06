/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
  if (s1 === s2) return true;
  const ASCI_a = 97
  
  let len = s1.length;
  let count = Array(26).fill(0);

  for (let i = 0; i < len; i++) {
      count[s1.charCodeAt(i) - ASCI_a]++;
      count[s2.charCodeAt(i) - ASCI_a]--;
  }

  for (let i = 0; i < 26; i++) {
      if (count[i] !== 0) return false;
  }

  for (let i = 1; i <= len - 1; i++) {
      if (
          isScramble(s1.slice(0, i), s2.slice(0, i)) &&
          isScramble(s1.slice(i), s2.slice(i))
      )
          return true;
      if (
          isScramble(s1.slice(0, i), s2.slice(len - i)) &&
          isScramble(s1.slice(i), s2.slice(0, len - i))
      )
          return true;
  }
  return false;
};