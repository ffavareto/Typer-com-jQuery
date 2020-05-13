let tempoInicial = $('#tempo-digitacao').text();
let campo = $('.campo-digitacao');

$(function () {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $('#reiniciar-jogo').click(reiniciaJogo);
  atualizaPlacar();
});

function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $('#tempo-digitacao').text(tempo);
}

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
  campo.one('focus', () => {
    let tempoRestante = $('#tempo-digitacao').text();
    let cronometroID = setInterval(() => {
      tempoRestante--;
      $('#tempo-digitacao').text(tempoRestante);
      if (tempoRestante < 1) {
        clearInterval(cronometroID);
        finalizaJogo();
      }
    }, 1000);
  });
}

function finalizaJogo() {
  campo.attr('disabled', true);
  campo.toggleClass('campo-desativado');
  inserePlacar();
}

function inicializaMarcadores() {
  campo.on('input', () => {
    let frase = $('.frase').text();
    let digitado = campo.val();
    let comparavel = frase.substr(0, digitado.length);

    if (digitado == comparavel) {
      campo.addClass('campo-correto');
      campo.removeClass('campo-incorreto');
    } else {
      campo.addClass('campo-incorreto');
      campo.removeClass('campo-correto');
    }
  });
}

function reiniciaJogo() {
  campo.attr('disabled', false);
  campo.val('');
  $('#contador-palavras').text('0');
  $('#contador-caracteres').text('0');
  $('#tempo-digitacao').text(tempoInicial);
  inicializaCronometro();
  campo.toggleClass('campo-desativado');
  campo.removeClass('campo-incorreto');
  campo.removeClass('campo-correto');
}