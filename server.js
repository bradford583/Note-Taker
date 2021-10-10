//node modules
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//set port
const PORT = process.env.PORT || 3001;

//routes
const apiRoutes = require("./routes/apiRoutes");
const hmtlRoutes = require("./routes/htmlRoutes");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});