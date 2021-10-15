const router = require('express').Router();
const {
    filterByQuery,
    findByTitle,
    createNewNote,
    validateNotes
} = require('../../lib/notes');

const {notes} = require('../../lib/notes');

//get routes
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

//error messsages
router.get('/notes/:id', (req, res) => {
    const result = findByTitle(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(400);
    }
});

//post note
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    if (!validateNotes(req.body)) {
        res.status(400).send('This note is not formatted correctly.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    };
});

module.exports = router;