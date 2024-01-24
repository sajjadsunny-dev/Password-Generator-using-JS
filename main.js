// DOM Elements
const outputText = document.querySelector('.outputText');
const passLengthView = document.querySelector('.passLenthView');
const passLengthController = document.querySelector('.passLenth');
const copyClipboard = document.querySelector('.copyClipboard');
const notification = document.querySelector('.notification');

let lowercaseCheck = document.querySelector('#lowercase');
let uppercaseCheck = document.querySelector('#uppercase');
let numberCheck = document.querySelector('#number');
let specialCharacterCheck = document.querySelector('#specialCharacter');

// Character Sets
const characterSets = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  special: '!@#$%^&*-_+=/?'
};

// Default charset
let charset;
if (lowercaseCheck.checked) {
  charset = characterSets.lowercase
} else if (uppercaseCheck.checked) {
  charset = characterSets.uppercase
} else if (numberCheck.checked) {
  charset = characterSets.number
} else {
  charset = characterSets.special
}

// Functions

const updatePassLength = () => {
  passLengthView.textContent = passLengthController.value;
};

const updateCharset = (set, isChecked) => {
  charset = isChecked ? charset + characterSets[set] : charset.replace(characterSets[set], '');
};

const generatePassword = () => {
  const passLength = passLengthView.textContent;
  let password = '';

  for (let i = 0; i < passLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  outputText.textContent = password;
  updateOutputStyles();
};

const updateOutputStyles = () => {
  if (outputText.textContent.length > 0) {
    copyClipboard.style.display = 'block';
    outputText.style.textAlign = 'start';
    outputText.style.color = 'black';
  } else {
    outputText.textContent = 'Please check before generating a password';
    outputText.style.textAlign = 'center';
    outputText.style.color = 'red';
    copyClipboard.style.display = 'none';
  }
};

const copyToClipboard = () => {
  const passwordText = outputText.innerText;
  const textarea = document.createElement('textarea');
  textarea.value = passwordText;

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  showNotification();
};

const showNotification = () => {
  notification.style.transform = 'translate(-50%, -15px) scale(1)';
  setTimeout(() => {
    notification.style.transform = 'translate(-50%, 100%) scale(.7)';
  }, 2000);
};

// Event Listeners
passLengthController.addEventListener('input',()=>{
  updatePassLength();
  generatePassword();
});

lowercaseCheck.addEventListener('change', () => {
  updateCharset('lowercase', lowercaseCheck.checked);
  generatePassword();
});

uppercaseCheck.addEventListener('change', () => {
  updateCharset('uppercase', uppercaseCheck.checked);
  generatePassword();
});

numberCheck.addEventListener('change', () => {
  updateCharset('number', numberCheck.checked);
  generatePassword();
});

specialCharacterCheck.addEventListener('change', () => {
  updateCharset('special', specialCharacterCheck.checked);
  generatePassword();
});

function chechproble() {
  if (!(lowercaseCheck.checked || uppercaseCheck.checked || numberCheck.checked || specialCharacterCheck.checked)) {
    charset = ''
  }
}

copyClipboard.addEventListener('click', copyToClipboard);

// Initialization
chechproble()
updatePassLength();
generatePassword();

const generate = () =>{
  generatePassword()
}