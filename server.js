const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const users = require("./src/routes/users")
const products = require("./src/routes/products")

const rateLimit = require('express-rate-limit');
const path = require('path');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  keyGenerator: (req, res) => req.clientIp,
});
const public = path.join(__dirname, 'public');

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/public', express.static(public));

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users/', users)
app.use('/api/products/', products)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});