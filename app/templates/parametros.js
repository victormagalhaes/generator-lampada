var aplicacao = './aplicacao';
var origem = './aplicacao/origem';
var destino = './aplicacao/destino';

var parametros = {

    // Raiz do projeto
    aplicacao: aplicacao,

    // Caminho onde ficam todos os arquivos fontes
    origem: origem,

    // Caminho para qual serão gerados os arquivos otimizados
    destino: destino,

    // Caminho dos templates
    templates: origem + '/templates',

    // Caminho dos arquivos de estilos
    estilos: origem + '/estilos',

    // Caminho dos scripts
    scripts: origem + '/scripts',

    // Caminho das imagens
    imagens: origem + '/imagens',

    // Nome do arquivo que faz todos os includes de SASS da framework
    arquivo_base_sass: origem + '/estilos/base.sass',

    // Minificar arquivos na compilação?
    minificar: true
};

module.exports = parametros;
