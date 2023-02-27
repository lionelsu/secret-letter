const letterInput = document.querySelector('#carta-texto');
const letterElement = document.querySelector('#carta-gerada');
const btnGenLetter = document.querySelector('#criar-carta');

// Função de validação, retorna uma mensagem e não faz nada caso o campo de texto esteja vazio.
function validateInput() {
  const inputText = letterInput.value.trim();
  if (!inputText) {
    letterElement.textContent = 'Por favor, digite o conteúdo da carta.';
    return false;
  }
  return true;
}

// Função para formatação da carta, adiciona as palavras do input em um array de spans
function formatLetter() {
  const words = letterInput.value.split(' ');
  const formattedWords = [];
  for (let index = 0; index < words.length; index += 1) {
    const word = words[index].trim();
    if (word) {
      formattedWords.push(`<span>${word}</span>`);
    }
  }
  const formattedText = formattedWords.join(' ');

  return formattedText;
}

// Função com o único papel de injetar o texto formatado no paragrafo da carta misteriosa, caso o input esteja com algum valor
function generateLetter() {
  if (!validateInput()) {
    return;
  }
  const formattedText = formatLetter();
  letterElement.innerHTML = formattedText;
}
btnGenLetter.addEventListener('click', generateLetter);
