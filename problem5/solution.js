/**
 * @param {string} s
 * @param {number[]} answers
 * @return {number}
 */
var scoreOfStudents = function (s, answers) {
  const frequencyMap = createFrequencyMap(answers);
  const n = Math.floor(s.length / 2) + 1;
  const res = initializeResultArray(n);
  fillResultArray(s, res, n);
  return calculateScore(s, frequencyMap, res, n);
};


function createFrequencyMap(answers) {
  const frequencyMap = new Map();
  answers.forEach(a => {
      if (!frequencyMap.has(a)) {
          frequencyMap.set(a, 0);
      }
      frequencyMap.set(a, frequencyMap.get(a) + 1);
  });
  return frequencyMap;
}

function initializeResultArray(n) {
  return Array.from({length: n}, () => Array.from({length: n}, () => new Set()));
}

function fillResultArray(s, res, n) {
  for (let i = 0; i < n; i++) {
      res[i][i].add(parseInt(s[2 * i]));
  }
  for (let dif = 1; dif < n; dif++) {
      for (let start = 0; start < n - dif; start++) {
          let end = start + dif;
          let curset = new Set();
          for (let i = start * 2 + 1; i < end * 2; i += 2) {
              let operator = s[i] === "+" ? (a, b) => a + b : (a, b) => a * b;
              for (let a of res[start][Math.floor(i / 2)]) {
                  for (let b of res[Math.floor(i / 2) + 1][end]) {
                      let result = operator(a, b);
                      if (result <= 1000) {
                          curset.add(result);
                      }
                  }
              }
          }
          res[start][end] = curset;
      }
  }
}

function calculateScore(s, frequencyMap, res, n) {
  let ans = 0;
  let crt = eval(s);
  for (let i of res[0][n - 1]) {
      if (frequencyMap.has(i)) {
          ans += (i === crt ? 5 : 2) * frequencyMap.get(i);
      }
  }
  return ans;
}