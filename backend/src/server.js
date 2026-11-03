import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import './database/db.js';
import contentRoutes from './routes/contentRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = Number(process.env.PORT || 4000);
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/content', contentRoutes);
app.use('/api/contact', contactRoutes);
app.use((_req, res) => res.status(404).json({ error: 'Route introuvable.' }));
app.listen(port, () => console.log(`API VIGI : http://localhost:${port}`));
