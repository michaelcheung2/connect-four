var topKFrequent = function (words, k) {
  // create a hashmap of the count of each word
  let hashMap = {};
  for (let i = 0; i < words.length; i++) {
    if (!hashMap[words[i]]) {
      hashMap[words[i]] = 1;
    } else {
      hashMap[words[i]]++;
    }
  }

  // traverse through hashmap and push items into array, so we can sort it
  let arr = [];
  for (let key in hashMap) {
    arr.push({ key: key, value: hashMap[key] });
  }

  // sort the array in desc order
  arr.sort(function (a, b) {
    let n = a.key.substring(0, 1) - b.key.substring(0, 1);
    if (n === 0) {
      return 1;
    }

    return b.value > a.value ? 1 : -1;
    /*
        if (a.value === b.value) {
            return a.value - b.value;
        } else {
            return b.value - a.value;    
        }*/
  });

  // take top k items from array
  let result = [];
  for (let i = 0; i < k; i++) {
    result.push(arr[i].key);
  }

  return result;
};
