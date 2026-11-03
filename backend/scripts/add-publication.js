// Usage : node scripts/add-publication.js video "Titre" "https://youtube.com/watch?v=..." "https://.../image.jpg" 2026-11-02
import 'dotenv/config';
import { db } from '../src/database/db.js';

const [type, title, url, image = '', date = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);
if (!['video', 'tract', 'news', 'press'].includes(type) || !title || !/^https:\/\//.test(url) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error('Arguments invalides. Voir README.md.');
  process.exit(1);
}
const result = db.prepare('INSERT INTO publications (type, title, image_url, external_url, published_at, published) VALUES (?, ?, ?, ?, ?, 1)').run(type, title, image, url, date);
console.log(`Publication créée : ${result.lastInsertRowid}`);
