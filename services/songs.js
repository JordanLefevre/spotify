'use strict'

const db = require('../database');

exports.find = (query = {}) => {
    return db.Songs.findAll({
        where: query
    });
};

exports.create = (song) => {
    const model = db.Songs.build(song);
    return model.validate()
    .then(err => {
        if (err) {
            return Promise.reject(err);
        }
        return model.save();
    })
    ;
};

exports.delete = () => {
    return db.Songs.destroy({
        where:{}
    });
};

exports.findOne = (query = {}) => {
    return db.Songs.findAll({
        where: {
            id: query.id
        }
    });
};

exports.deleteOne = (query = {}) => {
    return db.Songs.destroy({
        where: {
            id: query.id
        }
    });
};

/*exports.edit = (query = {}) => {
    return db.Songs.update(query.body,{
        where: {
            id: query.id
        }
    });
};*/
