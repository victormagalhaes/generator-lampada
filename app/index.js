'use strict';
var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
	constructor: function() {
		yeoman.generators.Base.apply(this, arguments);

		this.package = require('../package.json');
	},

	// Faz a interação com o usuário montando as opções que serão usadas no futuro para configurar a framework
	// askFor: function() {
	// 	var done = this.async();
	//
	// 	var prompts = [{
	// 		type: 'checkbox',
	// 		name: 'features',
	// 		message: 'What more would you like?',
	// 		choices: [{
	// 			name: 'Bootstrap',
	// 			value: 'includeBootstrap',
	// 			checked: true
	// 		},{
	// 			name: 'Sass',
	// 			value: 'includeSass',
	// 			checked: true
	// 		},{
	// 			name: 'Modernizr',
	// 			value: 'includeModernizr',
	// 			checked: true
	// 		}]
	// 	}, {
	// 		when: function(answers) {
	// 			return answers && answers.features && answers.features.indexOf('includeSass') !== -1;
	// 		},
	// 		type: 'confirm',
	// 		name: 'libsass',
	// 		value: 'includeLibSass',
	// 		message: 'Would you like to use libsass? Read up more at \n' + chalk.green('https://github.com/andrew/node-sass#node-sass'),
	// 		default: false
	// 	}];
	//
	// 	this.prompt(prompts, function(answers) {
	// 		var features = answers.features;
	//
	// 		function hasFeature(feat) {
	// 			return features && features.indexOf(feat) !== -1;
	// 		}
	//
	// 		this.includeSass = hasFeature('includeSass');
	// 		this.includeBootstrap = hasFeature('includeBootstrap');
	// 		this.includeModernizr = hasFeature('includeModernizr');
	//
	// 		this.includeLibSass = answers.libsass;
	// 		this.includeRubySass = !answers.libsass;
	//
	// 		done();
	// 	}.bind(this));
	// },

	// Cria o arquivo de package.json
	packageJSON: function() {
		this.template('_package.json', 'package.json');
	},

	// Cria o gulpfile, que é o gerador de todas as tarefas
	parametros: function() {
		this.template('parametros.js');
	},

	// Cria o arquivo de parametros
	gulpfile: function() {
		this.template('gulpfile.js');
	},

	// Cria o arquivo do gitignore
	git: function() {
		this.template('gitignore', '.gitignore');
	},

	// JS Hint
	jshint: function() {
		this.copy('jshintrc', '.jshintrc');
	},

	// Editorconfig
	editorConfig: function() {
		this.copy('editorconfig', '.editorconfig');
	},

	estrutura: function() {
		this.directory('aplicacao');
		this.mkdir('aplicacao/origem');
		this.mkdir('aplicacao/destino');

		this.mkdir('aplicacao/origem/scripts');
		this.mkdir('aplicacao/origem/estilos');
		this.mkdir('aplicacao/origem/imagens');
		this.mkdir('aplicacao/origem/imagens');
    },

	estilos: function() {
		this.template('base.scss', 'aplicacao/origem/estilos/base.scss');
	},

	jade: function() {
		this.template('index.jade', 'aplicacao/origem/templates/index.jade');
	},

	coffee: function() {
		this.template('base.coffee', 'aplicacao/origem/scripts/base.coffee');
	}
});
