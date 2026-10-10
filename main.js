// Add
const add = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
};

// Subtract
const subtract = function (firstNumber, secondNumber) {
  return firstNumber - secondNumber;
};

const multiply = function (array) {
  return array.reduce((accumulator, currentValue) => {
    return accumulator * currentValue;
  }, 1);
};
