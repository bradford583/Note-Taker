const fs = require('fs')
const {
    createNewNote,
    filterByQuery
} = require('../lib/notes.js');


jest.mock('fs');

test('creates a note object', () => {
    const note = createNewNote(
        {
            title: 'fortnite',
            text: 'win a game'
        }
    );
        expect(note.title).toBe('fortnite');
        expect(note.text).toBe('win a game');
});

test('filters by query', () => {
    const notes = [
        {
            title: 'fortnite',
            text: 'win a game'
        },
        {
            title: 'dadding',
            text: 'take care of kids'
        }
    ];

    const updatedNotes = filterByQuery({ title: 'dadding'}, notes);
    expect(updatedNotes.length).toEqual(1);
});