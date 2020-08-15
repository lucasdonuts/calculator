let secondNum = false;
let num1 = 0;
let num2 = 0;
let operator = '';
let cleanSlate = true;
let multiOp = false;
let equalsPressed = false;

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
    if(num2 == 0){
        return "Does not compute";
    }
    return num1 / num2;
};

function operate(num1, operator, num2) {
    switch(operator) {
        case '+':
            return Number(add(num1, num2));
            break;
        case '-':
            return Number(subtract(num1, num2));
            break;
        case 'x':
            return Number(multiply(num1, num2));
            break;
        case '/':
            return Number(divide(num1, num2));
            break;
    };
};

const calculator = document.querySelector('#calculator')
const screen = document.querySelector('#screen');
const buttons = calculator.querySelector('#button-grid');

function checkButton(key) {
    if (isNumber(key)) {
        if(equalsPressed) {
            num1 = 0;
            num2 = 0;
            screen.value = '';
            cleanSlate = true;
            multiOp = false;
            equalsPressed = false;
        }
        if(cleanSlate){
            screen.value += key.id;
            num1 = screen.value;
        } else {
            if(num2 == 0) {
                screen.value = '';
            }
            screen.value += key.id;
            num2 = screen.value;
            
        }
        console.log("num1 = " + num1 + " num2 = " + num2 + " operator = " + operator);
    }

    if(isDecimal(key)) {
        if(screen.value == ''){
            screen.value = '0.';
        } else {
            screen.value += key.id;
        }
    }

    if(isOperator(key)) {
        console.log(num1, num2, operator);
        cleanSlate = false;
        if(equalsPressed) {
            multiOp = false;
            num1 = Number(screen.value);
            equalsPressed = false;
        }
        if(!multiOp) {
            num1 = Number(num1);
            operator = key.id;
            multiOp = true;
        } else {
            num2 = Number(num2);
            num1 = operate(num1, operator, num2); ///
            screen.value = num1;
            operator = key.id;
        }
    }

    if(isEquals(key)) {
        num1 = Number(num1);
        num2 = Number(num2);
        screen.value = operate(num1, operator, num2);
        num1 = Number(screen.value);
        num2 = 0;
        equalsPressed = true;
        console.log(num1, num2, operator);
    }

    if(isClear(key)) {
        num1 = 0;
        num2 = 0;
        screen.value = '';
        cleanSlate = true;
        multiOp = false;
        equalsPressed = false;
    }
}

function isNumber(key) {
    if (key.classList.contains('number')) return true;
}

function isDecimal(key) {
    if (key.classList.contains('decimal')) return true;
}

function isOperator(key) {
    if (key.classList.contains('operator')) return true;
}

function isEquals(key) {
    if (key.classList.contains('equals')) return true;
}

function isClear(key) {
    if (key.classList.contains('clear')) return true;
}

buttons.addEventListener('click', e => {
    const button = e.target;
    checkButton(button);
});