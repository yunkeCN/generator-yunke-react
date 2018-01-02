'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-yunke-react:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true,
        gitAccount: 'yued'
      })
      .withArguments(['awesomeX']);
  });

  it('creates files', () => {
    assert.file(['package.json']);
    assert.jsonFileContent('package.json', {
      name: 'awesome-x'
    });
  });
});
