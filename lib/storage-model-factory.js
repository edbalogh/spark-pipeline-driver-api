
class StorageModelFactory {

    static getStorageModel(collectionName) {
        const Model = require('./mongodb-storage-model');
        return new Model(collectionName);
    }
}

module.exports = StorageModelFactory;
