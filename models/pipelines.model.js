let mongoose = require('../lib/database');

let PipelineSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    steps: {
        type: Array,
        items: {
            type: Object,
            required: ['id', 'name', 'stepId'],
            properties: {
                id: {
                    type: String
                },
                stepId: {
                    type: String
                },
                params: {
                    type: Array,
                    items: {
                        type: Object,
                        required: ['name', 'type', 'value'],
                        properties: {
                            type: {
                                type: String
                            },
                            name: {
                                type: String
                            },
                            required: {
                                type: Boolean
                            },
                            value: {
                                type: mongoose.Schema.Types.Mixed
                            }
                        }
                    }
                },
                engineMeta: {
                    type: Object
                }
            }
        }
    }
});

module.exports = mongoose.model('Pipelines', PipelineSchema);
