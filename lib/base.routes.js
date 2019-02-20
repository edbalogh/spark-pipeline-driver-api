class BaseRoutes {
    constructor(singular, plural, model) {
        this.singleName = singular;
        this.pluralName = plural;
        this.model = model;
    }

    buildGetAllRoute(router) {
        router.get('/', (req, res) => {
            this.model.getAll()
                .then(records => {
                    const returnObj = {};
                    returnObj[this.pluralName] = records;
                    res.json(returnObj);
                })
                .catch(err => {
                    res.status(501).json({error: err});
                });
        });
    }

    buildGetOneRoute(router) {
        router.get('/:id', (req, res) => {
            this.model.getByKey({id: req.params.id})
                .then(record => {
                    const returnObj = {};
                    returnObj[this.singleName] = record;
                    res.json(returnObj);
                })
                .catch(err => {
                    res.status(501).json({error: err});
                });
        });
    }

    buildCreateRoute(router) {
        router.post('/', (req, res) => {
            if (req.body) {
                this.model.create(req.body)
                    .then(record => {
                        const returnObj = {};
                        returnObj[this.singleName] = record;
                        res.json(returnObj);
                    })
                    .catch(err => {
                        res.status(500).json({ errors: err, body: req.body });
                    });
            } else {
                res.status(400).send({message: 'POST request missing body'});
            }
        });
    }

    buildUpdateOneRoute(router) {
        router.put('/:id', (req, res) => {
            this.model.update(req.params.id, req.body)
                .then(record => {
                    const returnObj = {};
                    returnObj[this.singleName] = record;
                    res.json(returnObj);
                })
                .catch(err => {
                    res.status(500).json({ errors: err, body: req.body });
                });
        });
    }

    buildDeleteRoute(router) {
        router.delete('/:id', (req, res) => {
            this.model.delete(req.params.id)
                .then(response => {
                    res.send({message: response});
                })
                .catch(err => {
                    res.status(500).json({errors: err});
                });
        });
    }

    buildBasicCrudRoutes(router) {
        this.buildGetAllRoute(router);
        this.buildGetOneRoute(router);
        this.buildCreateRoute(router);
        this.buildUpdateOneRoute(router);
        //this.buildUpdateManyRoute(router);
        this.buildDeleteRoute(router);
    }
}

module.exports = BaseRoutes;
