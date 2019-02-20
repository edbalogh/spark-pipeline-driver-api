const mongoose = require('mongoose');

const server = 'localhost';
const database = 'pipeline';

mongoose.connect(`mongodb://${server}/${database}`);

module.exports = mongoose;
