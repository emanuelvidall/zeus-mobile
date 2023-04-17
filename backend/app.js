const express = require('express');
const app = express();
const User = require('./user-model');
const port = 3001;
var bodyParser = require('body-parser');

// app.use((req, res, next) => {
//    Allow cross-origin requests from any domain and with any headers/methods
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Access-Control-Allow-Methods', '*');
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post('/register', (req, res) => {
  // res.header('Access-Control-Allow-Origin', '*');
  console.log('incoming request body:', req.body);
  const newUser = new User({
    name: req.body.name,
  });

  console.log('new user before save: ', newUser);

  newUser
    .save()
    .then(savedUser => {
      return res.status(200).json({msg: savedUser});
    })
    .catch(error => {
      console.error('Error saving user:', error);
      return res.status(500).json({error: 'could not save'});
    });
});
