const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log('Error in starting the server :', err);
        return;
    }

    console.log(`Server is up and running on port : ${port}`);
})