// Get the calculator display
const display = document.querySelector(".display");

// make long numbers smaller to fit on the display
function updateDisplay(value) {
    display.textContent = value;
    if (value.toString().length > 10) {
        display.style.fontSize = "20px";
    } else {
        display.style.fontSize = "30px";
    }
}
// Get all the calculator buttons
const buttons = document.querySelectorAll(".buttons button");
// Store the numbers and operator
let firstNumber = "";
let operator = "";
let secondNumber = "";
// Remember the previous result
let lastOperator = "";
let lastNumber = "";
// Go through every button
buttons.forEach(function (button) {
    // Run this code when a button is clicked
    button.addEventListener("click", function () {
        // Get the text written on the button
        const value = button.textContent;

        // show which button was clicked
        console.log("you clicked: " + value);

        // If the button is AC, clear everything
        if (value === "AC") {

            // Clear the first number
            firstNumber = "";

            // Clear the operator
            operator = "";

            // Clear the second number
            secondNumber = "";

            // clear the previous calculation
            lastOperator = "";
            lastNumber = "";

            // Reset the display
            updateDisplay("0");
        }

        // Remove the last digit
        else if (value === "⌫") {
            if (operator === "") {
                firstNumber = firstNumber.slice(0, -1);
                updateDisplay(firstNumber || "0");
            } else {
                secondNumber = secondNumber.slice(0, -1);
                updateDisplay(secondNumber || "0");
            }
        }
        // Change the number from positive to negative
        else if (value === "+/-") {
            if (operator === "") {
                if (firstNumber !== "") {
                    firstNumber = (parseFloat(firstNumber) * -1).toString();
                    updateDisplay(firstNumber);
                }
            } else {
                if (secondNumber !== "") {
                    secondNumber = (parseFloat(secondNumber) * -1).toString();
                    updateDisplay(secondNumber);
                }
            }
        }
        // Convert the current number to a percentage
        else if (value === "%") {
            if (operator === "") {
                if (firstNumber !== "") {
                    firstNumber = (parseFloat(firstNumber) / 100).toString();
                    updateDisplay(firstNumber);
                }
            } else {
                if (secondNumber !== "") {
                    secondNumber = (parseFloat(secondNumber) / 100).toString();
                    updateDisplay(secondNumber);
                }
            }
        }
        // Check if the button is a number
        else if (!isNaN(value)) {
            // If we have not selected an operator yet
            if (operator === "") {
                firstNumber += value;
                updateDisplay(firstNumber);
            } else {
                secondNumber += value;
                updateDisplay(secondNumber);
            }
        }
        // Check if the decimal button was clicked
        else if (value === ".") {
            // Add decimal to the first number
            if (operator === "") {
                // Only allow one decimal point
                if (!firstNumber.includes(".")) {
                    firstNumber += ".";
                    updateDisplay(firstNumber);
                }
            } else {
                // Add decimal to the second number
                if (!secondNumber.includes(".")) {
                    secondNumber += ".";
                    updateDisplay(secondNumber);
                }
            }
        }
        // Check if the button is an operator
        else if (
            value === "+" ||
            value === "-" ||
            value === "×" ||
            value === "÷"
        ) {
            // only choose an operator if we have a number
            if (firstNumber !== "") {

                // Ignore an operator if the first number is incomplete
                if (firstNumber === "." || firstNumber === "-.") {
                    return;
                }

                // if both numbers exist, calculate first
                if (secondNumber !== "") {

                    const number1 = parseFloat(firstNumber);
                    const number2 = parseFloat(secondNumber);
                    let result;

                    if (operator === "+") {
                        result = number1 + number2;
                    } else if (operator === "-") {
                        result = number1 - number2;
                    } else if (operator === "×") {
                        result = number1 * number2;
                    } else if (operator === "÷") {
                        if (number2 === 0) {
                            updateDisplay("Cannot divide by zero");

                            firstNumber = "";
                            secondNumber = "";
                            operator = "";

                            lastOperator = "";
                            lastNumber = "";

                            return;
                        } else {
                            result = number1 / number2;
                        }
                    }

                    // round long decimal results
                    result = parseFloat(result.toFixed(8));

                    // save the result
                    firstNumber = result.toString();
                    secondNumber = "";

                    // display the result
                    updateDisplay(result);
                }

                // save the operator
                operator = value;
            }
        }
        // If the equals button is clicked
        else if (value === "=") {
            // If there is no second number, repeat the last operation
            if (secondNumber === "" && lastOperator !== "" && lastNumber !== "") {
                operator = lastOperator;
                secondNumber = lastNumber;
            }
            // Make sure we have everything needed
            if (firstNumber === "" || secondNumber === "" || operator === "") {
                return;
            }
            // Convert our numbers from text to numbers
            const number1 = parseFloat(firstNumber);
            const number2 = parseFloat(secondNumber);
            let result;
            // Perform the calculation
            if (operator === "+") {
                result = number1 + number2;
            } else if (operator === "-") {
                result = number1 - number2;
            } else if (operator === "×") {
                result = number1 * number2;
            } else if (operator === "÷") {
                // Check if we are dividing by zero
                if (number2 === 0) {
                    result = "Cannot divide by zero";
                } else {
                    result = number1 / number2;
                }
            }
            // Remember the operation
            lastOperator = operator;
            lastNumber = secondNumber;
            // Show the answer
            if (typeof result === "number" && Number.isFinite(result)) {
                result = parseFloat(result.toFixed(8));
            }
            // show the answer
            updateDisplay(result);
            //if there was an error, reset the calculator
            if (result === "Cannot divide by zero") {
                firstNumber = "";
                secondNumber = "";
                operator = "";

                lastOperator = "";
                lastNumber = "";
            } {
                firstNumber = result.toString();
                secondNumber = "";
                operator = "";
            }

        }

    });

});

// Allow keyboard input
document.addEventListener("keydown", function (event) {

    // Get the key pressed
    const key = event.key;

    // Ignore keyboard shortcuts using Ctrl, Alt, or Meta
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    // Match keyboard keys to calculator buttons
    const keyMap = {
        "Enter": "=",
        "Escape": "AC",
        "Backspace": "⌫",
        "*": "×",
        "/": "÷",
        "-": "-",
        "+": "+",
        ".": ".",
        ",": ".",
        "%": "%"
    };

    // Convert the key to a calculator button value
    const buttonValue = keyMap[key] || key;

    // Find the matching calculator button
    const buttons = document.querySelectorAll(".buttons button");

    // Click the matching button
    buttons.forEach(function (button) {
        if (button.textContent.trim() === buttonValue) {
            event.preventDefault();
            button.click();
        }
    });

});