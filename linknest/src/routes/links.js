const express = require('express');
const z = require('zod');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const expiryCheck = require('../middlewares/expiryCheck');
const { shorten, getMySlugs, redirectToOriginal, getQRCode } = require('../controllers/linksController');

const router = express.Router();

router.post('/shorten', auth, validate(z.object({
  original_url: z.string().url(),
  expires_at: z.string().optional(),
  password: z.string().optional(),
  custom_slug: z.string().optional()
})), shorten);

router.get('/my-slugs', auth, getMySlugs);

router.get('/:slug', expiryCheck, redirectToOriginal);

router.get('/:slug/qrcode', expiryCheck, getQRCode);

module.exports = router;
