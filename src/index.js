import dotenv from 'dotenv';
import app from './app.js';

import express from 'express';
dotenv.config({
    path: '.env'
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})


