let mongoose = require('../lib/database');

let ApplicationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    sparkConf: {
        type: Object,
        properties: {
            kryoClasses: {
                type: Array,
                items: {
                    type: String
                }
            },
            setOptions: {
                type: Array,
                items: {
                    type: Object,
                    required: ['name', 'value'],
                    properties: {
                        name: {
                            type: String
                        },
                        value: {
                            type: mongoose.Schema.Types.Mixed
                        }
                    }
                }
            }
        }
    },
    stepPackages: {
        type: Array,
        items: {
            type: String
        }
    },
    globals: {
        type: Array,
        items: {
            type: Object
        }
    },
    executions: {
        type: Array,
        items: {
            type: Object,
            required: ['id', 'pipelines'],
            properties: {
                id: {
                    type: String
                },
                parents: {
                    type: Array,
                    items: {
                        type: String
                    }
                },
                pipelines: {
                    type: Array,
                    items: {
                        type: Object,
                        properties: {
                            required: ['id', 'name', 'steps'],
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
                                    required: ['id', 'stepId'],
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
                        }
                    }
                }
            }
        }
    }
});

module.exports = mongoose.model('Applications', ApplicationSchema);
