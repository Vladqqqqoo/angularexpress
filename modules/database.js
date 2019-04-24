const mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true);

        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection is closed.'))
            .on('open', () => resolve(mongoose.connection));

        mongoose.connect('mongodb+srv://admin:1111@cluster0-ukhgu.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
    });
}
