const schema = require('../schemas/applications.json');
const BaseModel = require('../lib/base.model');


class ApplicationsModel extends BaseModel {
    // custom model logic goes here
}

const model = new ApplicationsModel('applications', schema);

module.exports = model;
