// Manipulador de carrossel e inatividade
const TEMPO_INATIVIDADE = 3000; // 3 segundos
const IMAGENS_PROMOCAO = [
    'https://source.unsplash.com/800x600/?coffee&sig=1',
    'https://source.unsplash.com/800x600/?coffee&sig=2',
    'https://source.unsplash.com/800x600/?coffee&sig=3'
];

let temporizadorInatividade;

function iniciarTemporizador() {
    clearTimeout(temporizadorInatividade);
    temporizadorInatividade = setTimeout(mostrarCarrossel, TEMPO_INATIVIDADE);
}

function mostrarCarrossel() {
    console.warn("mostrando carrossel");

    const sobreposicao = document.getElementById('overlay-carrossel');
    if (!sobreposicao) return;
    sobreposicao.style.display = 'flex';
    let index = 0;
    const img = sobreposicao.querySelector('img');
    if (img) img.src = IMAGENS_PROMOCAO[index];
    const interval = setInterval(() => {
        index = (index + 1) % IMAGENS_PROMOCAO.length;
        if (img) img.src = IMAGENS_PROMOCAO[index];
    }, 3000);

    function fechar() {
        sobreposicao.style.display = 'none';
        window.location.href = '/';
        clearInterval(interval);
        sobreposicao.removeEventListener('click', fechar);
    }

    sobreposicao.addEventListener('click', fechar);
}

function reiniciarTemporizador() {
    iniciarTemporizador();
}

document.addEventListener('DOMContentLoaded', () => {
    ['mousemove', 'mousedown', 'keydown', 'touchstart'].forEach(evt => {
        document.addEventListener(evt, reiniciarTemporizador);
    });
    iniciarTemporizador();
});
export { iniciarTemporizador, mostrarCarrossel };