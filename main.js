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
const operate = function (numberOne, operator, numberTwo) {
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

// Function to catch numbers, update variables and show them in the display
const btns = document.querySelector('#calc-button-row');

const typedText = document.querySelector('#calc-typed');

btns.addEventListener('click', (e) => {
  if (numberOne.length + operator.length + numberTwo.length < 15) {
    if (e.target.classList.contains('number')) {
      //  console.log(e.target.textContent)
      if (operator === '') {
        numberOne += e.target.textContent;
        typedText.textContent = numberOne + operator + numberTwo;
      } else {
        numberTwo += e.target.textContent;
        typedText.textContent = numberOne + operator + numberTwo;
      }
    }
    if (e.target.classList.contains('option')) {
      // console.log(`option was clicked`)
      if (operator.length < 1) {
        operator += e.target.textContent;
        typedText.textContent = numberOne + operator + numberTwo;
      } else if (operator.length === 1) {
        operator = '';
        operator += e.target.textContent;
        typedText.textContent = numberOne + operator + numberTwo;
      } else {
        return;
      }
    }
    if (e.target.id === 'equal') {
      if (numberOne !== '' && numberTwo !== '' && operator !== '') {
        const result = operate(numberOne, operator, numberTwo);
        typedText.textContent = result;
      }
    }
  } else {
    return;
  }
});
