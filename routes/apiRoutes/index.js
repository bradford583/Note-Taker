const router = require('express').Router();
//const { notDeepEqual } = require('assert');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

router.get("/api/notes", (req, res) => {
    //get notes on page
    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err,data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4()

    //return note info
    return fs.readFile(path.join(__dirname, "../../db/db.json"), 'utf8', (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);

        //add new note to page
        allNotes.push(newNote);

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(allNotes), 'utf8', () => {
            res.status(200).json({ success: true })
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    return fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);

        const filteredNotes = allNotes.filter((note) => id !==noteid);

        fs.writeFile(path.join(__dirname, '../../db/db.json'), JSON.stringify(filteredNotes), 'utf8', () => {
            res.status(200).json({ success:true });
        });
    });
});

module.exports = router;