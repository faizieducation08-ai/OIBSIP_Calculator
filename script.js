const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalsButton = document.querySelector(".equals");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetScreen = false;

// =====================
// Number Button
// =====================

numberButtons.forEach(button => {

    button.addEventListener("click", () => appendNumber(button.textContent));

});

function appendNumber(number){

    if(currentOperand.textContent === "0" || shouldResetScreen){

        currentOperand.textContent = "";

        shouldResetScreen = false;

    }

    if(number === "." && currentOperand.textContent.includes(".")) return;

    currentOperand.textContent += number;

}

// =====================
// Operator
// =====================

operatorButtons.forEach(button=>{

    button.addEventListener("click",()=>chooseOperator(button.textContent));

});

function chooseOperator(op){

    if(currentOperand.textContent === "") return;

    if(firstNumber !== ""){

        calculate();

    }

    operator = op;

    firstNumber = currentOperand.textContent;

    previousOperand.textContent = `${firstNumber} ${operator}`;

    shouldResetScreen = true;

}

// =====================
// Equal
// =====================

equalsButton.addEventListener("click",calculate);

function calculate(){

    if(operator === "" || shouldResetScreen) return;

    secondNumber = currentOperand.textContent;

    let num1 = parseFloat(firstNumber);

    let num2 = parseFloat(secondNumber);

    let result;

    switch(operator){

        case "+":
            result = num1 + num2;
        break;

        case "-":
            result = num1 - num2;
        break;

        case "×":
            result = num1 * num2;
        break;

        case "÷":

            if(num2 === 0){

                currentOperand.textContent = "Error";

                previousOperand.textContent = "Cannot divide by zero";

                firstNumber="";
                secondNumber="";
                operator="";

                return;

            }

            result = num1 / num2;

        break;

        case "%":
            result = num1 % num2;
        break;

        default:
            return;

    }

    result = Math.round(result * 1000000) / 1000000;

    currentOperand.textContent = result;

    previousOperand.textContent = "";

    firstNumber = result.toString();

    operator = "";

}

// =====================
// Clear
// =====================

clearButton.addEventListener("click",()=>{

    currentOperand.textContent = "0";

    previousOperand.textContent = "";

    firstNumber = "";

    secondNumber = "";

    operator = "";

});

// =====================
// Delete
// =====================

deleteButton.addEventListener("click",()=>{

    if(currentOperand.textContent.length === 1){

        currentOperand.textContent = "0";

    }else{

        currentOperand.textContent = currentOperand.textContent.slice(0,-1);

    }

});

// =====================
// Keyboard Support
// =====================

document.addEventListener("keydown",(e)=>{

    if(!isNaN(e.key)){

        appendNumber(e.key);

    }

    if(e.key==="."){

        appendNumber(".");

    }

    if(["+","-","*","/","%"].includes(e.key)){

        let map={

            "*":"×",

            "/":"÷",

            "+":"+",

            "-":"-",

            "%":"%"

        };

        chooseOperator(map[e.key]);

    }

    if(e.key==="Enter"){

        calculate();

    }

    if(e.key==="Backspace"){

        deleteButton.click();

    }

    if(e.key==="Escape"){

        clearButton.click();

    }

});

// =====================
// Theme Toggle
// =====================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.innerHTML='<i class="bi bi-sun-fill"></i>';

    }else{

        themeBtn.innerHTML='<i class="bi bi-moon-stars-fill"></i>';

    }

});