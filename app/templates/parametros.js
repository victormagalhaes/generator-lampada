var aplicacao = './aplicacao';

var parametros = {

    // Raiz do projeto
    aplicacao: aplicacao,

    // Caminho onde ficam todos os arquivos fontes
    origem: aplicacao + '/origem',

    // Caminho para qual serão gerados os arquivos otimizados
    destino: aplicacao + '/destino',

    // Caminho dos templates
    templates: aplicacao + '/templates',

    // Caminho dos arquivos de estilos
    estilos: aplicacao + '/estilos',

    // Caminho dos scripts
    scripts: aplicacao + '/scripts',

    // Caminho das imagens
    imagens: aplicacao + '/imagens',

    // Nome do arquivo que faz todos os includes de SASS da framework
    arquivo_base_sass: aplicacao + '/estilos/base.sass',

    // Minificar arquivos na compilação?
    minificar: true
};

module.exports = parametros;
