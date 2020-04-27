let tempoInicial = $('#tempo-digitacao').text();
let campo = $('.campo-digitacao');

$(() => {
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
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
        campo.toggleClass('campo-desativado');
      }
    }, 1000);
  });
}

function inicializaMarcadores() {
  let frase = $('.frase').text();
  campo.on('input', () => {
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