$('#botao-frase').click(fraseAleatoria);

function fraseAleatoria() {
  $('#spinner').toggle();

  $.get('http://localhost:3000/frases', trocaFraseAleatoria)
    .fail(() => {
      $('#erro').toggle();
      setTimeout(() => {
        $('#erro').toggle();
      }, 4000);
    })

    .always(() => {
      $('#spinner').toggle();
    });
}

function trocaFraseAleatoria(data) {
  let frase = $('.frase');
  let numAleatorio = Math.floor(Math.random() * data.length);
  frase.text(data[numAleatorio].texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data[numAleatorio].tempo);
}