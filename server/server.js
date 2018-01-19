const path = require('path');
const express = require('express');

const publicpath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

app = express();
app.use(express.static(publicpath));

app.listen(3000,()=> {
    console.log('Server is running on port 3000');
});