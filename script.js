const calculator = document.querySelector("#calculator")
const keys = Array.from(calculator.querySelectorAll("button")); 
const display = calculator.querySelector(".result")
const dot = calculator.querySelector("[data-type='dot']")

keys.forEach(key => key.addEventListener("click",main))
keys.forEach(key => key.addEventListener("keydown",main))

function main(e) {
    const key = e.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset
    if (type == "number" ) {
        if (displayValue == "0" || previousKeyType == "operator") {
            display.textContent = keyValue
        } else {
            display.textContent = displayValue + keyValue
        }
    }

    if (type == "operator") {
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
        dot.dataset.haveDot = "false"

    }

    if (type == "equal") {
        // perform a calculations
        const firstNumber = parseFloat(calculator.dataset.firstNumber) 
        const operator =  calculator.dataset.operator
        const secondNumber = parseFloat(displayValue) 
        display.textContent = calculate(firstNumber,operator,secondNumber)
        dot.dataset.haveDot = "false"
        
    }
    if (type == "clear") {
        display.textContent = "0"
        dot.dataset.haveDot = "false"
    }
    if (type == "delete") {
        if (displayValue != "0") {
            display.textContent = displayValue.slice(0, -1)
            if (!display.textContent) {
                display.textContent = "0"
            }
            if (displayValue.slice(-1) == ".") {
                dot.dataset.haveDot = "false"
            }
        } 
    }

    if (type =="dot") {
        if (dot.dataset.haveDot == "false") {
            display.textContent = displayValue + keyValue
            dot.dataset.haveDot = "true"
        }
    } 

    calculator.dataset.previousKeyType = type
}

function calculate(firstNumber,operator,secondNumber) {
    if (operator == "plus") return firstNumber + secondNumber
    if (operator == "minus") return firstNumber - secondNumber
    if (operator == "times") return firstNumber * secondNumber
    if (operator == "divide") return firstNumber / secondNumber
}



