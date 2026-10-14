// Got it from AI, to be replaced and I will. 😔 I am sorry.
// --- 1. Basic Math Functions ---
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Nice try! 🚫' : a / b);

// --- 2. Calculator State ---
let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetDisplay = false;

// --- DOM References ---
const typedDisplay = document.querySelector('#calc-typed');
const operationDisplay = document.querySelector('#calc-operation');

const numberBtns = document.querySelectorAll('.number');
const optionBtns = document.querySelectorAll('.option');
const acBtn = document.querySelector('#ac');
const deleteBtn = document.querySelector('#delete');
const equalBtn = document.querySelector('#equal');

// Initialize default display
typedDisplay.textContent = '0';
operationDisplay.textContent = '';

// --- 3. Operate Helper ---
function operate(op, a, b) {
  const num1 = Number(a);
  const num2 = Number(b);
  switch (op) {
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

// Decimal rounding helper
function roundResult(num) {
  if (typeof num === 'string') return num;
  return Math.round(num * 1000000) / 1000000;
}

function updateActiveNumber(val) {
  if (currentOperator === null) {
    firstNumber = val;
  } else {
    secondNumber = val;
  }
}

// --- Event Handlers ---
function handleNumber(digit) {
  if (typedDisplay.textContent === 'Nice try! 🚫') clearAll();

  if (shouldResetDisplay) {
    typedDisplay.textContent = '';
    shouldResetDisplay = false;
  }

  if (digit === '.') {
    if (typedDisplay.textContent.includes('.')) return;
    if (typedDisplay.textContent === '') {
      typedDisplay.textContent = '0.';
      updateActiveNumber(typedDisplay.textContent);
      return;
    }
  }

  if (typedDisplay.textContent === '0' && digit === '0') return;
  if (typedDisplay.textContent === '0' && digit !== '.') {
    typedDisplay.textContent = '';
  }

  typedDisplay.textContent += digit;
  updateActiveNumber(typedDisplay.textContent);
}

function handleOption(opSymbol) {
  if (typedDisplay.textContent === 'Nice try! 🚫') return;

  // Toggle Positive / Negative (±)
  if (opSymbol === '±') {
    if (typedDisplay.textContent === '0' || typedDisplay.textContent === '')
      return;
    if (typedDisplay.textContent.startsWith('-')) {
      typedDisplay.textContent = typedDisplay.textContent.slice(1);
    } else {
      typedDisplay.textContent = '-' + typedDisplay.textContent;
    }
    updateActiveNumber(typedDisplay.textContent);
    return;
  }

  // Operator chaining (e.g. 12 + 7 - 1)
  if (currentOperator !== null && secondNumber !== '') {
    evaluate();
  }

  if (firstNumber === '') {
    firstNumber =
      typedDisplay.textContent !== '' ? typedDisplay.textContent : '0';
  }

  currentOperator = opSymbol;
  operationDisplay.textContent = `${firstNumber} ${currentOperator}`;
  typedDisplay.textContent = '';
  secondNumber = '';
  shouldResetDisplay = false;
}

function evaluate() {
  if (currentOperator === null || secondNumber === '' || firstNumber === '')
    return;

  let result = operate(currentOperator, firstNumber, secondNumber);
  result = roundResult(result);

  if (result === 'Nice try! 🚫') {
    typedDisplay.textContent = result;
    operationDisplay.textContent = '';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
    shouldResetDisplay = true;
    return;
  }

  operationDisplay.textContent = `${firstNumber} ${currentOperator} ${secondNumber} =`;
  typedDisplay.textContent = String(result);

  firstNumber = String(result);
  secondNumber = '';
  currentOperator = null;
  shouldResetDisplay = true;
}

function clearAll() {
  firstNumber = '';
  secondNumber = '';
  currentOperator = null;
  shouldResetDisplay = false;
  typedDisplay.textContent = '0';
  operationDisplay.textContent = '';
}

function handleDelete() {
  if (shouldResetDisplay || typedDisplay.textContent === 'Nice try! 🚫') return;

  typedDisplay.textContent = typedDisplay.textContent.slice(0, -1);
  if (typedDisplay.textContent === '' || typedDisplay.textContent === '-') {
    typedDisplay.textContent = '0';
  }
  updateActiveNumber(
    typedDisplay.textContent === '0' ? '' : typedDisplay.textContent
  );
}

// --- Event Listeners ---
numberBtns.forEach((btn) =>
  btn.addEventListener('click', () => handleNumber(btn.textContent.trim()))
);

optionBtns.forEach((btn) =>
  btn.addEventListener('click', () => handleOption(btn.textContent.trim()))
);

equalBtn.addEventListener('click', evaluate);
acBtn.addEventListener('click', clearAll);
deleteBtn.addEventListener('click', handleDelete);

// --- Keyboard Support ---
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
  if (e.key === '.') handleNumber('.');
  if (e.key === '=' || e.key === 'Enter') {
    e.preventDefault();
    evaluate();
  }
  if (e.key === 'Backspace') handleDelete();
  if (e.key === 'Escape') clearAll();
  if (e.key === '+') handleOption('+');
  if (e.key === '-') handleOption('-');
  if (e.key === '*') handleOption('×');
  if (e.key === '/') {
    e.preventDefault();
    handleOption('÷');
  }
});
