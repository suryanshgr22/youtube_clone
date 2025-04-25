import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  Share,
  MoreHoriz,
  Send,
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const VideoDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching video:', error);
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}/like`);
      setVideo((prev) => ({
        ...prev,
        likes: prev.likes + 1,
      }));
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/videos/${id}/dislike`);
      setVideo((prev) => ({
        ...prev,
        dislikes: prev.dislikes + 1,
      }));
    } catch (error) {
      console.error('Error disliking video:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/videos/${id}/comments`,
        { text: comment }
      );
      setVideo((prev) => ({
        ...prev,
        comments: [response.data, ...prev.comments],
      }));
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!video) {
    return <Typography>Video not found</Typography>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <video
          width="100%"
          controls
          src={video.videoUrl}
          style={{ maxHeight: '70vh' }}
        />
      </Box>

      <Typography variant="h5" gutterBottom>
        {video.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{video.views} views</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<ThumbUp />}
            onClick={handleLike}
          >
            {video.likes}
          </Button>
          <Button
            startIcon={<ThumbDown />}
            onClick={handleDislike}
          >
            {video.dislikes}
          </Button>
          <Button startIcon={<Share />}>Share</Button>
          <Button startIcon={<MoreHoriz />}>More</Button>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={video.channel?.avatar}
          sx={{ width: 48, height: 48, mr: 2 }}
        />
        <Box>
          <Typography variant="subtitle1">
            {video.channel?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.channel?.subscribers} subscribers
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {video.description}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Comments ({video.comments?.length || 0})
      </Typography>

      {user && (
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={user.avatar} />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    type="submit"
                    disabled={!comment.trim()}
                    color="primary"
                  >
                    <Send />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      )}

      {video.comments?.map((comment) => (
        <Box key={comment._id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar src={comment.user?.avatar} />
            <Box>
              <Typography variant="subtitle2">
                {comment.user?.username}
              </Typography>
              <Typography variant="body2">{comment.text}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Button size="small" startIcon={<ThumbUp />}>
                  {comment.likes}
                </Button>
                <Button size="small">Reply</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default VideoDetail; 