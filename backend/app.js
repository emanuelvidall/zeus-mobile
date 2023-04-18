import express from 'express';
import bodyParser from 'body-parser';
import {mongoose} from 'mongoose';
import {config} from 'dotenv';

config();

const dbPassword = process.env.DB_PASSWORD;

const url = `mongodb+srv://emanuelvidalrm:${dbPassword}@appzeusdb.lq9izu5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected to database ');
  })
  .catch(err => {
    console.error(`Error connecting to the database. \n${err}`);
  });

var userSchema = new mongoose.Schema({
  //setando formas de validacao do input para previnir dados sujos no db
  name: {
    type: String,
    required: [true, 'nao pode ser vazio'],
    index: true,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);

const port = 3001;
const app = express();

app.use((req, res, next) => {
  //Allow cross-origin requests from any domain and with any headers/methods
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/users', async (req1, res1) => {
  try {
    const users = await User.find();
    const userNames = users.map(user => user.name);
    res1.json(userNames);
  } catch (error) {
    console.error(error);
    res1.status(500).json({error: 'Internal server error'});
  }
});
