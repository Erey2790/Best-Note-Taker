// Import express package
const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');




// Initialize our app variable by setting it to the value of express()
const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/notes', (req, res) => {
    // `res.sendFile` is Express' way of sending a file
    // `__dirname` is a variable that always returns the directory that your server is running in
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // Obtain existing reviews
        fs.readFile('./db/db.json', 'UTF-8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                // add a new note
                parsedNotes.push(req.body)

                // Write updated Notes back to the file
                fs.writeFile(
                    './db/db.json',
                    //JSON.stringify(parsedNotes, null, 4),
                    JSON.stringify(parsedNotes, null, 4),
                    (writeErr) =>
                        writeErr
                            ? console.error(writeErr)
                            : console.info('Succesfully updated notes!')
                )
            }
        })

    ;


        const response = {
            status: 'success',
            body: newNote,
        }

        console.log(response);
        res.json(response);
    } else {
        res.json('Error in posting note');
    }
});

app.delete("/api/notes/:id", (req, res) => {
    let noteDb = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.body.note_id).toString();
    noteDb = noteDb.filter(selected =>{
        return selected.id != noteId;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(noteDb));
    res.json(noteDb);
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});



//https://git.heroku.com/damp-inlet-53910.git
//https://damp-inlet-53910.herokuapp.com/