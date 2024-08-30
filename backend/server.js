const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

// CORS Configuration
const corsOptions = {
  origin: 'https://movie-search-web-application-frontend.onrender.com', // Your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Movie Search API');
});

// Error Handling Middleware for CORS issues
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
