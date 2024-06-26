import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Navigation from '../components/Navigation';
import NavigationSide from '../components/NavigationSide';
import { CiHeart } from "react-icons/ci";
import { FaRegComments } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { IoMdCopy } from 'react-icons/io';

interface Comment {
  user: string;
  comment: string;
}

interface Post {
  user: string;
  profilePhoto: string; // New field for profile photo URL
  time: string;
  post: string;
  likes: number;
  liked: boolean;
  commentsVisible: boolean;
  shared: boolean;
  comments: Comment[];
}

interface User {
    username: string;
    bio: string;
    avatarUrl: string;
    coverUrl: string;
    followers: string;
    following: string;
  }
  

const Home: React.FC = () => {

    const username = 'John Doe'; 

    const [user, setUser] = useState<User>({
        username: 'John Doe',
        bio: 'Lorem ipsum dolor sit amet.',
        avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
        coverUrl: 'https://via.placeholder.com/150',
        followers: '100',
        following: '50',
      });
const [newComment, setNewComment] = useState<string>('');
    
  const [following, setFollowing] = useState<Post[]>([
    {
      user: 'John Doe',
      profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
      time: '2 hours ago',
      post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae?',
      likes: 10,
      liked: false,
      commentsVisible: false,
      shared: false,
      comments: [
        {
          user: 'Jane Doe',
          comment: 'Nice post',
        },
        {
          user: 'Janve Doe',
          comment: 'Nice post',
        },
      ],
    },
  ]);

  const [global, setGlobal] = useState<Post[]>([
    {
      user: 'Jane Doe',
      profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
      time: '2 hours ago',
      post: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae?',
      likes: 10,
      liked: false,
      commentsVisible: false,
      shared: false,
      comments: [
        {
          user: 'Jane Doe',
          comment: 'Nice post',
        },
        {
          user: 'Janye Doe',
          comment: 'Nice post',
        },
      ],
    },
    {
      user: 'Alice Smith',
      profilePhoto: 'https://randomuser.me/api/portraits/women/3.jpg',
      time: '3 hours ago',
      post: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      likes: 5,
      liked: false,
      commentsVisible: false,
      shared: false,
      comments: [
        {
          user: 'Bob Brown',
          comment: 'Interesting!',
        },
      ],
    },
    {
      user: 'Charlie Johnson',
      profilePhoto: 'https://randomuser.me/api/portraits/men/4.jpg',
      time: '4 hours ago',
      post: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      likes: 15,
      liked: false,
      commentsVisible: false,
      shared: false,
      comments: [
        {
          user: 'Dave Lee',
          comment: 'Great post!',
        },
      ],
    },
  ]);



  const [isFollowing, setIsFollowing] = useState(true);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleLike = (index: number) => {
    const updatedPosts = isFollowing ? [...following] : [...global];
    const post = updatedPosts[index];

    if (post.liked) {
      post.likes -= 1;
    } else {
      post.likes += 1;
    }
    post.liked = !post.liked;

    if (isFollowing) {
      setFollowing(updatedPosts);
    } else {
      setGlobal(updatedPosts);
    }

    fetch(`http://localhost:3000/${post.id}/like`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
      updatedPosts[index] = data;
      setFollowing(updatedPosts);
    })
    .catch(error => console.error('Error updating like:', error));
  };

  const handleCommentVisibility = (index: number) => {
    const updatedPosts = isFollowing ? [...following] : [...global];
    updatedPosts[index].commentsVisible = !updatedPosts[index].commentsVisible;

    if (isFollowing) {
      setFollowing(updatedPosts);
    } else {
      setGlobal(updatedPosts);
    }
  };
  const handleAddComment = (index: number, newComment: string) => {
    const updatedPosts = isFollowing ? [...following] : [...global];
    
    updatedPosts[index] = {
      ...updatedPosts[index],
      comments: [
        ...updatedPosts[index].comments,
        { user: username, comment: newComment } // Replace 'Current User' with actual user data
      ]
    };
  
    if (isFollowing) {
      setFollowing(updatedPosts);
    } else {
      setGlobal(updatedPosts);
    }
  
    setNewComment(''); // Clear input field after adding comment
    fetch(`http://localhost:3000/posts/${post.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,  // Replace with actual user ID
        content: newComment,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Comment added:', data);
    })
    .catch(error => console.error('Error adding comment:', error));
  
  };
  

  const handleShare = (index: number) => {
    const updatedPosts = isFollowing ? [...following] : [...global];
    updatedPosts[index].shared = !updatedPosts[index].shared;

    if (isFollowing) {
      setFollowing(updatedPosts);
    } else {
      setGlobal(updatedPosts);
    }

    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
      // Reset the shared state after the notification disappears
      updatedPosts[index].shared = false;
      if (isFollowing) {
        setFollowing([...updatedPosts]);
      } else {
        setGlobal([...updatedPosts]);
      }
    }, 2000);
  };

  const posts = isFollowing ? following : global;
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    const date = new Date();
    const current = date.toISOString();
    const newPost = {
      user: user.username,
      profilePhoto: user.avatarUrl,
      time: current,
      post: inputValue,
      likes: 0,
      liked: false,
      commentsVisible: false,
      shared: false,
      comments: [],
    };
  
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 1,  // Replace with actual user ID
        content: inputValue,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setFollowing([data, ...following]);  // Update following posts
      setGlobal([data, ...global]);        // Update global posts
      setInputValue('');  // Clear input field
    })
    .catch(error => console.error('Error adding post:', error));
  
  
    setFollowing([newPost, ...following]);
    setGlobal([newPost, ...global]);
    

  // Optionally, clear the input field after submission
  setInputValue('');
};
useEffect(() => {
  fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => {
      setFollowing(data);  // Assuming data contains following posts
      setGlobal(data);     // Assuming data contains global posts
    })
    .catch(error => console.error('Error fetching posts:', error));
}, []);




  return (
    <div className="flex flex-col items-center justify-center">
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="block sm:hidden">
        <NavigationSide />
        <br />
        <br />
        <br />
      </div>
      <div className="flex flex-col w-3/4">
        <h1 className="relative my-5 text-5xl dark:text-white">Posts</h1>

        
  <input
    type='text'
    className="relative top-0 rounded-lg shadow-lg w-full px-5 py-3 dark:bg-slate-800 hover:border-none text-black dark:text-white h-12 dark:placeholder-gray-500 dark:focus:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500 dark:focus"
    placeholder="Write something..."
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
  />
  <br />
  <button onClick={() =>{
    handleSubmit();
  }} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  dark:bg-gray-700 relative right-0 w-1/4 ">
    Post
  </button>
  <br />
<hr />

        <div>
          <div className="flex my-5">
            <div
            id='follow'
              className={` flex flex-col bg-white p-3 rounded-lg shadow-lg dark:bg-slate-800 dark:text-white mr-5 border ${isFollowing ? 'hidden' : 'block'}`}
            >
              <button className="uppercase" onClick={() => {
                
                setIsFollowing(true);



                }}>
                Following
              </button>
            </div>

            <div
              className={`flex flex-col bg-white p-3 rounded-lg shadow-lg dark:bg-slate-800 dark:text-white mr-5 ${isFollowing ? 'block' : 'hidden'}`}
              
            >
              <button className="uppercase" onClick={() => {
                
                setIsFollowing(false);

                
                }}>
                Global
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
        {posts.map((post, index) => (
  <div key={index} className="bg-white my-7 dark:bg-gray-800 p-8 rounded-lg shadow-lg flex w-full">
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={post.profilePhoto} alt="profile" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <h1 className="dark:text-white">{post.user}</h1>
            <p className="dark:text-white">{post.time}</p>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="dark:text-white">{post.post}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <button
            className={`dark:text-white like mr-3 ${post.liked ? 'text-red-500 dark:text-red-500' : ''}`}
            onClick={() => handleLike(index)}
          >
            <p className='flex'>{post.likes} &nbsp; <CiHeart /></p>
          </button>
          <button
            className={`flex dark:text-white ${post.commentsVisible ? 'text-blue-500 dark:text-blue-500' : ''}`}
            onClick={() => handleCommentVisibility(index)}
          >
            {post.comments.length}&nbsp;<FaRegComments />
          </button>
        </div>
        <div>
          <button
            className={`share dark:text-white ${post.shared ? 'text-green-500' : ''}`}
            onClick={() => handleShare(index)}
          >
            {post.shared ? <FaRegShareSquare /> : <IoMdCopy />}
          </button>
        </div>
      </div>
      {post.commentsVisible && (
        <div className="mt-5">
          {post.comments.map((comment, commentIndex) => (
            <div key={commentIndex} className="border-t border-gray-300 pt-2 mt-2">
              <p className="dark:text-white">
                <strong>{comment.user}:</strong> {comment.comment}
              </p>
            </div>
          ))}
          <div className='flex align-items items-center'>
            <input
              id='addcomment'
              type="text"
              placeholder="Add a comment"
              className="form-input mt-1 block w-3/4 p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={() => handleAddComment(index, newComment)}
              className='border dark:border-none dark:text-white mx-5'
            >
              <IoMdAdd />
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
))}

        </div>
      </div>
      {notificationVisible && (
        <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          Link copied!
        </div>
      )}
    </div>
  );
};

export default Home;
