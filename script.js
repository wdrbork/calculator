let displayValue = 0;
let currentSum = 0;
let currentProduct = 0;
let prevOperator = undefined;
let savedOperator = '+';

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => updateDisplay(number));
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', () => mathManager(operator));
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

const switchSign = document.querySelector('.change-sign');
switchSign.addEventListener('click', changeSign);

function updateDisplay(number) {
    if (prevOperator === '=') {
        clear();
    }

    displayValue = displayValue * 10;
    if (displayValue < 0) {
        displayValue -= parseInt(number.textContent);
    } else {
        displayValue += parseInt(number.textContent);
    }

    display.textContent = displayValue;
}

function changeSign() {
    displayValue *= -1;
    display.textContent = displayValue;
}

function mathManager(operator) {
    debug();
    if (prevOperator === '+' || 
        prevOperator === '-') 
    {
        if (operator.textContent === '+' || 
            operator.textContent === '-' || 
            operator.textContent === '=')  // ex: 2 + 3 -
        {
            currentSum = operate(prevOperator, currentSum, displayValue);
            displayValue = currentSum;
            display.textContent = displayValue;
        } 
        else {  // ex: 2 + 3 * 
            currentProduct = displayValue;
            savedOperator = prevOperator;
        } 
    } else if (prevOperator === '*' || 
               prevOperator === '÷') 
    {
        currentProduct = operate(prevOperator, currentProduct, displayValue);
        if (operator.textContent === '+' || 
            operator.textContent === '-' || 
            operator.textContent === '=')  // ex: 2 * 3 +
        {
            currentSum = operate(savedOperator, currentSum, currentProduct);
            currentProduct = 0;
            displayValue = currentSum;
            display.textContent = displayValue;
        } else {
            displayValue = currentProduct;
            display.textContent = currentProduct;
        }
    } else {
        if (operator.textContent === '+' || 
            operator.textContent === '-' || 
            operator.textContent === '=')
        { 
            currentSum = displayValue;
            currentProduct = 0;
        } else {
            currentProduct = displayValue;
            currentSum = 0;
        }
    }

    if (operator.textContent !== '=') {
        displayValue = 0;
    }
    prevOperator = operator.textContent;
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
    } else if (operator === '÷') {
        return divide(x, y);
    }
}

function clear() {
    displayValue = 0;
    currentSum = 0;
    currentProduct = 0;
    prevOperator = undefined;
    savedOperator = '+';
    display.textContent = "";
}

function debug() {
    console.log('displayValue: ' + displayValue);
    console.log('currentSum: ' + currentSum);
    console.log('currentProduct: ' + currentProduct);
    console.log('prevOperator: ' + prevOperator);
    console.log('savedOperator: ' + savedOperator);
    console.log("");
}