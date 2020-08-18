let secondNum = false;
let num1 = 0;
let num2 = 0;
let operator = '';
let cleanSlate = true;
let multiOp = false;
let equalsPressed = false;
let decimal = false;

function removeExcessZeroes(answer) {
    array = answer.split("");
    for (let i = array.length - 1; i > 0; i--){
        if(array[i] === '0' || array[i] === '.'){
            array.pop();
            console.log(array);
        }
        else {
            return array.join('');
        }
    }
}

function removeCharacter(input) {
    array = input.split("");
    array.pop();
    array = array.join('');
    return array;
}

function add(num1, num2) {
    let answer = num1 + num2;
    if(answer % 1 === 0){
        return answer;
    } else {
        return removeExcessZeroes(answer.toFixed(11));
    }
};

function subtract(num1, num2) {
    let answer = num1 - num2;
    if(answer % 1 === 0){
        return answer;
    } else {
        return removeExcessZeroes(answer.toFixed(11));
    }
};

function multiply(num1, num2) {
    let answer = num1 * num2;
    if(answer % 1 === 0){
        return answer;
    } else {
        return removeExcessZeroes(answer.toFixed(11));
    }
};

function divide (num1, num2) {
    if(num2 == 0){
        return "Does not compute";
    }
    let answer = num1 / num2;
    if(answer % 1 === 0){
        return answer;
    } else {
        return removeExcessZeroes(answer.toFixed(11));
    }
};

function operate(num1, operator, num2) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
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
    }

    if(isDecimal(key)) {
        if(screen.value == ''){
            screen.value = '0.';
        } else {
            if(!decimal){
                screen.value += key.id;
                decimal = true;
            } else {
                return;
            }
        }
    }

    if(isOperator(key)) {
        decimal = false;
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
            num2 = 0;
        }
    }

    if(isEquals(key)) {
        if(num1 == 0 || operator == '') {
            return;
        }
        decimal = false;
        num1 = Number(num1);
        num2 = Number(num2);
        screen.value = operate(num1, operator, num2);
        num1 = Number(screen.value);
        num2 = 0;
        equalsPressed = true;
    }

    if(isClear(key)) {
        num1 = 0;
        num2 = 0;
        screen.value = '';
        cleanSlate = true;
        multiOp = false;
        equalsPressed = false;
        decimal = false;
    }

    if(isDelete(key)) {
        screen.value = removeCharacter(screen.value);
        if(cleanSlate) {
            num1 = screen.value;
        } else {
            num2 = screen.value;
        }
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

function isDelete(key) {
    if(key.classList.contains('delete')) return true;
}

buttons.addEventListener('click', e => {
    const button = e.target;
    checkButton(button);
});