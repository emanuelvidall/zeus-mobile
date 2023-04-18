import {mongoose} from 'mongoose';
import {config} from 'dotenv';
config();
import {MongoClient} from 'mongodb';

const dbPassword = process.env.DB_PASSWORD;

const url = `mongodb+srv://emanuelvidalrm:${dbPassword}@appzeusdb.lq9izu5.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

async function connectToDatabase() {
  const client = await MongoClient.connect(url);
  return client.db('<database-name>');
}

const dbPromise = connectToDatabase();

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

export {dbPromise, connectToDatabase};
