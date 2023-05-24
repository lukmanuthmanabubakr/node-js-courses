const express = require('express')
const router = require('router')
const path = require('path')

const PORT = process.env.PORT || 3500

app.use("/", require("./routes/root"));

router.get('^/$|index(.html)?', (req, res) => {
    
})