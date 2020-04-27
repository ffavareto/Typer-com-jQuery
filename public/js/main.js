let tempoInicial = $('#tempo-digitacao').text();
let campo = $('.campo-digitacao');

$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  $('#reiniciar-jogo').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
  let frase = $('.frase').text();
  let numPalavras = frase.split(' ').length;

  let tamanhoFrase = $('#tamanho-frase');
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
  campo.on('input', () => {
    let conteudo = campo.val();

    let qtdPalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(qtdPalavras);

    let qtdCaracteres = conteudo.length;
    $('#contador-caracteres').text(qtdCaracteres);
  });
}

function inicializaCronometro() {
  let tempoRestante = $('#tempo-digitacao').text();
  campo.one('focus', () => {
    let cronometroID = setInterval(() => {
      tempoRestante--;
      $('#tempo-digitacao').text(tempoRestante);
      if (tempoRestante < 1) {
        campo.attr('disabled', true);
        clearInterval(cronometroID);
      }
    }, 1000);
  });
}

$('#reiniciar-jogo').click(reiniciaJogo);

function reiniciaJogo() {
  campo.attr('disabled', false);
  campo.val('');
  $('#contador-palavras').text('0');
  $('#contador-caracteres').text('0');
  $('#tempo-digitacao').text(tempoInicial);
  inicializaCronometro();
}