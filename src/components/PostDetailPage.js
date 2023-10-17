import { useNavigate, Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Button, Typography, TextField, Box, Avatar} from "@mui/material";
function PostDetailPage({ posts, onDeletePost, onAddComment }) {
    const { postId } = useParams();
    const post = posts.find((post) => post.id === Number(postId));
    const [comment, setComment] = useState('');
    const history = useNavigate();
    const handleDeletePost = () => {
      onDeletePost(post.id);
      history('/');
    };
  
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
  
    const handleAddComment = () => {
      if (comment.trim() === '') {
        alert('Please enter a comment.');
        return;
      }
      const newComment = {
        content: comment,
      }

      onAddComment(post.id, newComment);
      setComment(" ");
    };
  
    if (!post) {
      return <p>Post not found.</p>;
    }
  
    return (
      <Box sx={{ml: 12, mt: 5}}>
        <Typography variant='h3' >Title: {post.title}</Typography>
        <Typography variant='h6' >Content: {post.content}</Typography>
        <h3>Comments</h3>
        {post.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <Box>
            {post.comments.map((comment, index) => (
              // <li key={index}>Guest:{comment}</li>
              <Typography variant = 'p' key={index} sx={{ display: "flex", alignItems: "center", mb: 2}}>
                <Avatar 
                  src= 'https://i.pinimg.com/564x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg'
                  sx={{ width: 65, height: 65, mr: 2 }}  
                  
                /> 
                   Guest:  {comment.content}
              </Typography>
            ))}
          </Box>
        )}
        <div>
          <TextField id="outlined-basic" sx={{ml: 5, mt: 2}} label="Comment" variant="outlined" onChange={handleCommentChange} />
          <Button variant="contained" sx={{ml: 5, mt: 3}} onClick={handleAddComment} >Add Comment</Button>
        </div>
        <Button variant="contained" sx={{ml: 5, mt: 5, backgroundColor: 'red', color: 'black'}} onClick={handleDeletePost}>Delete Post</Button>
        <Button variant="contained" sx={{ml: 5, mt: 5, backgroundColor: 'green', color: 'black'}} onClick={() => history('/')} >Back to Home</Button>
      </Box>
    );
  }

  export default PostDetailPage;