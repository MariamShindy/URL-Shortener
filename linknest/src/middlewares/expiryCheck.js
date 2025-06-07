const db = require('../db');
const { sql } = require('drizzle-orm'); 

const expiryCheck = async (req, res, next) => {
  try {
    const slug = req.params.slug;

    const link = await db.get(sql`SELECT * FROM links WHERE short_slug = ${slug}`);

    if (!link) return res.status(404).json({ error: 'Link not found' });

    if (link.expires_at && new Date(link.expires_at) < new Date()) {
      return res.status(410).json({ error: 'Link expired' });
    }

    req.link = link;
    next();

  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'DB error' });
  }
};

module.exports = expiryCheck;
