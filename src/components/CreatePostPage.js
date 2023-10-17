import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Typography, Stack, TextField, Button} from '@mui/material'

function CreatePostPage({ onCreatePost }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
  
    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleContentChange = (event) => {
      setContent(event.target.value);
    };
  
    const handleCreatePost = () => {
      if (title.trim() === '' || content.trim() === '') {
        alert('Please enter a title and content for the post.');
        return;
      }
  
      const newPost = {
        title,
        content,
        comments: [],
      };
  
      onCreatePost(newPost);
  
      setTitle('');
      setContent('');
      
      // return to the home page
      navigate('/');
    };
  
    return (
      <Box>
        <Typography varient='h4' fontWeight={'bold'} fontSize={32} color='green' textAlign={'center'}>Create New Post</Typography>

        <Box sx={{ml: 12, mr: 12}}>
          <Stack sx={{ mb: 4 }}   spacing={2}>
            <Typography color='darkgreen' variant='h5' >Title</Typography>
            <TextField id="outlined-basic" sx={{ml: 3}} label="Title" variant="outlined" onChange={handleTitleChange} />
          </Stack>

          <Stack   spacing={2}>
            <Typography color='darkgreen' variant='h5' >Content</Typography>
            <TextField
              sx={{ml: 3}} label="Content" variant="outlined" onChange={handleContentChange}
              id="outlined-multiline-static"
              multiline
              rows={4}
            />
          </Stack>

          <Button variant="contained" sx={{mt: 4}}onClick={ handleCreatePost}>Create Post</Button>
          <Button variant="contained" sx={{mt: 4, ml: 4}} onClick={() => {navigate('/')}}>Home</Button>

        </Box>
        
      </Box>
    );
  }

  export default CreatePostPage;

