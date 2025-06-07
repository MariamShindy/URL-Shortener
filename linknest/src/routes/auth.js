const express = require('express');
const z = require('zod');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { register, login, getMe } = require('../controllers/authController');

const router = express.Router();

router.post('/register', validate(z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
})), register);

router.post('/login', validate(z.object({
  email: z.string().email(),
  password: z.string()
})), login);

router.get('/me', auth, getMe);

module.exports = router;
