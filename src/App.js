import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import { Typography, Box, List, ListItem, Drawer,  ListItemIcon, ListItemText} from '@mui/material';
import IndexPage from './components/IndexPage';
import CreatePostPage from './components/CreatePostPage';
import EditPostPage from './components/EditPostPage';
import PostDetailPage from './components/PostDetailPage';
import Chip from '@mui/material/Chip';


// Make toggle Dark/ Light styles
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {createTheme, ThemeProvider} from '@mui/material';
import HomePage from './components/IndexPage';
import { v4 as uuidv4 } from 'uuid';


function BlogApp() {
  const [posts, setPosts] = useState([]);

  // Function to create a new post
  const handleCreatePost = (newPost) => {
    const postId = Date.now();
    const postWithId = { ...newPost, id: postId };
    setPosts([...posts, postWithId]);
  };

  // Function to delete a post
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  // Function to edit a post
  const handleEditPost = (postId, updatedPost) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, ...updatedPost };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  // Function to add a comment to a post
  const handleAddComment = (postId, comment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        const updatedComments = [...post.comments, comment];
        return { ...post, comments: updatedComments };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  const handleHome = () => {
    <Link to="/">Home</Link>
  }

  const handleCreatPost = () => {
    <Link to="/create">Create Post</Link>
  }

  return (
    
    <Router>
      <div>
        <Box>
          <Typography variant='h3' color='black' fontWeight={'bold'} textAlign={'center'}>Nguyen Thanh Sang Blog</Typography>
        </Box>
          

          <Box sx={{ml: 12}}>
            <Box sx={{ mb: 2}}>
              <Chip label="Home" component={Link} to="/" onClick={handleHome} color="primary" variant="outlined" />
            </Box>
            <Box sx={{ mb: 2}}>
              <Chip label="Create Post" component={Link} onClick={handleCreatPost}to="/create" color="success" variant="outlined" />  
            </Box>
          </Box>
        <Routes>
          <Route  path="/" element={<IndexPage posts={posts} onDeletePost={handleDeletePost} />}/>

          <Route path="/create" element={ <CreatePostPage onCreatePost={handleCreatePost} />}/>
          <Route path="/posts/:postId/edit" element={  <EditPostPage posts={posts} onEditPost={handleEditPost} />}/>
          <Route path="/posts/:postId" element={<PostDetailPage posts={posts} onDeletePost={handleDeletePost} onAddComment={handleAddComment} />}/>
        </Routes>
      </div>
    </Router>
  );
}



export default BlogApp;


