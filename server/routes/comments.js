const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');


router.get('/video/:videoId', async (req, res) => {
    try {
        const comments = await Comment.find({ video: req.params.videoId })
            .populate('user', 'username avatar')
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        comment.text = req.body.text;
        await comment.save();

        const updatedComment = await Comment.findById(comment._id)
            .populate('user', 'username avatar');

        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.put('/:id/like', auth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.likes += 1;
        await comment.save();

        const updatedComment = await Comment.findById(comment._id)
            .populate('user', 'username avatar');

        res.json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 