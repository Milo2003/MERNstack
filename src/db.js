const mongoose = require('mongoose');

const url = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err))

module.exports = mongoose;