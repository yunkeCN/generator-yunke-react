'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const askName = require('inquirer-npm-name');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(...o) {
    super(...o);
    this.props = {};
  }
  prompting() {
    this.log(
      yosay('Welcome to the peachy ' + chalk.red('generator-yunke-react') + ' generator!')
    );
    return askName(
      {
        name: 'name',
        message: 'Your Project name',
        default: path.basename(process.cwd())
      },
      this
    ).then(props => {
      this.props.name = props.name;
    });
  }
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        `Your project must be inside a folder named 
        ${this.props.name}
        \nI'll automatically create this folder.`
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
      this.composeWith(require.resolve('generator-node/generators/app'), {
        boilerplate: false,
        cli: false,
        travis: false
      });
    }
  }
  _writePackage() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.start = 'webpack-dev-server';
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
  _writeReactTpl() {
    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );
  }
  Writing() {
    this._writePackage();
    this._writeReactTpl();
  }

  Install() {
    if (this.options.skipInstall) {
      this.installDependencies({ bower: false });
    }
  }
};
