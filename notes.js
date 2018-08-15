console.log("Starting app.js");
const fs = require('fs');

fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('node-app-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

saveNotes = (notes) => {
  fs.writeFileSync('node-app-data.json', JSON.stringify(notes));
}

getAll = () => {
  return fetchNotes();
}

getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title == title);
  return filteredNotes[0];
}

removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter(note => note.title != title);
  saveNotes(filteredNotes);
  return filteredNotes.length != notes.length;
}

addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  }
  var duplicateNotes = notes.filter(note => note.title == title);

  if (duplicateNotes.length == 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

logNote = (note) => {
  console.log('---');
  console.log(`title: ${note.title}`);
}

module.exports = {
  getAll,
  getNote,
  removeNote,
  addNote,
  logNote
}

