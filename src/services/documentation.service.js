/**
 * documentation.service.js
 * src/services
 *
 * Created by samover on 19/07/2017.
 */

const { readFile } = require('fs');
const { promisify } = require('util');
const path = require('path');
const aglio = require('aglio');

module.exports = class DocumentationService {
  constructor() {
    this.aglioRenderer = promisify(aglio.render);
    this.options = { themeVariables: 'default' };
    this.docPath = path.resolve('api_docs');
    this.input = 'docs.apib';
    this.readFile = promisify(readFile);
  }

  async getDocumentation() {
    try {
      const blueprint = await this.readFile(
        path.resolve(this.docPath, this.input),
        {
          encoding: 'utf8',
        },
      );
      return this.aglioRenderer(blueprint, this.options);
    } catch (e) {
      throw e;
    }
  }
};
