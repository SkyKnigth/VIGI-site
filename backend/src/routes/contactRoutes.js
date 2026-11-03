import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { db } from '../database/db.js';

const router = Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false });

router.post('/', limiter, (req, res) => {
  const { name, email, message } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.length > 120 ||
      typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
      typeof message !== 'string' || !message.trim() || message.length > 5000) {
    return res.status(400).json({ error: 'Veuillez remplir correctement tous les champs.' });
  }
  db.prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)')
    .run(name.trim(), email.trim(), message.trim());
  return res.status(201).json({ message: 'Message enregistré. Envoi par e-mail non configuré dans cette version.' });
});

export default router;
