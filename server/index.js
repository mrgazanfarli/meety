const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));

const port = process.env.PORT || 3000;

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.set('port', port);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
