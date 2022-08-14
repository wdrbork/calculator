let displayValue = 0;
let operator = undefined;

const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        displayValue = parseInt(number.textContent);
        display.textContent = displayValue;
    });
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    displayValue = 0;
    display.textContent = "";
});

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