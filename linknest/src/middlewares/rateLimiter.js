const rateLimit = require('express-rate-limit');
const { banIP } = require('../helpers/block');

const abuseTracker = {};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  handler: (req, res) => {
    const ip = req.ip;
    abuseTracker[ip] = (abuseTracker[ip] || 0) + 1;

    if (abuseTracker[ip] >= 3) { 
      banIP(ip);
      return res.status(403).json({ error: 'You have been banned for repeated abuse.' });
    }

    res.status(429).json({ error: 'Too many requests, please try again later.' });
  }
});

module.exports = limiter;
