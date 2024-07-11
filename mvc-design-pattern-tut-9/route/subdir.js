const express = require('express')
const router = express.Router();
const path = require('path')

router.get('^/$|index(.html)?', (req, res) => {
    // res.s
    res.sendFile(path.join(__dirname, "..", 'views', "subdir", 'index.html'));
})
router.get('/text(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, "..", 'views', "subdir", 'text.html'));
})


module.exports = router