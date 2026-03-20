let errorMessage = document.getElementById('error-msg');
let wordInput = document.getElementById('word-input');
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';


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
        console.log(data)
        displayResult(data[0]);
        showScreen('result-screen');
        
    } catch (err) {
        errorMessage.textContent = 'Check your internet connection and try again';
        errorMessage.classList.add('network-err');
        setTimeout(() => {
            
            errorMessage.classList.remove('network-err');
        }, 1000);
    }
}
