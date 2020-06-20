function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a , b) {

    a = parseInt(a);
    b = parseInt(b);

    switch (operator) {
        case '+':
            return add(a, b);
            break;

        case '-':
            return subtract(a, b);
            break;
        
        case '*':
            return multiply(a, b);
            break;

        case '/':
            return divide(a, b);
            break;

        default:
            return "Not a valid operator";
            break;
    }
}

function includesNumber(str) {
    let strArray = str.slice(0);
    if (typeof strArray[0] == Number) {
        return true;
    } else {
        return false;
    }
}

function containsOperator(operator) {
    console.log("Inside containsOperator function");
    switch (operator) {
        case '+':
            console.log("Returned true: +");
            return true;
            break;
        case '-':
            console.log("Returned true: -");
            return true;
            break;

        case '*':
            console.log("Returned true: *");
            return true;
            break;

        case '/':
            console.log("Returned true: /");
            return true;
            break;

        default:
            console.log("Returned false");
            return false;
            break;
    }
}

var place = 0;
var operator = '';
var a = "";
var b = "";

document.getElementById("button-layout").addEventListener('click', (event) => {
    
    let labelElement = document.getElementById("num");
    let labelContent = labelElement.textContent;
    // Checks if input is in fact a number & !NaN
    let parsedNumber = Number(event.target.id);
    if (place <= 2 && parsedNumber == event.target.id) {
        labelElement.textContent += event.target.id;    
        if (place < 2) {
            place = 1;
            a += event.target.id;
        } else if (place == 2) {
            b += event.target.id;
        }
    } else if (place == 1 && containsOperator(event.target.id)) {
        labelElement.textContent += event.target.id;
        place = 2;
        operator = event.target.id;
    } else if (place == 2 && event.target.id == '=') {
        labelElement.textContent += event.target.id;
        let numResult = operate(operator, a, b);
        let labelResult = document.getElementById("result");
        labelElement.textContent += numResult;
        labelResult.textContent = numResult;
        place = 3;
    } else if (place == 2 && containsOperator(event.target.id)) {
        a = operate(operator, a, b);
        b = "";
        place = 2;
        operator = event.target.id;
        labelElement.textContent = a + operator;
    } else if (event.target.id == 'C') {
        place = 0;
        operator = '';
        a = "";
        b = "";
        let labelResult = document.getElementById("result");
        labelResult.textContent = "";
        labelElement.textContent = "";
    }
});