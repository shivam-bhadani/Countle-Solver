# Countle Solver

## Description
A chrome extension which can solve [https://www.countle.org](https://www.countle.org/)

## Installation
Follow these steps to install the Chrome extension:
1. ##### Clone the Repository:
   ```bash
   git clone git@github.com:shivam-bhadani/Countle-Solver.git
   ```

2. #### Install Dependencies:
   ```bash
   cd Countle-Solver
   npm install
   ```

3. #### Build the Extension:
   ```bash
   npm run build
   ```

4. #### Load the Extension in Chrome:
   * Open Google Chrome.
   * Go to `chrome://extensions/`.
   * Enable Developer mode (toggle switch in the top-right corner).
   * Click on "Load unpacked" and select the `dist` directory within Countle-Solver directory.

## Usage
1. Navigate to [https://www.countle.org](https://www.countle.org/) and start a puzzle.
2. Click on the Countle Solver Chrome Extension icon in the toolbar.
3. Click on **Solve** button to get the solution of the puzzle.
4. Enjoy the solved puzzle.

## Screen Shots

1. Click on extension icon
![Countle Solver Extension](https://github.com/shivam-bhadani/Countle-Solver/assets/86145793/e48181d1-8d01-4a72-b5dc-1c0131b75826)

2. Click on Solve Button to get the solution
![Solution](https://github.com/shivam-bhadani/Countle-Solver/assets/86145793/8d5f2714-2d75-4ff9-9fd9-f0552f6d1b89)


## Solution Approach
The Countle Solver Chrome Extension uses a recursive algorithm to solve puzzles efficiently. Here's a breakdown of the solution approach:

### Recursive Function
The core of the solution lies in the `recursion` function. This function explores all possible combinations of arithmetic operations (addition, subtraction, multiplication, and division) on the available numbers to reach the target number.

### Memoization
To avoid redundant computations and optimize performance, the solution employs memoization. The `memo` set stores the state of each available number combination encountered during the recursive process. This ensures that the algorithm does not revisit previously explored states, thus reducing redundant computations.

### Backtracking
The algorithm utilizes backtracking to explore different paths and backtrack when a dead-end is encountered. This allows for a systematic exploration of all possible solutions without getting stuck in infinite loops or redundant computations.

### getNextList Function
The `getNextList` function is a utility function used to generate the next list of available numbers after applying an arithmetic operation. It removes the two numbers involved in the operation and adds the result of the operation to the list.

### getCountleAnswer Function
The `getCountleAnswer` function serves as the entry point for solving Countle.org puzzles. It initializes the recursive process with the target number and the initial list of available numbers, and returns the solution in the form of a ICountleResultList[] array containing the sequence of operations applied to reach the target number.

Here is the code that solves the puzzle:
```typescript
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

const MAXIMUM_STEPS = 5;

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
  if (steps > MAXIMUM_STEPS) return;
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
```
### Description
The `getCountleResult` function is the main function responsible for solving Countle.org puzzles. It takes the target number and the initial list of available numbers as inputs, and returns the solution in the form of a 2D array containing the sequence of operations applied to reach the target number.

### Inputs
- **target**: The target number that the puzzle aims to reach.
  - Type: `number`
- **inputArray**: An array containing the initial available numbers for the puzzle.
  - Type: `number[]`

### Outputs
- **Result**: An array of ICountleResultList[] representing the solution to the Countle.org puzzle. Each inner array is an object representing a single operation applied to reach the target number.
  - firstNumber: The first number involved in the operation.
  - secondNumber: The second number involved in the operation.
  - symbol: The operation type (0 for addition, 1 for subtraction, 2 for multiplication, 3 for division).
  - resultant: The result of the operation.
  - Type: `ICountleResultList[]`


## Support
If you encounter any issues or have any questions, feel free to open an issue on GitHub.
