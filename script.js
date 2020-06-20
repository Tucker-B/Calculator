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
    // Catches dividing by zero
    if (b == 0) {
        return "Can't divide by 0.";
    } else {
        return a / b;
    }
}

function operate(operator, a , b) {
    // a & b come in as strings, so parse them as numbers/floats
    a = parseFloat(a);
    b = parseFloat(b);

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
// Checks whether current input is an operator
function containsOperator(operator) {
    switch (operator) {
        case '+':
            return true;
            break;
        case '-':
            return true;
            break;

        case '*':
            return true;
            break;

        case '/':
            return true;
            break;

        default:
            return false;
            break;
    }
}
// Keeps track of where in the equation we are. E.g. first num = 1, operator = 2, second num then '=' = 3
var place = 0;
// Operator for equation: '+', '-', '*', or '/'
var operator = '';
// First number in equation
var a = "";
// Second number in equation
var b = "";

document.getElementById("button-layout").addEventListener('click', (event) => {
    
    let labelElement = document.getElementById("num");
    let labelContent = labelElement.textContent;
    // Checks if input is in fact a number & !NaN
    let parsedNumber = Number(event.target.id);
    // Also checks if next input contains a decimal
    if (place <= 2 && (parsedNumber == event.target.id || event.target.id == '.')) {
        labelElement.textContent += event.target.id;    
        if (place < 2) {
            place = 1;
            a += event.target.id;
        } else if (place == 2) {
            b += event.target.id;
        }
    // Checks if input is an operator and if the equation only has 1 number, a
    } else if (place == 1 && containsOperator(event.target.id)) {
        labelElement.textContent += event.target.id;
        place = 2;
        operator = event.target.id;
    // Checks if equation has 2 numbers & an operator, and if user clicked '=' or if dividing by 0
    } else if (place == 2 && (event.target.id == '=' || (operator == '/' && b == '0'))) {
        labelElement.textContent += '=';
        let numResult = operate(operator, a, b);
        let labelResult = document.getElementById("result");
        labelElement.textContent += numResult;
        labelResult.textContent = numResult;
        place = 3;
    // Allows additional operator(s) and therefore longer equations
    // Checks if equation already has 2 numbers, an operator, and if input is another operator
    } else if (place == 2 && containsOperator(event.target.id) && b != "") {
        a = operate(operator, a, b);
        b = "";
        place = 2;
        operator = event.target.id;
        labelElement.textContent = a + operator;
    // If user clicks 'C' Button, clear equation and labels
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