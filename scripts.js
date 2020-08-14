const numberButton = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
let secondNum = false;
let num1 = '';
let num2 = '';
let operator = '';

const printInput = document.addEventListener('click', e => {
    let inputScreen = document.querySelector('#input-screen');
    let answerScreen = document.querySelector('#answer-screen');
    let button = e.target;

    if (button.classList.contains('number')){
        if(secondNum == false) {
            inputScreen.value += button.getAttribute('id');
            num1 += button.getAttribute('id');
            console.log(num1);
        } else {
            inputScreen.value = '';
            inputScreen.value += button.getAttribute('id');
            num2 += button.getAttribute('id');
            console.log(num2);
        }
    } else if (button.classList.contains('operator')) {
        secondNum = true;
        num1 = inputScreen.value
        operator = button.getAttribute('id');
        console.log(operator);
    } else if (button.classList.contains('equals')) {
        secondNum = false;
        num1 = Number(num1);
        num2 = Number(num2);
        let answer = operate(num1, operator, num2);
        console.log(answer);
        answerScreen.value = answer;
        num1 = '';
        num2 = '';
        inputScreen.value = '';
    } else if (button.classList.contains('clear')) {
        clear();
    }
});

function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide (num1, num2) {
    return num1 / num2;
};

function operate(num1, operator, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case 'x':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    };
};

function clear() {
    document.getElementById('input-screen').value = "";
    document.getElementById('answer-screen').value = "";
    num1 = '';
    num2 = '';
    answer = '';
};