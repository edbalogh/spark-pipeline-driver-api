const mongoClient = require('mongodb').MongoClient;

const server = 'localhost';
const database = 'pipeline';

class MongoDBModel {
    constructor(collectionName) {
        this.collectionName = collectionName;
        mongoClient.connect(`mongodb://${server}/`, (err, db) => {
            this.mongodb = db.db(database);
            this.collection = this.mongodb.collection(this.collectionName);
        });
    }

    find(query) {
        return new Promise( (resolve, reject) => {
            this.collection.find(query).toArray()
                .then(results => {
                    resolve(results);
                })
                .catch(err => reject(err));
        });
    }

    addRecord(record) {
        return new Promise( (resolve, reject) => {
            this.find({ id: record.id})
                .then(exists => {
                    if(exists.length > 0) {
                        reject({ message: `id ${record.id} already exists!` });
                    }
                    else {
                        this.collection.insertOne(record)
                            .then(() => {
                                resolve(this.find({ id: record.id }));
                            })
                            .catch(err => reject(err));
                    }
                });
        });
    }

    updateRecord(key, record) {
        return new Promise( (resolve, reject) => {
            this.collection.findOneAndUpdate(key, { $set: record }, { upsert: true, returnOriginal: false }, (err, doc) => {
                if(err) reject(err);
                resolve(doc.value);
            });
        });
    }

    deleteRecord(query) {
        return this.collection.findOneAndDelete(query);
    }

}

module.exports = MongoDBModel;
