export class CalculatorLogic {
  constructor() {
    this.display = "0";
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  // Handles number input
  inputNumber(num) {
    if (this.waitingForOperand) {
      this.display = String(num);
      this.waitingForOperand = false;
    } else {
      this.display = this.display === "0" ? String(num) : this.display + num;
    }
  }

  // Handles decimal input
  inputDecimal() {
    if (this.waitingForOperand) {
      this.display = "0.";
      this.waitingForOperand = false;
    } else if (!this.display.includes(".")) {
      this.display += ".";
    }
  }

  // Resets the calculator
  clear() {
    this.display = "0";
    this.previousValue = null;
    this.operation = null;
    this.waitingForOperand = false;
  }

  // Toggles the sign (+/-)
  toggleSign() {
    this.display = String(parseFloat(this.display) * -1);
  }

  // Converts value to percentage
  percentage() {
    this.display = String(parseFloat(this.display) / 100);
  }

  // Performs a math calculation
  calculate(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "×":
        return a * b;
      case "÷":
        return a / b;
      case "=":
        return b;
      default:
        return b;
    }
  }

  // Handles operation logic (+, -, ×, ÷, =)
  performOperation(nextOp) {
    const inputValue = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const result = this.calculate(
        this.previousValue,
        inputValue,
        this.operation
      );
      this.display = String(result);
      this.previousValue = result;
    }

    this.waitingForOperand = true;
    this.operation = nextOp;
  }

  // Returns the display value
  getDisplay() {
    return this.display;
  }

  // Returns the current operation
  getOperation() {
    return this.operation;
  }
}
