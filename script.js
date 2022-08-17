let displayValue = 0;
let currentSum = 0;
let currentProduct = 0;
let prevOperator = undefined;
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
        if (prevOperator === '+' || prevOperator === '-') {
            if (operator.textContent === '+' || operator.textContent === '-' || 
                    operator.textContent === '=') {
                currentSum = operate(prevOperator, currentSum, displayValue);
                display.textContent = currentSum;
            } else {
                savedOperator = prevOperator;
                currentProduct = displayValue;
            } 
        } else if (prevOperator === '*' || prevOperator === '/') {
            currentProduct = operate(prevOperator, currentProduct, displayValue);
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
            prevOperator = operator.textContent;
        }
    });
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

function mathManager(operator) {
    if (prevOperator) {
        if (operator.textContent === '+' || operator.textContent === '-' || 
                operator.textContent === '=') {
            currentSum = operate(prevOperator, currentSum, displayValue);
            display.textContent = currentSum;
        }
    }

    displayValue = 0;
    if (operator.textContent === '=') {
        prevOperator = undefined;
    } else {
        prevOperator = operator.textContent;
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
    prevOperator = undefined;
    savedOperator = undefined;
    display.textContent = "";
}