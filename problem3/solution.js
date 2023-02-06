class SEG {
  constructor(nodes) {
    this.numNodes = nodes;
    this.tree = Array(2 * this.numNodes).fill(0);
  }

  query(left, right) {
    left += this.numNodes;
    right += this.numNodes;
    let subSequenceLength = 0;
    while (left < right) {
      if (left & 1) {
        subSequenceLength = Math.max(subSequenceLength, this.tree[left]);
        left += 1;
      }
      if (right & 1) {
        right -= 1;
        subSequenceLength = Math.max(subSequenceLength, this.tree[right]);
      }
      left >>= 1;
      right >>= 1;
    }
    return subSequenceLength;
  }

  update(index, val) {
    index += this.numNodes;
    this.tree[index] = val;
    while (index > 1) {
      index >>= 1;
      this.tree[index] = Math.max(this.tree[index * 2], this.tree[index * 2 + 1]);
    }
  }
}

var lengthOfLIS = function (nums, k) {
  let n = Math.max(...nums)
  let subSequenceLength = 1;
  let seg = new SEG(n);

  for (let i of nums) {
    i -= 1;
    let premax = seg.query(Math.max(0, i - k), i);
    subSequenceLength = Math.max(subSequenceLength, premax + 1);
    seg.update(i, premax + 1);
  }
  
  return subSequenceLength;
}