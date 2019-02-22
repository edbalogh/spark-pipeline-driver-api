const PipelinesModel = require(`../../../models/pipelines.model`);
const BaseRoutes = require('../../../lib/base.routes');

var baseRoutes = new BaseRoutes('pipeline', 'pipelines', PipelinesModel);

module.exports = function (router) {
    baseRoutes.buildBasicCrudRoutes(router);

    // custom routes go here
};
