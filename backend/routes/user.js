const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

//updating favourites
router.put('/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favourite_movies = req.body.favourite_movies;
    await user.save();
    res.json(user.favourite_movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//fetching favourites
router.get('/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favourite_movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//adding to favourites
router.post('/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { movieId } = req.body;

    if (!user.favourite_movies.includes(movieId)) {
      user.favourite_movies.push(movieId);
      await user.save();
    }

    res.json(user.favourite_movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// removing from favourites
router.delete('/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { movieId } = req.body;

    user.favourite_movies = user.favourite_movies.filter(id => id !== movieId);
    await user.save();

    res.json(user.favourite_movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//update search history
router.put('/search-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.search_history = req.body.search_history;
    await user.save();
    res.json(user.search_history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//adding into search history
router.post('/search-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.search_history.push(req.body.query);
    await user.save();
    res.json(user.search_history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//fetching search history
router.get('/search-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.search_history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//deleting search history
router.delete('/search-history', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ msg: 'Query is required' });
    }

    user.search_history = user.search_history.filter(item => item !== query);
    await user.save();

    res.json(user.search_history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;