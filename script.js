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
  return secondNumber === 0 ? 'Nice try! 🚫' : firstNumber / secondNumber;
};

// Creating Variables for operations
let numberOne = '';
let numberTwo = '';
let operator = '';
let sum = 0;
let shouldResetDisplay = false;

// Operator function
function operate(a, b, operator) {
  const num1 = Number(a);
  const num2 = Number(b);

  let result;
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '×':
    case '*':
      result = multiply(num1, num2);
      break;
    case '÷':
    case '/':
      result = divide(num1, num2);
      break;
    default:
      return null;
  }

  if (typeof result === 'string') return result;
  // Precision rounding to prevent display overflow and float bugs
  return Math.round(result * 1000000) / 1000000;
}

// Function to catch numbers, update variables and show them in the display
const typedText = document.querySelector('#calc-typed');

const btnsHolder = document.querySelector('#calc-button-row');
const numberBtns = document.querySelectorAll('.number');
const optionBtns = document.querySelectorAll('.option');

const clearBtn = document.querySelector('#ac');
const deleteBtn = document.querySelector('#delete');
const equalBtn = document.querySelector('#equal');

// Starting of the display
typedText.textContent = '0';

// Clear function
function clearAll() {
  numberOne = '';
  numberTwo = '';
  operator = '';
  sum = 0;
  shouldResetDisplay = false;
  typedText.textContent = '0';
}

// Digit append
function handleNumbers(digit) {
  if (typedText.textContent === 'Nice try! 🚫' || shouldResetDisplay) {
    clearAll();
  }

  // Handle decimal input
  if (digit === '.') {
    if (operator === '') {
      if (numberOne.includes('.')) return;
      numberOne = numberOne === '' ? '0.' : numberOne + '.';
      typedText.textContent = numberOne;
    } else {
      if (numberTwo.includes('.')) return;
      numberTwo = numberTwo === '' ? '0.' : numberTwo + '.';
      typedText.textContent = numberOne + operator + numberTwo;
    }
    return;
  }

  // Handle numbers
  if (operator === '') {
    if (numberOne === '0' && digit === '0') return;
    numberOne = numberOne === '0' ? String(digit) : numberOne + String(digit);
    typedText.textContent = numberOne;
  } else {
    if (numberTwo === '0' && digit === '0') return;
    numberTwo = numberTwo === '0' ? String(digit) : numberTwo + String(digit);
    typedText.textContent = numberOne + operator + numberTwo;
  }
}

// Operator handler
function handleOperators(sign) {
  if (typedText.textContent === 'Nice try! 🚫') return;

  if (shouldResetDisplay) {
    shouldResetDisplay = false;
  }

  // Set default first number if empty
  if (numberOne === '') {
    numberOne = '0';
  }

  // Operator chaining: evaluate existing pair first
  if (operator !== '' && numberTwo !== '') {
    mathOperator();
    if (typedText.textContent === 'Nice try! 🚫') return;
  }

  operator = sign;
  typedText.textContent = numberOne + operator;
}

// Math operator
function mathOperator() {
  if (numberOne === '' || operator === '' || numberTwo === '') return;

  sum = operate(numberOne, numberTwo, operator);

  if (sum === 'Nice try! 🚫') {
    typedText.textContent = sum;
    numberOne = '';
    numberTwo = '';
    operator = '';
    shouldResetDisplay = true;
    return;
  }

  typedText.textContent = String(sum);
  numberOne = String(sum);
  numberTwo = '';
  operator = '';
  shouldResetDisplay = true;
}

// Backspace handler
function handleDelete() {
  if (shouldResetDisplay || typedText.textContent === 'Nice try! 🚫') return;

  if (numberTwo !== '') {
    numberTwo = numberTwo.slice(0, -1);
    typedText.textContent = numberOne + operator + numberTwo;
  } else if (operator !== '') {
    operator = '';
    typedText.textContent = numberOne;
  } else if (numberOne !== '') {
    numberOne = numberOne.slice(0, -1);
    typedText.textContent = numberOne === '' ? '0' : numberOne;
  }
}

// Event listeners
clearBtn.addEventListener('click', clearAll);

deleteBtn.addEventListener('click', handleDelete);

numberBtns.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleNumbers(e.target.textContent.trim());
  });
});

optionBtns.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleOperators(e.target.textContent.trim());
  });
});

equalBtn.addEventListener('click', mathOperator);

// Keyboard Support (Extra Credit)
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    handleNumbers(e.key);
  } else if (e.key === '+' || e.key === '-') {
    handleOperators(e.key);
  } else if (e.key === '*') {
    handleOperators('×');
  } else if (e.key === '/') {
    e.preventDefault();
    handleOperators('÷');
  } else if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault();
    mathOperator();
  } else if (e.key === 'Backspace') {
    handleDelete();
  } else if (e.key === 'Escape') {
    clearAll();
  }
});
