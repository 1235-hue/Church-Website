// Church Fundraiser API — Express entrypoint
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const contributionsRoutes = require('./routes/contributions.routes');
const itemsRoutes = require('./routes/items.routes');
const rsvpsRoutes = require('./routes/rsvps.routes');
const eventsRoutes = require('./routes/events.routes');
const mediaRoutes = require('./routes/media.routes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: 'https://church-website-app1.vercel.app',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// REST API
app.use('/api/auth', authRoutes);
app.use('/api/contributions', contributionsRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/rsvps', rsvpsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/media', mediaRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Church Fundraiser API listening on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs at  http://localhost:${PORT}/api-docs`);
});
