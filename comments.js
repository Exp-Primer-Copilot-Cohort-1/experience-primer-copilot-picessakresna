// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Article = require('../models/article');

router.get('/comments', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({ comments: comments });
  });
});

router.post('/comments', function(req, res) {
  var comment = req.body;
  Comment.create(comment, function(err, comment) {
    if (err) {
      return res.status(500).json({
        err: err.message
      });
    }
    res.json({ 'comment': comment, message: 'Comment Created' });
  });
});

router.get('/comments/:id', function(req, res) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({ 'comment': comment });
  });
});

router.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  var comment = req.body;
  if (comment && comment._id !== id) {
    return res.status(500).json({
      err: "Ids don't match!"
    });
  }
  Comment.findByIdAndUpdate(id, comment, {new: true}, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({ 'comment': comment, message: 'Comment Updated' });
  });
});

router.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function(err, comment) {
    if (err) {
      return res.status(500).json({
        message: err.message
      });
    }
    res.json({ 'comment': comment, message: 'Comment Deleted' });
  });
});

module.exports = router;