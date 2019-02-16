'use strict';

var PipelinesModel = require('../../models/pipelines.model');

module.exports = function (router) {

    router.get('/', function (req, res) {
        PipelinesModel.find()
            .then(pipelines => {
                res.json({pipelines: pipelines});
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.get('/:id', function (req, res) {
        PipelinesModel.findOne({id: req.params.id})
            .then(pipeline => {
                res.json(pipeline);
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.post('/', function (req, res) {
        if(req.body) {
            var model = new PipelinesModel(req.body);
            model.save()
                .then(pipeline => {
                    if(!pipeline || pipeline.length === 0) {
                        return res.status(500).send(pipeline);
                    }
                    res.status(201).json(pipeline);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            return res.status(400).send('POST request missing body')
        }
    });

    router.put('/:id', function (req, res) {
        PipelinesModel.findOneAndUpdate({id: req.params.id}, req.body, { new: true })
            .then(pipeline => {
                res.status(201).json(pipeline);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.delete('/:id', function(req, res) {
        PipelinesModel.findOneAndRemove({id: req.params.id})
            .then(pipeline => {
                res.status(200).json('success!');
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });
};
