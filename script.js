// Sets the maximum number of digits in display
const MAX_LENGTH = 16;

// If true, the variables initialized immedietly afterwards are printed to 
// the console
const DEBUG = false;

// The value to be shown on the display
let displayValue = "";

// The current sum of the calculation string. Due to order of operations, this 
// acts the most general value and has the lowest priority
let currentSum = 0;

// The current product of the calculation string. Only comes into play when  
// prevOperator is "*" or "÷"
let currentProduct = 0;

// The last operator chosen
let prevOperator = undefined;

// Saves the most recently used +/- operator (can only be '+' or '-'). When the 
// user switches from +/- to */÷, we want to remember the last used +/- operator 
// so that we can correctly merge the currentSum and the currentProduct
let savedOperator = '+';

// Manages the calculator display. When a number is chosen, it is output to the 
// display
const display = document.querySelector('.display');
display.textContent = "0";
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => updateDisplay(number));
});

// Uses the chosen operator to conduct certain operations. See the mathManager 
// function for specific functionality
const operators = document.querySelectorAll('.operator');
operators.forEach((operator) => {
    operator.addEventListener('click', () => mathManager(operator));
});

// Resets all global variables in the program to their default state (see above)
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', clear);

// Removes most recent numerical input from display
const undo = document.querySelector('.undo');
undo.addEventListener('click', undoLast);

// Changes the number on display from positive to negative or vice versa
const switchSign = document.querySelector('.change-sign');
switchSign.addEventListener('click', changeSign);

// Adds decimal to number in display
const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimal);

function updateDisplay(number) {
    if (prevOperator === '=') {
        clear();
    }

    if ((displayValue === "0" && number.textContent === "0") || 
        displayValue.length === MAX_LENGTH) {
        return;
    }

    displayValue += number.textContent;
    display.textContent = displayValue;
}

function clear() {
    displayValue = "";
    currentSum = 0;
    currentProduct = 0;
    prevOperator = undefined;
    savedOperator = '+';
    display.textContent = "0";
    display.setAttribute('style', 'font-size: 60px;');
}

function undoLast() {
    if (displayValue === "") {
        return;
    }

    displayValue = String(displayValue).slice(0, -1);
    if (displayValue === "") {
        display.textContent = "0";
    } else {
        display.textContent = displayValue;
    }
}

function changeSign() {
    if (displayValue === "") {
        return;
    }

    if (String(displayValue).startsWith('-')) {
        displayValue = String(displayValue).substring(1);
    } else {
        displayValue = '-' + displayValue;
    }
    
    display.textContent = displayValue;
}

function addDecimal() {
    if (displayValue.includes('.')) {
        return;
    }

    if (displayValue === "") {
        displayValue = "0";
    }

    displayValue += '.';
    display.textContent = displayValue;
    console.log(displayValue);
}

function mathManager(operator) {
    if (DEBUG) {
        debug();
    }

    // If an operator is the first thing pressed after the calculator is cleared 
    // or first loaded, we do not want to do anything
    if (displayValue === "") {
        return;
    }

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
        if (currentProduct === 'ERROR') {
            display.textContent = currentProduct;
            currentProduct = 0;
            return;
        }

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

    // Adjusts the font size of the display depending on the length of the display 
    // value
    if (display.textContent.length > MAX_LENGTH) {
        display.setAttribute('style', 'font-size: 40px;');
    } else {
        display.setAttribute('style', 'font-size: 60px;');
    }

    if (operator.textContent !== '=') {
        displayValue = "";
    }
    prevOperator = operator.textContent;
}

function add(x, y) {
    let answer = Number((x + y).toFixed(MAX_LENGTH));
    return answer;
}

function subtract(x, y) {
    let answer = Number((x - y).toFixed(MAX_LENGTH));
    return answer;
}

function multiply(x, y) {
    let answer = Number((x * y).toFixed(MAX_LENGTH));
    return answer;
}

function divide(x, y) {
    if (y === 0) {
        clear();
        return 'ERROR';
    }

    let answer = Number((x / y).toFixed(MAX_LENGTH));
    return answer;
}

function operate(operator, x, y) {
    x = parseFloat(x);
    y = parseFloat(y);
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

function debug() {
    console.log('displayValue: ' + displayValue);
    console.log('currentSum: ' + currentSum);
    console.log('currentProduct: ' + currentProduct);
    console.log('prevOperator: ' + prevOperator);
    console.log('savedOperator: ' + savedOperator);
    console.log("");
}