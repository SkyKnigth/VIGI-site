import { Router } from 'express';
import { db } from '../database/db.js';

const router = Router();
const allowedTypes = new Set(['video', 'tract', 'news', 'press']);

router.get('/', (req, res) => {
  const type = String(req.query.type || '');
  if (!allowedTypes.has(type)) return res.status(400).json({ error: 'Type de publication invalide.' });
  const items = db.prepare(`
    SELECT id, type, title, summary, image_url, external_url, published_at
    FROM publications
    WHERE type = ? AND published = 1
    ORDER BY published_at DESC, id DESC
    LIMIT 100
  `).all(type);
  return res.json(items);
});

export default router;
