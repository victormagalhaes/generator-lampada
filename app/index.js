'use strict';
var join = require('path').join;
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
	constructor: function() {
		yeoman.generators.Base.apply(this, arguments);
	});

	this.package = require('../package.json');
	},

	// Faz a interação com o usuário montando as opções que serão usadas no futuro para configurar a framework
	askFor: function() {
		var done = this.async();

		var prompts = [{
			type: 'checkbox',
			name: 'features',
			message: 'What more would you like?',
			choices: [{
				name: 'Bootstrap',
				value: 'includeBootstrap',
				checked: true
			},{
				name: 'Sass',
				value: 'includeSass',
				checked: true
			},{
				name: 'Modernizr',
				value: 'includeModernizr',
				checked: true
			}]
		}, {
			when: function(answers) {
				return answers && answers.features && answers.features.indexOf('includeSass') !== -1;
			},
			type: 'confirm',
			name: 'libsass',
			value: 'includeLibSass',
			message: 'Would you like to use libsass? Read up more at \n' + chalk.green('https://github.com/andrew/node-sass#node-sass'),
			default: false
		}];

		this.prompt(prompts, function (answers) {
			var features = answers.features;

			function hasFeature(feat) {
				return features && features.indexOf(feat) !== -1;
			}

			this.includeSass = hasFeature('includeSass');
			this.includeBootstrap = hasFeature('includeBootstrap');
			this.includeModernizr = hasFeature('includeModernizr');

			this.includeLibSass = answers.libsass;
			this.includeRubySass = !answers.libsass;

			done();
		}.bind(this));
	},

	// Cria o GruntFile, que é o gerador de todas as tarefas
	gruntfile: function () {
		this.template('Gruntfile.js');
	},

	// Cria o arquivo de package.json
	packageJSON: function () {
		this.template('_package.json', 'package.json');
	},

	// Cria o arquivo do gitignore
	git: function () {
		this.template('gitignore', '.gitignore');
	},

	// Cria o bower com as dependências
	bower: function () {
		var bower = {
			name: this._.slugify(this.appname),
			private: true,
			dependencies: {}
		};

		if (this.includeBootstrap) {
			var bs = 'bootstrap' + (this.includeSass ? '-sass-official' : '');
			bower.dependencies[bs] = '~3.2.0';
		} else {
			bower.dependencies.jquery = '~1.11.1';
		}

		if (this.includeModernizr) {
			bower.dependencies.modernizr = '~2.8.2';
		}

		this.copy('bowerrc', '.bowerrc');
		this.write('bower.json', JSON.stringify(bower, null, 2));
	},

	// JS Hint
	jshint: function () {
		this.copy('jshintrc', '.jshintrc');
	},

	// Editorconfig
	editorConfig: function () {
		this.copy('editorconfig', '.editorconfig');
	},

	mainStylesheet: function () {
		var css = 'main.' + (this.includeSass ? 's' : '') + 'css';
		this.template(css, 'aplicacao/origem/estilos/' + css);
	},

  writeIndex: function () {
    this.indexFile = this.engine(
      this.readFileAsString(join(this.sourceRoot(), 'index.html')),
      this
    );

    // wire Bootstrap plugins
    if (this.includeBootstrap && !this.includeSass) {
      var bs = 'bower_components/bootstrap/js/';

      this.indexFile = this.appendFiles({
        html: this.indexFile,
        fileType: 'js',
        optimizedPath: 'scripts/plugins.js',
        sourceFileList: [
          bs + 'affix.js',
          bs + 'alert.js',
          bs + 'dropdown.js',
          bs + 'tooltip.js',
          bs + 'modal.js',
          bs + 'transition.js',
          bs + 'button.js',
          bs + 'popover.js',
          bs + 'carousel.js',
          bs + 'scrollspy.js',
          bs + 'collapse.js',
          bs + 'tab.js'
        ],
        searchPath: '.'
      });
    }

    this.indexFile = this.appendFiles({
      html: this.indexFile,
      fileType: 'js',
      optimizedPath: 'scripts/main.js',
      sourceFileList: ['scripts/main.js'],
      searchPath: ['app', '.tmp']
    });
  },

  app: function () {
    this.directory('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/images');
    this.write('app/index.html', this.indexFile);

    if (this.coffee) {
      this.copy('main.coffee', 'app/scripts/main.coffee');
    } else {
      this.copy('main.js', 'app/scripts/main.js');
    }
  },

  install: function () {
    this.on('end', function () {
      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install'],
          'coffee': this.options.coffee
        }
      });

      if (!this.options['skip-install']) {
        this.installDependencies({
          skipMessage: this.options['skip-install-message'],
          skipInstall: this.options['skip-install']
        });
      }
    });
  }
});