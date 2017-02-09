const router = require('express').Router();
const SongService = require('../services/songs');
const _ = require('lodash');

router.get('/', (req, res) => {
    SongService.find(req.query)
    .then(songs => {
        res.status(200).send(songs);
    })
    ;
});

router.post('/', (req, res) => {
    const keys = _.keys(req.body);

    const mandatoryKeys = ['title', 'album', 'artist'];
    const difference = _.difference(mandatoryKeys, keys);

    if(difference.length){
        return res.status(400).send('Missing properties ' + difference)
    }

    return SongService.create(req.body)
    .then(song => {
        res.status(201).send(song);
    })
    .catch(err => {
        res.status(500).send(err);
    })
    ;
});

router.delete('/', (req, res) => {
    SongService.delete()
    .then(() => {
        res.status(200).send('Songs deleted');
    })
    .catch(err => {
        res.status(500).send(err);
    })
    ;
});

router.get('/:id', (req, res, next) => {
    if (!req.accepts('text/html') && !req.accepts('application/json')) {
        return res.status(406).send({err: 'Not valid type for asked resource'});
    }
    SongService.findOne({id: req.params.id})
    .then(song => {
        if (!song) {
            return next(new APIError(404, `id ${req.params.id} not found`));
        }
        if (req.accepts('text/html')) {
            return res.render('song', {song: song});
        }
        if (req.accepts('application/json')) {
            return res.status(200).send(song);
        }
    })
    .catch(err => next)
    ;
});

/*router.put('/:id', (req, res) => {
SongService.edit(req.body, req.params)
.then(() => {
res.status(200).send('Song edited');
})
.catch(err => {
res.status(500).send(err);
})
;
})*/


router.delete('/:id', (req, res) => {
    SongService.deleteOne(req.params)
    .then(() => {
        res.status(200).send('Song deleted');
    })
    .catch(err => {
        res.status(500).send(err);
    })
    ;
});

router.get('/artist/:artist', (req, res) => {
    SongService.findByArtist(req.params.artist)
    .then(() => {
        res.status(200).send(artists);
    })
    .catch(err => {
        res.status(500).send(err);
    })
    ;
});

module.exports = router;
