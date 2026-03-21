let errorMessage = document.getElementById('error-msg');
let wordInput = document.getElementById('word-input');
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const speakerIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 24px; height: 24px;">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.707-1.59-1.59V9.84c0-.88.71-1.59 1.59-1.59h2.24Z" />
</svg>`;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
    document.getElementById(screenId).style.display = 'block';
}

async function handleSearch() {
    let word = wordInput.value.trim();
    if (!word) return;

    try {
        const response = await fetch(` ${DICTIONARY_API}${word}`);
        console.log(word)
        if (!response.ok) {
            errorMessage.textContent = 'Word not found';
            errorMessage.classList.add('error-text');
            return;
        }
        const data = await response.json();
        displayResult(data[0]);
        showScreen('result-screen');
        
    } catch (err) {
        errorMessage.textContent = 'Check your internet connection and try again';
        errorMessage.classList.add('network-err');
        setTimeout(() => {
            errorMessage.textContent = '';
            errorMessage.classList.remove('network-err');
        }, 5000);
    }
};
    wordInput.addEventListener('focus', () => {
    errorMessage.textContent = '';
    });

function displayResult(data) {
    const display = document.getElementById('word-display');

    const meaning = data.meanings[0];
    const definition = meaning.definitions[0].definition;
    const partOfSpeech = meaning.partOfSpeech;

    const phoneticObj = data.phonetics.find(p => p.text);
    const phoneticText = phoneticObj ? phoneticObj.text : '';

    const audioObj = data.phonetics.find(p => p.audio);
    const audioUrl = audioObj ? audioObj.audio : '';

display.innerHTML = `
 <h2 style="color: #3b82f6">${data.word}</h2>
 ${audioUrl ? `<button onclick="new Audio('${audioUrl}').play()" class="icon-btn">
 ${speakerIcon}</button>` : ''}
  ${phoneticText ? `<p><i>
  ${phoneticText}</i></p>` : ''}
 <p><i>${partOfSpeech}</i></p>
 <p>${definition}</p>
    `;
}
showScreen('search-screen');