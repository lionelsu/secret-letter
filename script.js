const letterInput = document.querySelector('#carta-texto');
const letterElement = document.querySelector('#carta-gerada');
const btnGenLetter = document.querySelector('#criar-carta');

// Grupos de classes para serem usados nos SPAN
const classes = [
  'newspaper',
  'magazine1',
  'magazine2',
  'medium',
  'big',
  'reallybig',
  'rotateleft',
  'rotateright',
  'skewleft',
  'skewright',
];

// Const para definir propriedades para serem passadas ao style.
const transforms = {
  rotateleft: 'matrix(0.996195, -0.0871557, 0.0871557, 0.996195, 0, 0)',
  rotateright: 'matrix(0.996195, 0.0871557, -0.0871557, 0.996195, 0, 0)',
  skewleft: 'matrix(1, 0, 0.176327, 1, 0, 0)',
  skewright: 'matrix(1, 0, -0.176327, 1, 0, 0)',
};

// Função responsável por popular estas propriedades no html que será usado como var no css
// Tenho forçado um pouco o uso do destructuring
function setStyle() {
  const { style } = document.documentElement;
  Object.entries(transforms).forEach(([prop, value]) => {
    style.setProperty(`--${prop}`, value);
  });
}
setStyle();

// Função de validação, retorna uma mensagem e não faz nada caso o campo de texto esteja vazio.
function validateInput() {
  const inputText = letterInput.value.trim();
  if (!inputText) {
    letterElement.textContent = 'Por favor, digite o conteúdo da carta.';
    return false;
  }
  letterElement.textContent = '';
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

// Função para distribuir as classes dentro dos SPANS
function addRandomClasses(element, classList) {
  const randomIndexClass = Math.floor(Math.random() * classList.length);
  const randomClass = classList[randomIndexClass];
  element.classList.add(randomClass);
}

// Função com o único papel de injetar o texto formatado no paragrafo da carta misteriosa, caso o input esteja com algum valor
function generateLetter() {
  if (!validateInput()) {
    return;
  }
  const formattedText = formatLetter();
  letterElement.innerHTML = formattedText;

  const spans = letterElement.querySelectorAll('span');
  spans.forEach((span) => addRandomClasses(span, classes));
}
btnGenLetter.addEventListener('click', generateLetter);
