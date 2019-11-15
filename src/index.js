let input = document.querySelector("#inputBox");
let result = document.querySelector("#result");
let body = document.body;

let NUM_ARRAY = [7000, 7001, 7002, 7003, 7004, 7005];

let duplicates = [];

function checkForDuplicates(e) {
  let inputVal = e.target.value;

  if (inputVal.length === 0) {
    duplicates = [];
    result.innerText = duplicates;
    return;
  }

  let inputObj = formDataObject(inputVal);
  console.log(inputObj);
  duplicates = findDuplicates(NUM_ARRAY, inputObj);

  // show in UI
  result.innerText = duplicates;
}

function findDuplicates(NUM_ARRAY, inputObj) {
  let result = [];
  let { numbers, ranges } = inputObj;

  let sortedNumArray = [...NUM_ARRAY].sort((a, b) => a - b);
  let sortedNumbers = [...numbers].sort((a, b) => a - b);

  // duplicates of numbers
  result = result.concat(getIntersection(sortedNumArray, sortedNumbers));

  // duplicates of ranges.
  result = result.concat(getIntersectionRanges(sortedNumArray, ranges));

  return [...new Set(result)];
}

function getIntersectionRanges(arr, ranges) {
  let result = [];
  let first = arr[0];
  let last = arr[arr.length - 1];
  let i, j;

  for (let range of ranges) {
    let { start, end } = range;

    // if range is inside the input array
    if (first <= start && end <= last) {
      i = start;
      j = end;
      while (i <= j) {
        result.push(i++);
      }
    }
    // first part of array overlaps with range
    else if (start < first && end >= first && end <= last) {
      i = first;
      j = end;
      while (i <= j) {
        result.push(i++);
      }
    } else if (start < last && start > first && end > last) {
      i = start;
      j = last;
      while (i <= j) {
        result.push(i++);
      }
    } else if (start < first && end > last) {
      i = first;
      j = last;
      while (i <= j) {
        result.push(i++);
      }
    }
  }

  return result;
}

function getIntersection(arr1 = [], arr2 = []) {
  return [...new Set(arr1)].filter(item => [...new Set(arr2)].includes(item));
}

function formDataObject(inputVal) {
  let inputArr = inputVal.split(",");

  let obj = {
    numbers: [],
    ranges: []
  };

  for (let n of inputArr) {
    if (n.indexOf("-") === -1) {
      // its not a range
      obj.numbers.push(Number(n)); // convert to number and push
    } else {
      let rangeArr = n.split("-");

      let range = {
        start: Number(rangeArr[0]),
        end: Number(rangeArr[1])
      };

      obj.ranges.push(range);
    }
  }

  return obj;
}

let debounce = function(fn, delay) {
  let timer;
  return function() {
    let context = this;
    let args = [...arguments];

    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(context, args), delay);
  };
};

input.addEventListener("input", debounce(checkForDuplicates, 300));
