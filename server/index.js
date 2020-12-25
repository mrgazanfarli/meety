const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
