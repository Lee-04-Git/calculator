import { CalculatorLogic } from "./CalculatorLogic.js";

export class CalculatorUI {
  constructor(displayEl, buttonGridEl) {
    this.displayEl = displayEl;
    this.buttonGrid = buttonGridEl;
    this.calc = new CalculatorLogic();

    this.buttons = [
      { label: "AC", action: () => this.clear(), class: "btn-func" },
      { label: "±", action: () => this.toggleSign(), class: "btn-func" },
      { label: "%", action: () => this.percentage(), class: "btn-func" },
      { label: "÷", action: () => this.performOperation("÷"), class: "btn-op" },

      { label: "7", action: () => this.inputNumber("7"), class: "btn-number" },
      { label: "8", action: () => this.inputNumber("8"), class: "btn-number" },
      { label: "9", action: () => this.inputNumber("9"), class: "btn-number" },
      { label: "×", action: () => this.performOperation("×"), class: "btn-op" },

      { label: "4", action: () => this.inputNumber("4"), class: "btn-number" },
      { label: "5", action: () => this.inputNumber("5"), class: "btn-number" },
      { label: "6", action: () => this.inputNumber("6"), class: "btn-number" },
      { label: "-", action: () => this.performOperation("-"), class: "btn-op" },

      { label: "1", action: () => this.inputNumber("1"), class: "btn-number" },
      { label: "2", action: () => this.inputNumber("2"), class: "btn-number" },
      { label: "3", action: () => this.inputNumber("3"), class: "btn-number" },
      { label: "+", action: () => this.performOperation("+"), class: "btn-op" },

      {
        label: "0",
        action: () => this.inputNumber("0"),
        class: "btn-number span-2",
      },
      { label: ".", action: () => this.inputDecimal(), class: "btn-number" },
      { label: "=", action: () => this.performOperation("="), class: "btn-op" },
    ];

    this.renderButtons();
    this.updateDisplay();
  }

  // Creates and adds all calculator buttons to the grid
  renderButtons() {
    this.buttons.forEach(({ label, action, class: btnClass }) => {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.onclick = () => {
        action();
        this.updateActiveOperation();
        this.updateDisplay();
      };
      btn.className = btnClass;
      this.buttonGrid.appendChild(btn);
    });
  }

  // Updates the screen with the current value
  updateDisplay() {
    const val = parseFloat(this.calc.getDisplay());
    if (isNaN(val)) {
      this.displayEl.textContent = "0";
    } else if (Math.abs(val) >= 1e9) {
      this.displayEl.textContent = val.toExponential(2);
    } else if (Math.abs(val) >= 1000) {
      this.displayEl.textContent = val.toLocaleString();
    } else {
      this.displayEl.textContent = this.calc.getDisplay();
    }
  }

  // Removes highlight from all operation buttons
  clearActiveOperations() {
    this.buttonGrid
      .querySelectorAll(".btn-op")
      .forEach((btn) => btn.classList.remove("active"));
  }

  // Highlights the active operation button
  updateActiveOperation() {
    this.clearActiveOperations();
    const op = this.calc.getOperation();
    if (op && op !== "=") {
      const btn = [...this.buttonGrid.children].find(
        (b) => b.textContent === op && b.classList.contains("btn-op")
      );
      if (btn) btn.classList.add("active");
    }
  }

  // Passes number input to logic
  inputNumber(num) {
    this.calc.inputNumber(num);
  }

  // Passes decimal input to logic
  inputDecimal() {
    this.calc.inputDecimal();
  }

  // Clears all values
  clear() {
    this.calc.clear();
  }

  // Toggles the sign of current number
  toggleSign() {
    this.calc.toggleSign();
  }

  // Converts current number to percentage
  percentage() {
    this.calc.percentage();
  }

  // Passes operation to logic
  performOperation(op) {
    this.calc.performOperation(op);
  }
}
