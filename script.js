
const currentOperand = document.getElementById("current-operand");
const previousOperand = document.getElementById("previous-operand");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let firstOperand = null;
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
    currentOperand.textContent = currentInput;
}

function calculate() {
    if (firstOperand === null || operator === null) {
        return;
    }

    const secondOperand = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstOperand + secondOperand;
            break;

        case "-":
            result = firstOperand - secondOperand;
            break;

        case "*":
            result = firstOperand * secondOperand;
            break;

        case "/":
            if (secondOperand === 0) {
                currentInput = "Cannot divide by zero";
                firstOperand = null;
                operator = null;
                previousOperand.textContent = "";
                shouldResetScreen = true;
                updateDisplay();
                return;
            }
            result = firstOperand / secondOperand;
            break;

        default:
            return;
    }

    currentInput = String(Number(result.toFixed(10)));
    firstOperand = null;
    operator = null;
    previousOperand.textContent = "";
    shouldResetScreen = true;
    updateDisplay();
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent.trim();

        if (!isNaN(value) && value !== "") {
            if (shouldResetScreen) {
                currentInput = value;
                shouldResetScreen = false;
            } else if (currentInput === "0") {
                currentInput = value;
            } else {
                currentInput += value;
            }
        }

        else if (value === "AC") {
            currentInput = "0";
            firstOperand = null;
            operator = null;
            shouldResetScreen = false;
            previousOperand.textContent = "";
        }

        else if (value === "DEL") {
            if (shouldResetScreen) {
                currentInput = "0";
                shouldResetScreen = false;
            } else {
                currentInput = currentInput.slice(0, -1);

                if (currentInput === "" || currentInput === "-") {
                    currentInput = "0";
                }
            }
        }

        else if (value === ".") {
            if (shouldResetScreen) {
                currentInput = "0";
                shouldResetScreen = false;
            }

            if (!currentInput.includes(".")) {
                currentInput += ".";
            }
        }

        else if (value === "±") {
            if (currentInput !== "0") {
                currentInput = String(Number(currentInput) * -1);
            }
        }

        else if (value === "%") {
            currentInput = String(Number(currentInput) / 100);
        }

        else if (
            value === "+" ||
            value === "-" ||
            value === "*" ||
            value === "/"
        ) {
            if (firstOperand !== null && operator !== null && !shouldResetScreen) {
                calculate();
            }

            firstOperand = Number(currentInput);
            operator = value;

            previousOperand.textContent = currentInput + " " + operator;
            currentInput = "0";
            shouldResetScreen = false;
        }

        else if (value === "=") {
            calculate();
        }

        updateDisplay();
    });
});

updateDisplay();
