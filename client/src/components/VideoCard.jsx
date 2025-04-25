import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const handleClick = () => {
    navigate(`/video/${video._id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease-in-out',
        },
      }}
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        height="140"
        image={video.thumbnailUrl}
        alt={video.title}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {video.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {video.channel?.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {formatViews(video.views)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            • {new Date(video.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard; 