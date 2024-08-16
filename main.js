// Seleciona os elementos do DOM
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const encryptBtn = document.getElementById('encrypt-btn');
const decryptBtn = document.getElementById('decrypt-btn');
const copyBtn = document.getElementById('copy-btn');
const pasteBtn = document.getElementById('paste-btn');
const clearBtn = document.getElementById('clear-btn');
const validationMessage = document.getElementById('validation-message');

// Função para validar o texto
function validateText(text) {
    const regex = /^[a-z\s]*$/;
    return regex.test(text);
}

// Função de criptografia
function encryptText(text) {
    const substitutions = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    // Substitui cada caractere pelo valor correspondente
    return text.split('').map(char => substitutions[char] || char).join('');
}

// Função de descriptografia
function decryptText(text) {
    const substitutions = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    // Substitui cada sequência pelo caractere correspondente
    const regex = new RegExp(Object.keys(substitutions).join('|'), 'g');
    return text.replace(regex, match => substitutions[match]);
}

// Event Listener para o botão de criptografar
encryptBtn.addEventListener('click', () => {
    const text = inputText.value;

    if (validateText(text)) {
        validationMessage.textContent = '';
        outputText.value = encryptText(text);
    } else {
        validationMessage.textContent = 'Apenas letras minúsculas e sem caracteres especiais são permitidos.';
    }
});

// Event Listener para o botão de descriptografar
decryptBtn.addEventListener('click', () => {
    const text = inputText.value;

    if (validateText(text)) {
        validationMessage.textContent = '';
        outputText.value = decryptText(text);
    } else {
        validationMessage.textContent = 'Apenas letras minúsculas e sem caracteres especiais são permitidos.';
    }
});

// Função para copiar o texto
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputText.value);
        alert('Texto copiado para a área de transferência!');
    } catch (err) {
        console.error('Falha ao copiar o texto: ', err);
        alert('Falha ao copiar o texto.');
    }
});

// Função para limpar o campo de entrada
clearBtn.addEventListener('click', () => {
    inputText.value = '';
    validationMessage.textContent = '';
});

// Função para colar o texto da área de transferência no campo de entrada
pasteBtn.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        inputText.value = text;
    } catch (err) {
        console.error('Falha ao colar o texto: ', err);
        alert('Falha ao colar o texto.');
    }
});