// dependencies
const fs = require('fs');
const path = require('path');

const notesArray = []


//filter function
function filterByQuery(query, notesArray) {
    let titleArray = [];
    let filteredResults = notesArray;
    if (query.title) {
        if (typeof query.title === 'string') {
            titleArray = [query.title];
        } else {
            titleArray = query.title;
        }
        titleArray.forEach((title) => {
            filteredResults = filteredResults.filter(
                (notes) => notes.title.indexOf(title) !== -1
            );
        });
    };

    if (query.title) {
        filteredResults = filteredResults.filter(
            (notes) => notes.title === query.title
        );
    };
    if (query.text) {
        filteredResults = filteredResults.filter(
            (notes) => notes.text === query.text
        );
    }
    return filteredResults;
};

//find id
function findByTitle(title, notesArray) {
    const result = notesArray.filter((notes) => notes.title === title)[0];
    return result;
};

//new note
function createNewNote(body, notesArray) {
    
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

//validate note
function validateNotes(note) {
    if (!note.name || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

module.exports = {
    filterByQuery,
    findByTitle,
    createNewNote,
    validateNotes
};