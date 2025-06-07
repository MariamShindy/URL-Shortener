require('dotenv').config();
const express = require('express');
const logger = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const authRoutes = require('./routes/auth');
const linksRoutes = require('./routes/links');
require('./models'); 

const app = express();
app.use(express.json());
app.use(logger);
app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use('/links', linksRoutes);

const expiryCheck = require('./middlewares/expiryCheck');
app.get('/:slug', expiryCheck, (req, res) => {
  res.redirect(req.link.original_url);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
