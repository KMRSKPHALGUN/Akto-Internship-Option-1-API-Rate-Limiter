const express = require('express');
const rateLimiter = require('./limiter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(rateLimiter);

app.get('/ping', (req, res) => {
  res.json({ message: "Pong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});