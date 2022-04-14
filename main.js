// DOM Elements

let resultElement = document.querySelector('#result');
let lengthElement = document.querySelector('#length');
let uppercaseElement = document.querySelector('#uppercase');
let lowercaseElement = document.querySelector('#lowercase');
let numbersElement = document.querySelector('#numbers');
let symbolsElement = document.querySelector('#symbols');
let generateButton = document.querySelector('#generate');
let clipboardButton = document.querySelector('#clipboard');
let snippetButton = document.querySelector('#snippet');
let thankYouButton = document.querySelector('#thank-you');
const modal = document.querySelector("#modal");
const modalContent = document.querySelector('.modal-body')
const span = document.querySelector(".close");
let i = 0;
let txt = 'Thank you for your attention';
let speed = 100;


// Generator and display functions

function init() {
    generateButton.addEventListener('click', displayResult);
    clipboardButton.addEventListener('click', copyPassword);
    clipboardButton.addEventListener('mouseleave', resetTooltipText);
    snippetButton.addEventListener('click', openSnippetModal);
    thankYouButton.addEventListener('click', openThankYouModal);
    span.addEventListener('click', closeModal);
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
        modalContent.innerHTML = '';
        i = 0;
      }
    }
}

function displayResult() {
    const length = +lengthElement.value;
    const hasLower = uppercaseElement.checked;
    const hasUpper = lowercaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;

    resultElement.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
}

function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const types = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        types.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += generateCharacter[funcName]();
        })
    }

    return generatedPassword.slice(0, length);
}

let generateCharacter = {
    lower: getRandomLowerCaseLetter,
    upper: getRandomUpperCaseLetter,
    number: getRandomSingleDigitNumber,
    symbol: getRandomSymbol
}

function getRandomLowerCaseLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function getRandomUpperCaseLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function getRandomSingleDigitNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 + 48));
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)]
}


// Copy password function to clipboard

function copyPassword() {
    const textArea = document.createElement('textarea');
    const password = resultElement.innerText;
    const tooltip = document.querySelector('#tooltiptext');
    tooltip.innerText = `Copied: ${password}`;

    if (!password) {
        tooltip.innerText = 'Nothing to copy.';
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
}

function resetTooltipText() {
  const tooltip = document.querySelector('#tooltiptext');
  tooltip.innerHTML = "Copy to clipboard";
}

// Modal related functions

function openSnippetModal() {
    modalContent.innerHTML = '<img src="snippet.jpg" alt="code-snippet">';
    modal.style.display = "block";

}

function openThankYouModal() {
    modalContent.innerHTML = '<h1 id="thank-you-txt"></h1>';
    modal.style.display = "block";
    typeWriter();
}

function closeModal() {
    modal.style.display = "none";
    modalContent.innerHTML = '';
    i = 0;
}

function typeWriter() {
    const thankYou = document.querySelector("#thank-you-txt");
    if (i < txt.length) {
        thankYou.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

init();
