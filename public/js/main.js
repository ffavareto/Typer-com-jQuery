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

function inserePlacar() {
  let corpoTabela = $('.placar').find('tbody');
  let usuario = 'Lucas'
  let numPalavras = $('#contador-palavras').text();

  let linha = novaLinha(usuario, numPalavras);
  linha.find('.botao-remover').click(removelinha);

  corpoTabela.prepend(linha);
}

function novaLinha(usuario, palavras) {
  let linha = $('<tr>');
  let colunaUsuario = $('<td>').text(usuario);
  let colunaPalavras = $('<td>').text(palavras);
  let colunaRemover = $('<td>');

  let link = $('<a>').attr('href', '#').addClass('botao-remover');
  let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

  link.append(icone);

  colunaRemover.append(link);

  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);

  return linha;

}

function removelinha(event) {
  event.preventDefault();
  $(this).parent().parent().remove();
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