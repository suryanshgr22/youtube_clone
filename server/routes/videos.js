const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Video = require('../models/Video');
const Comment = require('../models/Comment');

// Get all videos with optional search and filter
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};

        if (search) {
            query.$text = { $search: search };
        }

        if (category) {
            query.category = category;
        }

        const videos = await Video.find(query)
            .populate('channel', 'name avatar')
            .populate('uploader', 'username')
            .sort({ createdAt: -1 });

        res.json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single video
router.get('/:id', async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .populate('channel', 'name avatar subscribers')
            .populate('uploader', 'username')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'username avatar'
                }
            });

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Increment views
        video.views += 1;
        await video.save();

        res.json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new video (protected route)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, thumbnailUrl, videoUrl, category, channelId } = req.body;

        const video = new Video({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            category,
            channel: channelId,
            uploader: req.user._id
        });

        await video.save();

        // Add video to channel's videos array
        const channel = await Channel.findById(channelId);
        if (channel) {
            channel.videos.push(video._id);
            await channel.save();
        }

        res.status(201).json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Like a video
router.put('/:id/like', auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.likes += 1;
        await video.save();

        res.json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Dislike a video
router.put('/:id/dislike', auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        video.dislikes += 1;
        await video.save();

        res.json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add a comment to a video
router.post('/:id/comments', auth, async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const comment = new Comment({
            text: req.body.text,
            user: req.user._id,
            video: video._id
        });

        await comment.save();

        video.comments.push(comment._id);
        await video.save();

        const populatedComment = await Comment.findById(comment._id)
            .populate('user', 'username avatar');

        res.status(201).json(populatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 