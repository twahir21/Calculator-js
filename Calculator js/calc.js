let numberValue = document.querySelectorAll('.numbers');
let screenValue = document.querySelector('.screen');
let resultDisplay = document.querySelector('.result');

// Add blinking animation if screen contains "|"
if (screenValue.innerHTML === "|") {
  screenValue.classList.add('add-animation');
}

// Function to delete the last character
function deleteLastCharacter() {
  let currentText = screenValue.innerHTML;
  if (currentText.length > 1) {
    screenValue.innerHTML = currentText.slice(0, -1); // Remove last character
  } else {
    screenValue.innerHTML = '|';
    screenValue.classList.add('add-animation'); // Re-add animation for "|"
  }
}

// Function to clear the screen (like pressing "AC")
function clearScreen() {
  screenValue.innerHTML = '|';
  screenValue.classList.add('add-animation'); // Re-add animation for "|"
  resultDisplay.innerHTML = '0'; // Display "0" when cleared
}

// Listen to click events
numberValue.forEach(number => 
  number.addEventListener('click', () => {
    if (number.innerHTML === 'AC') {
      // Clear screen and set result display to "0"
      clearScreen();
    } else if (number.innerHTML === 'del') {
      // Perform deletion of last character
      deleteLastCharacter();
    } else {
      // Remove blinking if "|" is replaced
      if (screenValue.innerHTML === '|') {
        screenValue.classList.remove('add-animation');
        screenValue.innerHTML = number.innerHTML;
      } else {
        screenValue.innerHTML += number.innerHTML;
      }

      // When '=' is pressed, evaluate the expression
      if (number.innerHTML === '=') {
        evaluateExpression();
      }
    }
  })
);

// Evaluate the expression in screenValue
function evaluateExpression() {
  // Only slice if the last character is '='
  const expression = screenValue.innerHTML.endsWith('=')
    ? screenValue.innerHTML.slice(0, -1)
    : screenValue.innerHTML;
  
  let calculationResult;

  // Determine the operation type based on the operator in expression
  if (expression.includes('+')) {
    const [num1, num2] = expression.split('+').map(Number);
    calculationResult = num1 + num2;
  } else if (expression.includes('-')) {
    const [num1, num2] = expression.split('-').map(Number);
    calculationResult = num1 - num2;
  } else if (expression.includes('x')) {
    const [num1, num2] = expression.split('x').map(Number);
    calculationResult = num1 * num2;
  } else if (expression.includes('/')) {
    const [num1, num2] = expression.split('/').map(Number);
    calculationResult = num1 / num2;
  }

  // Show the full expression with '=' in screenValue and result separately
  screenValue.innerHTML = `${expression}=`;
  resultDisplay.innerHTML = calculationResult; // Store result separately
}

// Listen to key strikes for numbers, operators, deletion, and clear screen
document.addEventListener('keydown', (event) => {
  const key = event.key;
  
  if (key >= '0' && key <= '9') {
    // Append number to screenValue
    if (screenValue.innerHTML === '|') {
      screenValue.classList.remove('add-animation');
      screenValue.innerHTML = key;
    } else {
      screenValue.innerHTML += key;
    }
  } else if (['+', '-', '*', '/'].includes(key)) {
    // Append operator to screenValue
    screenValue.innerHTML += key === '*' ? 'x' : key;
  } else if (key === 'Enter' || key === '=') {
    // Evaluate on "Enter" or "="
    evaluateExpression();
  } else if (key === 'Backspace') {
    // Delete last character on "Backspace"
    deleteLastCharacter();
  } else if (key === 'c' || key === 'C') {
    // Clear the screen on "c" or "C"
    clearScreen();
  }
});
