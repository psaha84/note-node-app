console.log("Starting app.js");
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

var command = process.argv[2];
var argv = yargs.argv;

if (command == 'add') {
  var note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note already exists');
  }
} else if (command == 'list') {
  var allNotes = notes.getAll();
  console.log(`notes length ${allNotes.length}`);
  allNotes.forEach(note => {
    notes.logNote(note);
    console.log(`body: ${note.body}`);
  });
} else if (command == 'read') {
  var note = notes.getNote(argv.title);
  if (note) {
    notes.logNote(note);
    console.log(`body: ${note.body}`);
  } else {
    console.log('Note not found');
  }
} else if (command == 'remove') {
  var removeNote = notes.removeNote(argv.title);
  var message = removeNote ? "removed notes" : "note not found"
  console.log(message);
} else {
  console.log("unknown command");
}
