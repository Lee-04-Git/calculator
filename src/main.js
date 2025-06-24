import { CalculatorUI } from "./components/CalculatorUI.js";

const displayEl = document.getElementById("display");

const buttonGrid = document.querySelector(".button-grid");

// Create and run the calculator
new CalculatorUI(displayEl, buttonGrid);
