import React, {useState, useEffect} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { Grid, Card, CardContent, Typography, Box, CardActions, CardMedia, Button, Stack, TextField} from '@mui/material';



function EditPostPage({ posts, onEditPost }) {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((post) => post.id === Number(postId));
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [postId, posts]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
setContent(event.target.value);
  };

  const handleEditPost = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter a title and content for the post.');
      return;
    }

    const updatedPost = {
      title,
      content,
    };

    onEditPost(Number(postId), updatedPost);

    navigate('/');
  };

  return (
    <div>

      <Box>
        <Typography varient='h4' fontWeight={'bold'} fontSize={32} color='goldenrod' textAlign={'center'}>Edit Post</Typography>

        <Box sx={{ml: 12, mr: 12}}>
          <Stack sx={{ mb: 4 }}   spacing={2}>
            <Typography color='goldenrod' variant='h5' >Title</Typography>
            <TextField id="outlined-basic" sx={{ml: 3}} label="Title" variant="outlined" value={title} onChange={handleTitleChange} />
          </Stack>

          <Stack   spacing={2}>
            <Typography color='goldenrod' variant='h5' >Content</Typography>
            <TextField
              sx={{ml: 3}} label="Content" variant="outlined" value={content} onChange={handleContentChange}
              id="outlined-multiline-static"
              multiline
              rows={4}
            />
          </Stack>

          <Button variant="contained" sx={{mt: 4}} onClick={handleEditPost} >Save Changes</Button>
          <Button variant="contained" sx={{mt: 4, ml: 4}} onClick={() => {navigate('/')}}>Cancel</Button>

        </Box>
        
      </Box>
    </div>
  );
}


export default EditPostPage;