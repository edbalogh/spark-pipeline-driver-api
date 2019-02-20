const schema = require('../schemas/pipelines.json');
const BaseModel = require('../lib/base.model');


class PipelinesModel extends BaseModel {
    // custom model logic goes here
}

var model = new PipelinesModel('pipelines', schema);

module.exports = model;
