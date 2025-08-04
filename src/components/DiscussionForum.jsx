import React, { useState } from 'react';
import './DiscussionForum.css';

const DiscussionForum = ({ studentName, profilePicUrl }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Priya Sharma",
      authorImage: "/images/users/ananya.jpg",
      title: "Tips for Data Structures exam?",
      content: "I'm struggling with tree traversal algorithms. Can anyone recommend good resources or practice problems?",
      date: "2 days ago",
      likes: 12,
      comments: [
        {
          id: 101,
          author: "Rahul Verma",
          authorImage: "/images/users/ananya.jpg",
          content: "Check out the GeeksForGeeks practice section. They have great visualization tools for tree traversals.",
          date: "1 day ago",
          likes: 5
        },
        {
          id: 102,
          author: "Ananya Patel",
          authorImage: "/images/users/ananya.jpg",
          content: "I found this YouTube playlist really helpful: [link]. It covers all the important topics with examples.",
          date: "1 day ago",
          likes: 3
        }
      ]
    },
    {
      id: 2,
      author: "Arjun Mehta",
      authorImage: "/images/users/ananya.jpg",
      title: "Machine Learning project collaboration",
      content: "I'm working on a sentiment analysis project and looking for teammates. Anyone interested in collaborating?",
      date: "3 days ago",
      likes: 8,
      comments: [
        {
          id: 201,
          author: "Shreya Gupta",
          authorImage: "/images/users/ananya.jpg",
          content: "I'd be interested! I've worked on NLP projects before. Let's connect.",
          date: "2 days ago",
          likes: 2
        }
      ]
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    content: ""
  });

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  // Categories for filtering forum posts
  const categories = [
    { value: "all", label: "All Posts" },
    { value: "academic", label: "Academic" },
    { value: "projects", label: "Projects" },
    { value: "exams", label: "Exams" },
    { value: "general", label: "General" }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    const post = {
      id: posts.length + 1,
      author: studentName || "You",
      authorImage: profilePicUrl || "/images/users/default-user.jpg",
      title: newPost.title,
      content: newPost.content,
      date: "Just now",
      likes: 0,
      comments: []
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  const handleReplySubmit = (postId) => {
    if (!replyContent.trim()) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          author: studentName || "You",
          authorImage: profilePicUrl || "/images/users/default-user.jpg",
          content: replyContent,
          date: "Just now",
          likes: 0
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  const handleCommentLike = (postId, commentId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.likes + 1
            };
          }
          return comment;
        });
        
        return {
          ...post,
          comments: updatedComments
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
  };

  return (
    <div className="discussion-forum-container">
      <div className="forum-header">
        <h2>Discussion Forum</h2>
        <p>Connect with peers, share knowledge, and solve problems together.</p>
      </div>

      <div className="category-selector">
        <label htmlFor="category-select">Filter by:</label>
        <select 
          id="category-select" 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="new-post-form">
        <h3>Create a New Post</h3>
        <form onSubmit={handlePostSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={newPost.title}
              onChange={(e) => setNewPost({...newPost, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <textarea 
              placeholder="Share your thoughts or questions..." 
              value={newPost.content}
              onChange={(e) => setNewPost({...newPost, content: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit" className="post-button">Post</button>
        </form>
      </div>
      
      <div className="forum-posts">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="user-info">
                <div className="user-avatar">
                  <img src={post.authorImage} alt={post.author} />
                </div>
                <div>
                  <span className="username">{post.author}</span>
                  <span className="post-date">{post.date}</span>
                </div>
              </div>
            </div>
            
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
            
            <div className="post-actions">
              <button className="action-button like-button" onClick={() => handleLike(post.id)}>
                <span className="like-icon">♥</span> {post.likes}
              </button>
              <button className="action-button reply-button" onClick={() => setReplyingTo(post.id)}>
                Reply
              </button>
            </div>
            
            {replyingTo === post.id && (
              <div className="reply-form">
                <textarea 
                  placeholder="Write your reply..." 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                ></textarea>
                <div className="reply-buttons">
                  <button className="cancel-button" onClick={() => setReplyingTo(null)}>Cancel</button>
                  <button className="submit-button" onClick={() => handleReplySubmit(post.id)}>Submit</button>
                </div>
              </div>
            )}
            
            {post.comments.length > 0 && (
              <div className="comments-section">
                {post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-header">
                      <div className="user-info">
                        <div className="user-avatar small">
                          <img src={comment.authorImage} alt={comment.author} />
                        </div>
                        <div>
                          <span className="username">{comment.author}</span>
                          <span className="post-date">{comment.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>
                    
                    <div className="comment-actions">
                      <button className="action-button like-button small" onClick={() => handleCommentLike(post.id, comment.id)}>
                        <span className="like-icon">♥</span> {comment.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionForum;