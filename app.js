const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

const btnContainer = document.querySelector(".buttons-container");

let currOperand = "";
let previousOperand = "";
let operation = "";

let equalOrPercentPressed = false;

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    appendNumber(e.target.textContent);
    updatedisplay();
  }

  if (e.target.classList.contains("operator")) {
    choseOperator(e.target.textContent);
    updatedisplay();
  }
  if (e.target.classList.contains("ac")) {
    previousOperand = "";
    currOperand = "";
    operation = "";
    updatedisplay();
  }
  if (e.target.classList.contains("pm")) {
    if (!currOperand) return;
    currOperand *= -1;
    updatedisplay();
  }
  if (e.target.classList.contains("percent")) {
    if (!currOperand) return;
    currOperand = currOperand / 100;
    updatedisplay();
    equalOrPercentPressed = true;
  }
  if (e.target.classList.contains("equal")) {
    calculate();
    updatedisplay();
    equalOrPercentPressed = true;
  }
});

const appendNumber = (num) => {
  if (currOperand === "0" && num === "0") return;
  if (currOperand.includes(".") && num === ".") return;
  if (currOperand === '0' && num !== '.') {
    currOperand = num;
    return;
  }
  if (currOperand.length > 10) return;
  
  if (equalOrPercentPressed) {
    currOperand = num;
    equalOrPercentPressed = false;
    return;
  }
  currOperand += num;
};

const updatedisplay = () => {
  if (currOperand.toString().length > 11) {
    currOperand = Number(currOperand).toExponential(3);
  }
  currDisp.textContent = currOperand;
  prevDisp.textContent = `${previousOperand} ${operation}`;
};

const choseOperator = (op) => {
  if (previousOperand) {
    calculate();
  }
  operation = op;
  previousOperand = currOperand;
  currOperand = '';
};

const calculate = () => {
  let calculation = 0;
  const current = Number(currOperand);
  const prev = Number(previousOperand);
  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "x":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
    default:
      break;
  }
  currOperand = calculation;

  previousOperand = '';
  operation = '';
};
