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

### getCountleResult Function
The `getCountleResult` function serves as the entry point for solving Countle.org puzzles. It initializes the recursive process with the target number and the initial list of available numbers, and returns the solution in the form of a 2D array containing the sequence of operations applied to reach the target number.

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
```
### Description
The `getCountleResult` function is the main function responsible for solving Countle.org puzzles. It takes the target number and the initial list of available numbers as inputs, and returns the solution in the form of a 2D array containing the sequence of operations applied to reach the target number.

### Inputs
- **target**: The target number that the puzzle aims to reach.
  - Type: `number`
- **inputArray**: An array containing the initial available numbers for the puzzle.
  - Type: `number[]`

### Outputs
- **Result**: A 2D array representing the solution to the Countle.org puzzle. Each inner array contains four elements representing a single operation applied to reach the target number.
  - Element 1: The first number involved in the operation.
  - Element 2: The operation type (0 for addition, 1 for subtraction, 2 for multiplication, 3 for division).
  - Element 3: The second number involved in the operation.
  - Element 4: The result of the operation.
  - Type: `number[][]`
 
### Example
```typescript
import getCountleResult from './getCountleResult';

const target = 890;
const inputArray = [75, 25, 50, 100, 7, 9];
const result = getCountleResult(target, inputArray);

console.log(result);
// Output: [
//   [7, 2, 75, 525], // 7 * 75 = 525
//   [9, 2, 100, 900], // 9 * 100 = 900
//   [525, 1, 25, 500], // 525 - 25 = 500
//   [500, 3, 50, 10], // 500 / 50 = 10
//   [900, 1, 10, 890 ] // 900 - 10 = 890
// ]
```

## Support
If you encounter any issues or have any questions, feel free to open an issue on GitHub.
