let mongoose = require('../lib/database');

let PipelineStepsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    params: {
        type: Array,
        items: {
            type: Object,
            required: ['name', 'type'],
            properties: {
                type: {
                    type: String
                },
                name: {
                    type: String
                }
            }
        }
    },
    engineMeta: {
        type: Object
    }
});

module.exports = mongoose.model('PipelineSteps', PipelineStepsSchema);
