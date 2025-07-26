const display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousInput = '';
let resetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearAll() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    resetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (resetDisplay) {
        currentInput = number;
        resetDisplay = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (resetDisplay) {
        currentInput = '0.';
        resetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function chooseOperator(nextOperator) {
    if (operator && !resetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = nextOperator;
    resetDisplay = true;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentInput = 'Error';
                updateDisplay();
                clearAll();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = (prev / 100) * current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    resetDisplay = true;
    updateDisplay();
}

document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', () => {
        const text = button.textContent;
        if (button.classList.contains('clear')) {
            clearAll();
        } else if (button.classList.contains('delete')) {
            deleteLast();
        } else if (button.classList.contains('operator')) {
            chooseOperator(text);
        } else if (button.classList.contains('equal')) {
            calculate();
        } else if (button.classList.contains('decimal')) {
            appendDecimal();
        } else {
            appendNumber(text);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === '%') {
        chooseOperator('%');
    }
});
