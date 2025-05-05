alert("Js Conectad")
const palavras = ["grau", "javascript", "forca", "tecnico", "programador"];
let palavraAtual = "";
let letrasCorretas = [];
let letrasErradas = [];
let tentativasRestantes = 6;

const displayPalavra = document.getElementById("palavra-secreta");
const inputLetra = document.getElementById("letra");
const letrasErradasEl = document.getElementById("letras-erradas");
const tentativasEl = document.getElementById("tentativas");
const mensagemEl = document.getElementById("mensagem");

document.getElementById("verificar").addEventListener("click", verificarLetra);
document.getElementById("novo-jogo").addEventListener("click", novoJogo);
function escolherPalavra() {
    const index = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[index];
    letrasCorretas = [];
    letrasErradas = [];
    tentativasRestantes = 6;
    atualizarTela();
}
function atualizarTela() {
    const display = palavraAtual
        .split("")
        .map(letra => letrasCorretas.includes(letra) ? letra : "_")
        .join(" ");
    displayPalavra.textContent = display;
    letrasErradasEl.textContent = letrasErradas.join(", ");
    tentativasEl.textContent = tentativasRestantes;
    mensagemEl.textContent = "";
    mensagemEl.className = "";
}

function verificarLetra() {
    const letra = inputLetra.value.toLowerCase();
    inputLetra.value = "";

    if (!letra || letra.length !== 1 || !/^[a-záéíóúâêîôûãõç]$/i.test(letra)) return;

    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) {
        alert("Letra já usada!");
        return;
    }

    if (palavraAtual.includes(letra)) {
        letrasCorretas.push(letra);
    } else {
        letrasErradas.push(letra);
        tentativasRestantes--;
    }

    atualizarTela();
    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    const venceu = palavraAtual.split("").every(letra => letrasCorretas.includes(letra));
    if (venceu) {
        mensagemEl.textContent = "Parabéns! Você venceu!";
        mensagemEl.className = "vitoria";
        desativarJogo();
    } else if (tentativasRestantes === 0) {
        mensagemEl.textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
        mensagemEl.className = "derrota";
        desativarJogo();
    }
}

function desativarJogo() {
    inputLetra.disabled = true;
    document.getElementById("verificar").disabled = true;
}

function novoJogo() {
    inputLetra.disabled = false;
    document.getElementById("verificar").disabled = false;
    escolherPalavra();
    inputLetra.focus();
}

escolherPalavra();