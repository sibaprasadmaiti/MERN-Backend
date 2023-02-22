const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/mern_crud", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', function() {
    console.log('Database connected');
}).on('error', function(error) {
    console.log('Database connection error:', error);
});

module.exports;