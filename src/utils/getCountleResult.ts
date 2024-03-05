function getNextList(arr: number[], index1: number, index2: number): number[] {
  const nextList: number[] = [];
  for (let i = 0; i < arr.length; i++) {
      if (i !== index1 && i !== index2) {
          nextList.push(arr[i]);
      }
  }
  return nextList;
}

let ans: number[][] = [];
const memo: Set<string> = new Set();

function recursion(target: number, availableNumbers: number[], current: number[][], steps: number): void {
  availableNumbers.sort((a, b) => a - b);
  if (ans.length) {
      return;
  }
  if (steps) {
      const made = current[current.length - 1][3];
      if (made === target) {
          ans = [...current];
          return;
      }
  }
  if (steps > 5) return;
  let memo_string : string = availableNumbers.join('_');
  if (memo.has(memo_string)) {
      return;
  }
  for (let i = 0; i < availableNumbers.length; i++) {
      for (let j = 0; j < availableNumbers.length; j++) {
          if (i !== j) {
              const firstNumber = availableNumbers[i];
              const secondNumber = availableNumbers[j];

              // Addition Operation
              current.push([firstNumber, 0, secondNumber, firstNumber + secondNumber]);
              const additionList = getNextList(availableNumbers, i, j);
              additionList.push(firstNumber + secondNumber);
              recursion(target, additionList, current, steps + 1);
              current.pop();

              // Subtraction Operation
              if (firstNumber >= secondNumber) {
                  current.push([firstNumber, 1, secondNumber, firstNumber - secondNumber]);
                  const subtractionList = getNextList(availableNumbers, i, j);
                  subtractionList.push(firstNumber - secondNumber);
                  recursion(target, subtractionList, current, steps + 1);
                  current.pop();
              }

              // Multiplication Operation
              current.push([firstNumber, 2, secondNumber, firstNumber * secondNumber]);
              const multiplicationList = getNextList(availableNumbers, i, j);
              multiplicationList.push(firstNumber * secondNumber);
              recursion(target, multiplicationList, current, steps + 1);
              current.pop();

              // Division Operation
              if (firstNumber % secondNumber === 0) {
                  current.push([firstNumber, 3, secondNumber, firstNumber / secondNumber]);
                  const divisionList = getNextList(availableNumbers, i, j);
                  divisionList.push(firstNumber / secondNumber);
                  recursion(target, divisionList, current, steps + 1);
                  current.pop();
              }
          }
      }
  }
  memo.add(memo_string);
}

function getCountleResult(target: number, inputArray: number[]): number[][] {
  const current: number[][] = [];
  recursion(target, inputArray, current, 0);
  return ans;
}

export default getCountleResult;