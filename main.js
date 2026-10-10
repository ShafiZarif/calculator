// Add
const add = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

// Subtract
const subtract = function (firstNumber, secondNumber) {
  return firstNumber - secondNumber;
};

// Multiply
const multiply = function (array) {
  return array.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);
};
