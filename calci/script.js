/**
 * Calculator Application - JavaScript Logic
 * A fully functional calculator with modern features
 * 
 * Features:
 * - Basic arithmetic operations (+, -, ×, ÷)
 * - Dark/Light mode toggle
 * - Calculation history
 * - Keyboard support
 * - Error handling (division by zero, etc.)
 */

// ============================================
// Calculator Class
// ============================================
class Calculator {
    constructor() {
        // Display elements
        this.currentOperandElement = document.getElementById('current-operand');
        this.previousOperandElement = document.getElementById('previous-operand');
        
        // State variables
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
        
        // History array to store calculations
        this.history = [];
        
        // Initialize the calculator
        this.init();
    }

    /**
     * Initialize event listeners
     */
    init() {
        // Get all buttons and add click event listeners
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtonAction(button);
            });
        });

        // Add keyboard event listener
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });

        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Clear history button
        const clearHistoryBtn = document.getElementById('clear-history');
        clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        // Load saved theme from localStorage
        this.loadTheme();
    }

    /**
     * Handle button click actions
     * @param {HTMLElement} button - The clicked button element
     */
    handleButtonAction(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        // Remove focus from button after click (for keyboard users)
        button.blur();

        switch (action) {
            case 'number':
                this.appendNumber(value);
                break;
            case 'operator':
                this.chooseOperation(value);
                break;
            case 'calculate':
                this.compute();
                break;
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
        }

        // Update the display
        this.updateDisplay();
    }

    /**
     * Handle keyboard input
     * @param {KeyboardEvent} event - The keyboard event
     */
    handleKeyboardInput(event) {
        const key = event.key;

        // Numbers 0-9
        if (/[0-9]/.test(key)) {
            this.appendNumber(key);
            this.animateButton(`[data-value="${key}"]`);
        }
        
        // Decimal point
        if (key === '.') {
            this.appendNumber('.');
            this.animateButton('[data-value="."]');
        }
        
        // Operators
        if (key === '+') {
            this.chooseOperation('+');
            this.animateButton('[data-value="+"]');
        }
        if (key === '-') {
            this.chooseOperation('-');
            this.animateButton('[data-value="-"]');
        }
        if (key === '*' || key === 'x' || key === 'X') {
            this.chooseOperation('×');
            this.animateButton('[data-value="×"]');
        }
        if (key === '/') {
            event.preventDefault(); // Prevent quick find in Firefox
            this.chooseOperation('÷');
            this.animateButton('[data-value="÷"]');
        }
        if (key === '%') {
            this.chooseOperation('%');
            this.animateButton('[data-value="%"]');
        }
        
        // Enter or Equals for calculation
        if (key === 'Enter' || key === '=') {
            event.preventDefault();
            this.compute();
            this.animateButton('[data-action="calculate"]');
        }
        
        // Backspace for delete
        if (key === 'Backspace') {
            this.delete();
            this.animateButton('[data-action="delete"]');
        }
        
        // Escape for clear
        if (key === 'Escape') {
            this.clear();
            this.animateButton('[data-action="clear"]');
        }
        
        // Update display after keyboard input
        this.updateDisplay();
    }

    /**
     * Animate button on keyboard press
     * @param {string} selector - Button selector
     */
    animateButton(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }
    }

    /**
     * Append number or decimal to current operand
     * @param {string} number - The number or decimal to append
     */
    appendNumber(number) {
        // Reset screen if needed (after a calculation)
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }

        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        // Prevent leading zeros (except for decimals)
        if (number === '0' && this.currentOperand === '0') {
            return;
        }

        // Replace initial 0 with number (unless it's a decimal)
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }

        // Limit the length of input
        if (this.currentOperand.length > 15) {
            this.currentOperand = this.currentOperand.slice(0, 15);
        }
    }

    /**
     * Choose operation to perform
     * @param {string} operation - The operator selected
     */
    chooseOperation(operation) {
        // If current operand is empty, don't proceed
        if (this.currentOperand === '') return;

        // If we already have a previous operand, compute first
        if (this.previousOperand !== '') {
            this.compute();
        }

        // Handle percentage operation immediately
        if (operation === '%') {
            const currentValue = parseFloat(this.currentOperand);
            this.currentOperand = (currentValue / 100).toString();
            this.addToHistory(`${currentValue}% = ${this.currentOperand}`);
            return;
        }

        // Store the operation
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * Perform the calculation
     */
    compute() {
        // Check if we have both operands and an operation
        if (this.previousOperand === '' || this.currentOperand === '' || !this.operation) {
            return;
        }

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let result;

        // Check for invalid calculations
        if (isNaN(prev) || isNaN(current)) {
            this.showError('Error');
            return;
        }

        // Perform operation based on the operator
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                // Check for division by zero
                if (current === 0) {
                    this.showError('Cannot divide by 0');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Round to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;

        // Add to history
        const expression = `${prev} ${this.operation} ${current} = ${result}`;
        this.addToHistory(expression);

        // Update current operand with result
        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    /**
     * Clear all values (C button)
     */
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    /**
     * Delete last character (⌫ button)
     */
    delete() {
        // If in error state, clear completely
        if (this.currentOperand === 'Error' || this.currentOperand.includes('Cannot')) {
            this.clear();
            return;
        }

        // If only one character, reset to 0
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.currentOperand = message;
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = true;
        
        // Add error class to display
        const display = document.querySelector('.display');
        display.classList.add('error');
        
        // Remove error class after 2 seconds
        setTimeout(() => {
            display.classList.remove('error');
            this.clear();
            this.updateDisplay();
        }, 2000);
    }

    /**
     * Add calculation to history
     * @param {string} expression - The expression to add
     */
    addToHistory(expression) {
        // Add to beginning of array
        this.history.unshift({
            expression: expression,
            timestamp: new Date()
        });

        // Limit history to 10 items
        if (this.history.length > 10) {
            this.history.pop();
        }

        // Update history display
        this.updateHistoryDisplay();
    }

    /**
     * Update history section in UI
     */
    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        const historyContainer = document.getElementById('history-container');

        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
            historyContainer.classList.remove('show');
        } else {
            historyContainer.classList.add('show');
            historyList.innerHTML = this.history.map((item, index) => 
                `<div class="history-item" data-index="${index}">${item.expression}</div>`
            ).join('');

            // Add click events to history items
            const historyItems = historyList.querySelectorAll('.history-item');
            historyItems.forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.dataset.index);
                    this.loadFromHistory(index);
                });
            });
        }
    }

    /**
     * Load value from history
     * @param {number} index - Index of history item
     */
    loadFromHistory(index) {
        const item = this.history[index];
        if (item) {
            // Extract result from expression (everything after =)
            const parts = item.expression.split('=');
            if (parts.length > 1) {
                this.currentOperand = parts[1].trim();
                this.previousOperand = '';
                this.operation = undefined;
                this.updateDisplay();
            }
        }
    }

    /**
     * Clear all history
     */
    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    /**
     * Toggle between dark and light mode
     */
    toggleTheme() {
        const body = document.body;
        const themeIcon = document.querySelector('#theme-toggle .icon');
        
        body.classList.toggle('dark-mode');
        
        // Change icon based on theme
        if (body.classList.contains('dark-mode')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('calculator-theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('calculator-theme', 'light');
        }
    }

    /**
     * Load saved theme from localStorage
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('calculator-theme');
        const themeIcon = document.querySelector('#theme-toggle .icon');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    /**
     * Update the display with current values
     */
    updateDisplay() {
        // Update current operand
        this.currentOperandElement.textContent = this.formatNumber(this.currentOperand);
        
        // Update previous operand with operation symbol
        if (this.operation != null) {
            this.previousOperandElement.textContent = 
                `${this.formatNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    /**
     * Format number for display (add commas, etc.)
     * @param {string} number - Number to format
     * @returns {string} Formatted number
     */
    formatNumber(number) {
        // Handle error messages
        if (isNaN(parseFloat(number))) {
            return number;
        }

        // Split into integer and decimal parts
        const parts = number.split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1];

        // Format integer part with commas
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        // Reconstruct the number
        if (decimalPart !== undefined) {
            return `${formattedInteger}.${decimalPart}`;
        } else {
            return formattedInteger;
        }
    }
}

// ============================================
// Initialize Calculator when DOM is loaded
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    console.log('Calculator initialized successfully!');
});

// ============================================
// Additional Utility Functions
// ============================================

/**
 * Format date for history items
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Check if a number is valid
 * @param {any} value - Value to check
 * @returns {boolean} True if valid number
 */
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
