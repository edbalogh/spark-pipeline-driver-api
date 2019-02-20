const Ajv = require('ajv');
const StorageModelFactory = require('../lib/storage-model-factory');


class BaseModel {
    constructor(name, schema) {
        this.storageModel = StorageModelFactory.getStorageModel(name);
        const ajv = new Ajv( { allErrors: true } );
        this.validator = ajv.compile(schema);
    }

    getAll() {
        return this.storageModel.find({});
    }

    create(record) {
        return new Promise( (resolve, reject) => {
            const validation = this.validator(record);
            if(!validation){
                reject(this.validator.errors);
            } else {
                resolve(this.storageModel.addRecord(record));
            }
        });
    }

    getByKey(key) {
        return new Promise( (resolve, reject) => {
            this.storageModel.find(key)
                .then(records => {
                    if(records.length > 1) {
                        reject({message: 'more than one record found for this key!', records: records});
                    }
                    else if(records.length === 1){
                        resolve(records[0]);
                    }
                    else {
                        reject({ message: 'no records found!'});
                    }
                })
                .catch(err => { reject(err); });
        });
    }

    update(id, record) {
        return new Promise( (resolve, reject) => {
            const validation = this.validator(record);
            if(!validation){
                reject(this.validator.errors);
            } else if(id !== record.id) {
                reject(`update failed: id from object(${record.id}) does not match id from url(${id})`);
            } else {
                resolve(this.storageModel.updateRecord({ id: id }, record));
            }
        });
    }

    delete(id) {
        return new Promise( (resolve, reject) => {
            const key = { id: id };
            this.storageModel.find(key)
                .then(records => {
                    if(records.length > 0) {
                        this.storageModel.deleteRecord(key);
                        resolve(`id ${id} successfully deleted!`);
                    } else {
                        reject(`no records found for id ${id}`);
                    }
                });

        });
    }
}

module.exports = BaseModel;