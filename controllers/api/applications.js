'use strict';

var ApplicationsModel = require('../../models/applications.model');

module.exports = function (router) {

    router.get('/', function (req, res) {
        ApplicationsModel.find()
            .then(applications => {
                res.json({applications: applications});
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.get('/:id', function (req, res) {
        ApplicationsModel.findOne({id: req.params.id})
            .then(applications => {
                res.json(applications);
            })
            .catch(err => {
                res.status(501).json(err);
            });
    });

    router.post('/', function (req, res) {
        if(req.body) {
            var model = new ApplicationsModel(req.body);
            model.save()
                .then(application => {
                    if(!application || application.length === 0) {
                        return res.status(500).send(application);
                    }
                    res.status(201).json(application);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } else {
            return res.status(400).send('POST request missing body')
        }
    });

    router.put('/:id', function (req, res) {
        ApplicationsModel.findOneAndUpdate({id: req.params.id}, req.body, { new: true })
            .then(application => {
                res.status(201).json(application);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

    router.delete('/:id', function(req, res) {
        ApplicationsModel.findOneAndRemove({id: req.params.id})
            .then(application => {
                res.status(200).json('success!');
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });
};
