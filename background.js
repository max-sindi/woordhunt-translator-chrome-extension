const doc = document;
const { body } = doc;

const input = createElement('input');
input.type = 'text';
input.classList.add('input');


const inputContainer = createElement('div');
const resultContainer = createElement('div');
inputContainer.appendChild(input);

body.appendChild(inputContainer);
body.appendChild(resultContainer);

const inp = body.querySelector('.input');
inp.focus();

inp.addEventListener('input', function (e) {
  getTips(e.target.value);
})

function getTips(letters) {

  fetch(`https://wooordhunt.ru/get_tips.php?abc=${letters}`)
    .then(res => {
      res.json().then(res => {
        const { tips } = res;
        resultContainer.innerHTML = '';

        tips.forEach(item => {
          const { w, t } = item;
          const resultItemDiv = createElement('div', null, `<strong class="result-word">${w}:</strong> ${t}`);
          resultItemDiv.classList.add('result-item');
          resultContainer.appendChild(resultItemDiv);
        })
      });
    });
}




function createElement(htmlTag, styles, content ) {
  const newElem = doc.createElement(htmlTag);
  if(content) {
    newElem.innerHTML = content;
  }

  styles && applyStyles(newElem, styles);

  return newElem;
}


// styles params must be an object "width: '10px,'"
function applyStyles(element, styles) {
  for( let key in styles) {
    element.style[key] = styles[key];
  }
}
