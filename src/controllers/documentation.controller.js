/**
 * documentation.controller.js
 * src/controllers
 *
 * Created by samover on 19/07/2017.
 */

const router = require('express').Router();

/**
 * /unit route
 *
 * @class DocumentationController
 */
class DocumentationController {
  constructor({ documentationService }) {
    this.documentationService = documentationService;
  }

  /**
   * Create the routes.
   *
   * @class DocumentationController
   * @method create
   * @static
   */
  static create() {
    const { documentationController } = diContainer.cradle;
    router.get('/', (req, res, next) => documentationController.renderDocumentation(req, res, next));

    return router;
  }

  /**
   * Renders ApiBlueprint Documentation
   */
  async renderDocumentation(req, res, next) {
    try {
      const htmlOutput = await this.documentationService.getDocumentation();
      res.send(htmlOutput);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = DocumentationController;
