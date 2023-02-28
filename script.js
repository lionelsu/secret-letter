const letterInput = document.querySelector('#carta-texto');
const letterElement = document.querySelector('#carta-gerada');
const btnGenLetter = document.querySelector('#criar-carta');
const wordCount = document.querySelector('#carta-contador');
function selectorFactory() {
  const spans = letterElement.querySelectorAll('span');
  return {
    spans,
  };
}
// Grupos de classes para serem usados nos SPAN
const classes = {
  style: ['newspaper', 'magazine1', 'magazine2'],
  size: ['medium', 'big', 'reallybig'],
  rotation: ['rotateleft', 'rotateright'],
  skew: ['skewleft', 'skewright'],
};

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

// Função auxiliar para dividir as palavras em um array
const splitWords = () => letterInput.value.split(' ');

// Função para formatação da carta, adiciona as palavras do input em um array de spans
function formatLetter() {
  const words = splitWords();
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

// Função para gerar as classes aleatórias para usar nos spans
function generateRandomClasses(classList) {
  return Object.values(classList).map((group) => {
    const randomIndex = Math.floor(Math.random() * group.length);
    const randomClass = group[randomIndex];
    return randomClass;
  });
}

// Função auxiliar que será usada para espalhar as propriedades das classes ao span
function randomClassesToSpan(span) {
  const randomClasses = generateRandomClasses(classes);
  span.classList.add(...randomClasses);
}

// Função que vai injetar as classes geradas dentro dos SPANS
function addRandomClass() {
  const { spans } = selectorFactory();
  spans.forEach((span) => {
    randomClassesToSpan(span);
  });
}

// Função auxiliar para adicionar um escutador aos cliques realizados diretamente no span da carta gerada
function addClickToSpan() {
  const { spans } = selectorFactory();
  spans.forEach((span) => {
    span.addEventListener('click', () => {
      const spanClasses = span;
      spanClasses.className = '';
      randomClassesToSpan(span);
    });
  });
}

// Função para contar palavras e exibir na tela
function wordCounter() {
  const words = splitWords();
  wordCount.textContent = words.length;
}

// Função principal do modulo, sua função além de gerar a carta é validar o input e chamar as principais funções de renderização. O nome desta função seria init, mas como ela tem uma responsabilidade em conjunto com outras, seu nome ficou este mesmo.
function generateLetter() {
  setStyle();
  if (!validateInput()) {
    return;
  }
  letterElement.innerHTML = formatLetter();
  addRandomClass();
  addClickToSpan();
  wordCounter();
}
btnGenLetter.addEventListener('click', generateLetter);
