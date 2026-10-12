// Add
const add = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
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

// Operator function
const operate = function (numberOne, numberTwo, operator) {
  if (operator === '+') {
    return add(numberOne, numberTwo);
  } else if (operator === '-') {
    return subtract(numberOne, numberTwo);
  } else if (operator === '*') {
    return multiply(numberOne, numberTwo);
  } else if (operator === '/') {
    return divide(numberOne, numberTwo);
  } else {
    return console.log(`'Invalid operator entered: ${operator}`);
  }
};

// Functions to catch numbers, update variables and show them in the display
const btns = document.querySelector('#calc-button-row')

btns.addEventListener('click', (e) =>{
  if (e.target.classList.contains('number')){
   console.log(`${e.target.classList} was clicked`) 
   }
})

console.log(btns)

