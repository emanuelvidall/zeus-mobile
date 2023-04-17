const mongoose = require('mongoose');

const url = `mongodb+srv://emanuelvidalrm:${process.env.DATABASE_PASSWORD}@appzeusdb.lq9izu5.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true});

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })
