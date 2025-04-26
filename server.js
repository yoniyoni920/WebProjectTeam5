// run npm install express cors 
// then run node server.js
// in a new terminal


import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('src'));

const dataPath = path.join(__dirname, './public/data.json');

app.post('/register', (req, res) => {
  const newUser = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading user data.');
    }

    let jsonData = { users: [] };
    try {
      jsonData = JSON.parse(data);
      if (!Array.isArray(jsonData.users)) {
        // If users is not an array, reset it
        jsonData.users = [];
      }
    } catch (e) {
      // Handle invalid JSON format, reset the structure
      jsonData = { users: [] };
    }

    // users += newUser (added to array)
    jsonData.users.push(newUser);

    //push to data.jason
    fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).send('Error saving user data.');
      res.status(200).send('User registered!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
