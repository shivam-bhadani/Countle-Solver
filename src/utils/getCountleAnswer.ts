function getNextList(arr: number[], index1: number, index2: number): number[] {
  const nextList: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index1 && i !== index2) {
      nextList.push(arr[i]);
    }
  }
  return nextList;
}

export interface ICountleResultList {
  firstNumber: number;
  secondNumber: number;
  symbol: number;
  resultant: number;
}

let ans: ICountleResultList[] = [];
const memo: Set<string> = new Set();

function recursion(
  target: number,
  availableNumbers: number[],
  currentAnswer: ICountleResultList[],
  steps: number
): void {
  availableNumbers.sort((a, b) => a - b);
  if (ans.length) {
    return;
  }
  if (steps) {
    const made = currentAnswer[currentAnswer.length - 1].resultant;
    if (made === target) {
      ans = [...currentAnswer];
      return;
    }
  }
  if (steps > 5) return;
  let memo_string: string = availableNumbers.join("_");
  if (memo.has(memo_string)) {
    return;
  }
  for (let i = 0; i < availableNumbers.length; i++) {
    for (let j = 0; j < availableNumbers.length; j++) {
      if (i !== j) {
        const firstNumber = availableNumbers[i];
        const secondNumber = availableNumbers[j];

        // Addition Operation
        currentAnswer.push({
          firstNumber,
          secondNumber,
          symbol: 0,
          resultant: firstNumber + secondNumber,
        });
        const additionList = getNextList(availableNumbers, i, j);
        additionList.push(firstNumber + secondNumber);
        recursion(target, additionList, currentAnswer, steps + 1);
        currentAnswer.pop();

        // Subtraction Operation
        if (firstNumber >= secondNumber) {
          currentAnswer.push({
            firstNumber,
            secondNumber,
            symbol: 1,
            resultant: firstNumber - secondNumber,
          });
          const subtractionList = getNextList(availableNumbers, i, j);
          subtractionList.push(firstNumber - secondNumber);
          recursion(target, subtractionList, currentAnswer, steps + 1);
          currentAnswer.pop();
        }

        // Multiplication Operation
        currentAnswer.push({
          firstNumber,
          secondNumber,
          symbol: 2,
          resultant: firstNumber * secondNumber,
        });
        const multiplicationList = getNextList(availableNumbers, i, j);
        multiplicationList.push(firstNumber * secondNumber);
        recursion(target, multiplicationList, currentAnswer, steps + 1);
        currentAnswer.pop();

        // Division Operation
        if (firstNumber % secondNumber === 0) {
          currentAnswer.push({
            firstNumber,
            secondNumber,
            symbol: 3,
            resultant: firstNumber / secondNumber,
          });
          const divisionList = getNextList(availableNumbers, i, j);
          divisionList.push(firstNumber / secondNumber);
          recursion(target, divisionList, currentAnswer, steps + 1);
          currentAnswer.pop();
        }
      }
    }
  }
  memo.add(memo_string);
}

function getCountleAnswer(target: number, inputArray: number[]): ICountleResultList[] {
  const currentAnswer: ICountleResultList[] = [];
  recursion(target, inputArray, currentAnswer, 0);
  return ans;
}

export default getCountleAnswer;
