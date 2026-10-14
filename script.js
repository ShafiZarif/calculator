// --- 1. Basic Math Operator Functions ---
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'LOL NO ✋' : a / b);

// --- 2. Calculator State Variables ---
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// --- DOM Elements ---
const display = document.getElementById('display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalsBtn = document.getElementById('equals');
const clearBtn = document.getElementById('clear');
const backspaceBtn = document.getElementById('backspace');
const decimalBtn = document.getElementById('decimal');

// --- 3. Main Operate Function ---
function operate(operator, a, b) {
  const num1 = Number(a);
  const num2 = Number(b);
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '×':
    case '*':
      return multiply(num1, num2);
    case '÷':
    case '/':
      return divide(num1, num2);
    default:
      return null;
  }
}

// Helper: Round decimals to prevent display overflow
function roundResult(number) {
  if (typeof number === 'string') return number; // Return error strings directly
  return Math.round(number * 100000) / 100000;
}

// --- Display & Logic Updaters ---
function appendNumber(digit) {
  // If result was evaluated or operator clicked, clear active display before appending
  if (display.textContent === '0' || shouldResetDisplay) {
    resetDisplay();
  }

  // Prevent user from starting fresh with consecutive 0s
  if (display.textContent === '0' && digit === '0') return;

  display.textContent += digit;

  if (currentOperator === null) {
    firstNumber = display.textContent;
  } else {
    secondNumber += digit;
  }
}

function appendDecimal() {
  if (shouldResetDisplay) resetDisplay();

  // Extra Credit: Prevent adding multiple decimals to a single operand
  if (display.textContent.includes('.')) return;

  if (display.textContent === '') display.textContent = '0';
  display.textContent += '.';

  if (currentOperator === null) {
    firstNumber = display.textContent;
  } else {
    secondNumber += '.';
  }
}

function resetDisplay() {
  display.textContent = '';
  shouldResetDisplay = false;
}

function setOperator(op) {
  // Gotcha Fix: Single-pair chaining (12 + 7 - 1)
  if (currentOperator !== null && secondNumber !== '') {
    evaluate();
  }

  // Gotcha Fix: Don't evaluate if first number doesn't exist or is an error
  if (firstNumber === '' || display.textContent === 'LOL NO ✋') return;

  // Gotcha Fix: Consecutive operator clicks only update operator
  currentOperator = op;
  shouldResetDisplay = true;
  secondNumber = '';
}

function evaluate() {
  // Gotcha Fix: Prevent evaluation if missing second number or operator
  if (currentOperator === null || secondNumber === '' || shouldResetDisplay)
    return;

  let result = operate(currentOperator, firstNumber, secondNumber);
  result = roundResult(result);

  display.textContent = result;

  // Prepare state for next operation
  firstNumber = result === 'LOL NO ✋' ? '' : String(result);
  currentOperator = null;
  secondNumber = '';
  shouldResetDisplay = true;
}

function clear() {
  display.textContent = '0';
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  shouldResetDisplay = false;
}

function backspace() {
  if (shouldResetDisplay) return;

  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === '' || display.textContent === '-') {
    display.textContent = '0';
  }

  if (currentOperator === null) {
    firstNumber = display.textContent === '0' ? '' : display.textContent;
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
}

// --- Event Listeners ---
numberBtns.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorBtns.forEach((button) =>
  button.addEventListener('click', () => setOperator(button.dataset.op))
);

equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
backspaceBtn.addEventListener('click', backspace);
decimalBtn.addEventListener('click', appendDecimal);

// --- Keyboard Support (Extra Credit) ---
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  if (e.key === '.') appendDecimal();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') backspace();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-') setOperator(e.key);
  if (e.key === '*') setOperator('×');
  if (e.key === '/') {
    e.preventDefault(); // Prevents quick-find search in Firefox
    setOperator('÷');
  }
});
