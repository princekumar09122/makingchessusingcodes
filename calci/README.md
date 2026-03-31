# Calculator Application

A modern, fully functional calculator built with HTML, CSS, and Vanilla JavaScript. Perfect for beginner-level web development projects.

## Features

### Core Functionality
- ✅ Basic arithmetic operations: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- ✅ Percentage calculation (%)
- ✅ Clear (C) and Delete (⌫) functionality
- ✅ Decimal point support
- ✅ Real-time display of input and results

### Advanced Features
- ✅ **Dark/Light Mode Toggle** - Switch between themes with persistent storage
- ✅ **Calculation History** - View and reuse previous calculations
- ✅ **Keyboard Support** - Full keyboard input for faster calculations
- ✅ **Error Handling** - Handles division by zero and invalid expressions
- ✅ **Responsive Design** - Works perfectly on mobile and desktop

## File Structure

```
New folder/
├── index.html      # HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Calculator logic and functionality
└── README.md       # This file
```

## How to Run

1. Navigate to the project folder
2. Open `index.html` in any modern web browser
3. Start using the calculator!

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| 0-9 | Input numbers |
| . | Decimal point |
| + | Addition |
| - | Subtraction |
| * or x | Multiplication |
| / | Division |
| % | Percentage |
| Enter or = | Calculate result |
| Backspace | Delete last character |
| Escape | Clear all |

## Code Explanation

### HTML (index.html)
- Semantic HTML5 structure
- Data attributes for button actions
- Separate display areas for current and previous operands
- History section for tracking calculations

### CSS (style.css)
- CSS Variables for easy theming
- Flexbox and Grid layouts
- Responsive design with media queries
- Smooth transitions and hover effects
- Dark mode support through class toggling

### JavaScript (script.js)
- Object-oriented approach with Calculator class
- Event listeners for button clicks and keyboard input
- DOM manipulation for dynamic updates
- LocalStorage for theme persistence
- Error handling for edge cases

## Key Concepts Demonstrated

1. **HTML**
   - Semantic elements
   - Data attributes
   - Form-like button structure

2. **CSS**
   - CSS Custom Properties (Variables)
   - Grid and Flexbox layouts
   - Responsive design
   - Transitions and animations
   - Mobile-first approach

3. **JavaScript**
   - ES6 Classes
   - Event handling
   - DOM manipulation
   - Template literals
   - LocalStorage API
   - Array methods
   - Error handling

## Edge Cases Handled

- ❌ Division by zero → Shows error message
- ❌ Multiple decimal points → Prevented
- ❌ Leading zeros → Automatically removed
- ❌ Very long numbers → Limited to 15 digits
- ❌ Floating point precision → Rounded to 8 decimal places
- ❌ Invalid expressions → Error handling with clear message

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Customization Tips

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
    --btn-operator-bg: #ff9f43; /* Change operator color */
    --btn-equal-bg: #0984e3;    /* Change equal button color */
}
```

### Add More Operations
Add new case in `compute()` method in `script.js`:
```javascript
case '^': // Power operation
    result = Math.pow(prev, current);
    break;
```

### Increase History Limit
Change the limit in `addToHistory()` method:
```javascript
if (this.history.length > 20) { // Change 10 to 20
    this.history.pop();
}
```

## Project Submission Tips

For viva/presentation, be prepared to explain:

1. **How event listeners work** - Explain click and keyboard events
2. **DOM manipulation** - How JavaScript updates the display
3. **CSS Grid** - Button layout implementation
4. **Data attributes** - How buttons are identified
5. **Local Storage** - Theme persistence mechanism
6. **Error handling** - Division by zero prevention
7. **Responsive design** - Media queries and mobile support

## Future Enhancements (Optional)

- Scientific calculator functions (sin, cos, tan, log)
- Memory functions (M+, M-, MR, MC)
- Expression editing capability
- Multiple history pages
- Sound effects on button press
- Animation improvements

## License

Free to use for educational purposes.

## Author

Created as a beginner-friendly web development project demonstrating HTML, CSS, and JavaScript fundamentals.
