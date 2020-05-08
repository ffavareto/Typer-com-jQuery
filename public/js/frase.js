$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);

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

function buscaFrase() {
  $('#spinner').toggle();
  let fraseId = $('#frase-id').val();
  let dados = { id: fraseId };
  $.get('http://localhost:3000/frases', dados, trocaFrase)
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

function trocaFrase(data) {
  let frase = $('.frase');
  frase.text(data.text);
  atualizaTamanhoFrase();
  atualizaTempoInicial(data.tempo);
}