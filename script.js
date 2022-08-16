let displayValue = 0;
let currentSum = 0;
let currentOperator = undefined;

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
        if (currentOperator) {
            if (operator.textContent === '+' || operator.textContent === '-' || 
                    operator.textContent === '=') {
                currentSum = operate(currentOperator, currentSum, displayValue);
                display.textContent = currentSum;
            }
        } else {
            currentSum = displayValue
        }
    
        displayValue = 0;
        if (operator.textContent === '=') {
            currentOperator = undefined;
        } else {
            currentOperator = operator.textContent;
        }
    });
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    displayValue = 0;
    currentSum = 0;
    currentOperator = undefined;
    display.textContent = "";
});

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
    return parseInt(x) + parseInt(y);
}

function subtract(x, y) {
    return parseInt(x) - parseInt(y);
}

function multiply(x, y) {
    return parseInt(x) * parseInt(y);
}

function divide(x, y) {
    if (y === '0') {
        return 'ERROR';
    }

    return parseInt(x) / parseInt(y);
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