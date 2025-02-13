const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const users = require("./src/routes/users")
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  keyGenerator: (req, res) => req.clientIp,
});

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users/', users)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});