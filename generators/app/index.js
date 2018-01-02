'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(...o) {
    super(...o);
    this.argument('projName', {
      type: String,
      required: true,
      desc: 'project name',
      filter: _.kebabCase
    });
    this.option('git-account', {
      type: String,
      required: true,
      default: 'yued',
      desc: 'your gitlab name or organization name'
    });
  }
  default() {
    this.log(
      yosay('Welcome to the peachy ' + chalk.red('generator-yunke-react') + ' generator!')
    );
    this.log(
      `Your project must be inside a folder named 
      ${this.options.projName}
      \nI'll automatically create this folder.`
    );
    mkdirp(this.options.projName);
    this.destinationRoot(this.destinationPath(this.options.projName));
  }
  _writePackage(extendPkg) {
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      extendPkg(this.fs.readJSON(this.destinationPath('package.json'), {}))
    );
  }
  Writing() {
    this._writePackage(() => ({
      name: this.options.name,
      version: '0.0.0',
      description: ''
    }));
  }

  Install() {
    if (this.options.skipInstall) {
      this.installDependencies({ bower: false });
    }
  }
};
