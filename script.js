// Add
const add = function (firstNumber, secondNumber) {
  return Number(firstNumber) + Number(secondNumber);
};

// Subtract
const subtract = function (firstNumber, secondNumber) {
  return firstNumber - secondNumber;
};

// Multiply
const multiply = function (firstNumber, secondNumber) {
  return firstNumber * secondNumber;
};

// Divide
const divide = function (firstNumber, secondNumber) {
  return firstNumber / secondNumber;
};

// Creating Variables for operations
let numberOne = '';
let numberTwo = '';
let operator = '';
let sum = 0;

// Operator function
// const operate = function (numberOne, operator, numberTwo) {
//   if (operator === '+') {
//     return add(numberOne, numberTwo);
//   } else if (operator === '-') {
//     return subtract(numberOne, numberTwo);
//   } else if (operator === '×') {
//     return multiply(numberOne, numberTwo);
//   } else if (operator === '÷') {
//     return divide(numberOne, numberTwo);
//   }
// };

function operate(a, b, operator) {
  const num1 = Number(a);
  const num2 = Number(b);

  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '×':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
    default:
      return null;
  }
}

// Function to catch numbers, update variables and show them in the display
const typedText = document.querySelector('#calc-typed');
const upperText = document.querySelector('#calc-operation');

const btnsHolder = document.querySelector('#calc-button-row');
const numberBtns = document.querySelectorAll('.number');
const optionBtns = document.querySelectorAll('.option');

const clearBtn = document.querySelector('#ac');
const deleteBtn = document.querySelector('#delete');
const equalBtn = document.querySelector('#equal');

// btns.addEventListener('click', (e) => {
//   if (numberOne.length + operator.length + numberTwo.length <= 15) {
//     if (e.target.classList.contains('number')) {
//       //  console.log(e.target.textContent)
//       if (operator === '') {
//         numberOne += e.target.textContent;
//         typedText.textContent = numberOne + operator + numberTwo;
//       } else if (operator !== '' && numberOne !== '') {
//         numberTwo += e.target.textContent;
//         typedText.textContent = numberOne + operator + numberTwo;
//       } else {
//         numberTwo += e.target.textContent;
//         typedText.textContent = numberOne + operator + numberTwo;
//       }
//     }
//     if (e.target.classList.contains('option')) {
//       // console.log(`option was clicked`)
//       if (operator.length < 1) {
//         operator += e.target.textContent;
//         typedText.textContent = numberOne + operator + numberTwo;
//       } else if (operator.length === 1 && sum === 0 && numberTwo === '') {
//         operator = e.target.textContent;
//         typedText.textContent = numberOne + operator + numberTwo;
//       } else if (operator.length === 1 && numberTwo !== '') {
//         let result = operate(numberOne, operator, numberTwo);
//         operator = '';
//         numberTwo = '';
//         operator += e.target.textContent;
//         numberOne = String(result);
//         typedText.textContent = numberOne + operator + numberTwo;
//       } else {
//         return;
//       }
//     }
//     if (e.target.id === 'equal') {
//       let result = operate(numberOne, operator, numberTwo);
//       const splitted = String(result).split('.');
//       if (numberOne !== '' && numberTwo !== '' && operator !== '') {
//         sum = result;
//         typedText.textContent = sum;
//         numberOne = String(sum);
//       } else if (numberOne === '' && operator === '' && numberTwo === '') {
//         sum = 0;
//         typedText.textContent = String(sum);
//       } else if (
//         String(result).includes('.') &&
//         splitted[0].length + 1 + splitted[1].length === 15
//       ) {
//         let numberToFixed = 15 - (1 + splitted[0].length);
//         let fixedResult = result.toFixed(numberToFixed);
//         typedText.textContent = fixedResult;
//         numberOne = String(fixedResult);
//       } else {
//         numberOne = result;
//         typedText.textContent = numberOne + operator + numberTwo;
//       }
//       console.log(sum);
//     }
//   } else {
//     return;
//   }
// });
