const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
  createPost,
  getAllPosts,
  sparkPost,
  addComment,
  getPostById
} = require('../controllers/post_controller');

router.post('/', auth, createPost);
router.get('/', auth, getAllPosts);

// to get a post or view it you might not be sign in
router.get('/:id', auth, getPostById);
router.put('/spark/:id', auth, sparkPost);
router.post('/comment/:id', auth, addComment);

module.exports = router;