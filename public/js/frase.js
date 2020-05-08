$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
  $.get('http://localhost:3000/frases', trocaFraseAleatoria);
}

function trocaFraseAleatoria(data) {
  let frase = $('.frase');
  let numAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numAleatorio].tempo);
}