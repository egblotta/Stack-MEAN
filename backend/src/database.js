const mongoose = require('mongoose');

//direccion de la bd
mongoose.connect('mongodb://localhost/stack-mean', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.log(err)); 