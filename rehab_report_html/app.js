const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = 8457;

app.use(express.static(path.join(__dirname, 'assets')));

app.get('/Rehabilitation_assessment', (req, res) => {
    // const en_id = req.query.en_id;
    // const hn = req.query.hn;
    // const en = req.query.en;

    // console.log('en_id:', en_id);
    // console.log('hn:', hn);
    // console.log('en:', en);

    res.sendFile(path.join(__dirname, 'assets', 'form', 'Rehabilitation_assessment.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
