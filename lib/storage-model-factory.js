
class StorageModelFactory {

    static getStorageModel(collectionName) {
        const Model = require('./file-storage-model');
        return new Model(collectionName);
    }
}

module.exports = StorageModelFactory;
