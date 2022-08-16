let displayValue = 0;
let currentSum = 0;
let currentProduct = 0;
let currentOperator = undefined;
let savedOperator = undefined;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        displayValue = displayValue * 10 + parseInt(number.textContent);
        display.textContent = displayValue;
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if (currentOperator === '+' || currentOperator === '-') {
            if (operator.textContent === '+' || operator.textContent === '-' || 
                    operator.textContent === '=') {
                currentSum = operate(currentOperator, currentSum, displayValue);
                display.textContent = currentSum;
            } else {
                savedOperator = currentOperator;
                currentProduct = displayValue;
            } 
        } else if (currentOperator === '*' || currentOperator === '/') {
            currentProduct = operate(currentOperator, currentProduct, displayValue);
            if ((operator.textContent === '+' || operator.textContent === '-' || 
                    operator.textContent === '=') && savedOperator) {
                currentSum = operate(savedOperator, currentSum, currentProduct);
                display.textContent = currentSum;
            } else {
                display.textContent = currentProduct;
            }
        } else {
            if (operator.textContent === '+' || operator.textContent === '-' || 
                    operator.textContent === '=') {
                currentSum = displayValue;
            } else {
                currentProduct = displayValue;
            }
        }
    
        displayValue = 0;
        if (operator.textContent !== '=') {
            currentOperator = operator.textContent;
        }
    });
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

function mathManager(operator) {
    if (currentOperator) {
        if (operator.textContent === '+' || operator.textContent === '-' || 
                operator.textContent === '=') {
            currentSum = operate(currentOperator, currentSum, displayValue);
            display.textContent = currentSum;
        }
    }

    displayValue = 0;
    if (operator.textContent === '=') {
        currentOperator = undefined;
    } else {
        currentOperator = operator.textContent;
    }
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        clear();
        return 'ERROR';
    }

    return x / y;
}

function operate(operator, x, y) {
    if (operator === '+') {
        return add(x, y);
    } else if (operator === '-') {
        return subtract(x, y);
    } else if (operator === '*') {
        return multiply(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    }
}

function clear() {
    displayValue = 0;
    currentSum = 0;
    currentProduct = 0;
    currentOperator = undefined;
    savedOperator = undefined;
    display.textContent = "";
}