'use strict';

var StepsModel = require('../../models/pipeline-steps.model');

module.exports = function (router) {

    router.get('/', function (req, res) {
        StepsModel.find()
            .then(steps => {
                res.json({steps: steps});
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.get('/:id', function (req, res) {
        StepsModel.findOne({id: req.params.id})
            .then(step => {
                res.json(step);
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.post('/', function (req, res) {
        if(req.body) {
            var model = new StepsModel(req.body);
            model.save()
                .then(step => {
                    if(!doc || doc.length === 0) {
                        return res.status(500).send(step);
                    }
                    res.status(201).json(step);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            return res.status(400).send('POST request missing body')
        }
    });

    router.put('/:id', function (req, res) {
        StepsModel.findOneAndUpdate({id: req.params.id}, req.body, { new: true })
            .then(step => {
                res.status(201).json(step);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.delete('/:id', function(req, res) {
        StepsModel.findOneAndRemove({id: req.params.id})
            .then(step => {
                res.status(200).json('success!');
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });
};
