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

router.get('/:id', (req, res) => {
    SongService.findOne(req.params)
    .then(song => {
        res.status(200).send(song);
    })
    .catch(err => {
        res.status(500).send(err);
    })
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
