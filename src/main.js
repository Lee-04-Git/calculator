import { CalculatorUI } from "./components/CalculatorUI.js";

// Set initial loader state
let isLoading = true;

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const app = document.getElementById("app");

  // Simulate loading state for 1.5 seconds
  setTimeout(() => {
    isLoading = false;

    loader.style.display = "none"; // Hide loader
    app.style.display = "block"; // Show calculator

    // After loader, initialize the calculator
    const displayEl = document.getElementById("display");
    const buttonGrid = document.querySelector(".button-grid");
    new CalculatorUI(displayEl, buttonGrid);
  }, 1500);
});
