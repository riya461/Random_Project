import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import NavigationSide from '../components/NavigationSide';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { CiHeart } from 'react-icons/ci';
import { FaRegComments } from 'react-icons/fa';
import {  FaSignOutAlt } from 'react-icons/fa';


interface Comment {
  user: string;
  comment: string;
}

interface Post {
  id: number;
  user: string;
  time: string;
  content: string;
  likes: number;
commentsVisible: boolean;
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

const Settings: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverUrl: 'https://via.placeholder.com/150',
    followers: '100',
    following: '50',
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'John Doe',
      time: '2 hours ago',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 10,
      comments: [
        { user: 'Jane Doe', comment: 'Nice post!' },
        { user: 'Alice Smith', comment: 'Great thoughts!' },
      ],
      commentsVisible: false
    },
    {
      id: 2,
      user: 'John Doe',
      time: '1 day ago',
      content: 'Pellentesque ac arcu ut turpis lacinia fermentum sit amet eu nulla.',
      likes: 15,
      comments: [
        { user: 'Bob Brown', comment: 'Interesting!' },
      ],
      commentsVisible: false
    },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out...");
  };

  
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, username: event.target.value });
  };

  const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser({ ...user, bio: event.target.value });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setUser({ ...user, avatarUrl: URL.createObjectURL(file) });
    }
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setUser({ ...user, coverUrl: URL.createObjectURL(file) });
    }
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting changes:', user);

    // Reset file states after submission
    setAvatarFile(null);
    setCoverFile(null);

    // Exit edit mode after submission
    setEditMode(false);
  };

  const toggleComments = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId ? { ...post, commentsVisible: !post.commentsVisible } : post
      )
    );
  };
  const handleAddComment = (postId: number, newComment: string) => {
    
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { user: user.username, comment: newComment } // Replace 'Current User' with actual user data
            ]
          }
        : post
    );
    setPosts(updatedPosts);
    console.log('Adding comment to post with id:', postId, 'Comment:', newComment);
  };
  
  const handleEditPost = (postId: number) => {
    // Implement your edit logic here, such as opening a modal or setting a form for editing
    console.log('Editing post with id:', postId);
  };
  const handleDeletePost = (postId: number) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    console.log('Deleting post with id:', postId);
  };
  const [newComment, setNewComment] = useState('');

  

  return (
    <div className="flex flex-col items-center justify-center mx-5">
      <div className="hidden sm:block">
        <Navigation />
      </div>
      <div className="block sm:hidden">
        <NavigationSide />
        <br />
        <br />
        <br />
      </div>

      <div className="flex w-full bg-cover bg-center mb-6" style={{ backgroundImage: `url(${user.coverUrl})`, height: '200px' }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
          {/* Content for the cover photo */}
          <p className='bg-white p-3 border-10 '>{user.bio}</p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <div className="flex flex-col md:w-1/4 mr-10">
          
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mb-6 w-full">
          <div className="flex items-center justify-between mb-4">
            
            <div className="flex flex-col items-center ">
              <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h1 className="text-2xl font-bold dark:text-white mt-3 ">{user.username}</h1>
                <div className="flex text-gray-600 dark:text-gray-400">
                  <span className="mr-4">{user.followers} Followers</span>
                  <span>{user.following} Following</span>
                </div>
              </div>
              
            </div>
            
          </div>
          
          
        </div>
          {!editMode && (
            <button
              className="bg-blue-500 flex  hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600"
              onClick={handleEditModeToggle}
            >
              <CiEdit /> &nbsp; Profile
            </button>
            
          )}
          
          {editMode && (
            <form className="max-w-lg" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="block text-lg font-medium dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input mt-1 block w-full p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
                  value={user.username}
                  onChange={handleUsernameChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="bio" className="block text-lg font-medium dark:text-white">
                  Bio
                </label>
                <textarea
                  id="bio"
                  className="form-textarea mt-1 block w-full p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
                  value={user.bio}
                  onChange={handleBioChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="avatar" className="block text-lg font-medium dark:text-white">
                  Upload Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  className="form-input mt-1 block w-full p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="cover" className="block text-lg font-medium dark:text-white">
                  Upload Cover
                </label>
                <input
                  type="file"
                  id="cover"
                  className="form-input mt-1 block w-full p-3 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white"
                  onChange={handleCoverChange}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Save 
              </button>

              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg ml-4 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={handleEditModeToggle}
              >
                Cancel
              </button>
            </form>
          )}
          <br />
          <button className=" dark:text-gray-400 hover:text-black dark:hover:text-white bg-gray-500 flex  hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600" onClick={handleLogout}>
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
        </div>

        <div className="w-3/4">
          <h2 className="text-3xl mb-4 dark:text-white">My Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{post.user}</h3>
                  <p className="text-gray-500 dark:text-gray-300">{post.time}</p>
                </div>
                <div className="flex items-center">
                <button
                    className="text-blue-500 mr-4"
                    onClick={() => handleEditPost(post.id)}
                    >
                    <CiEdit />
                    </button>

                    <button
                    className="text-red-500"
                    onClick={() => handleDeletePost(post.id)}
                    >
                    <MdDelete />
                    </button>

                </div>
              </div>
              <p className="text-lg dark:text-white">{post.content}</p>
              <div className="flex flex-col  mt-4">
                <div className='flex'>
                <button className="flex items-center text-red-500 mr-4">
                   {post.likes} &nbsp; <CiHeart />
                </button>
                <button onClick={() =>{
                    console.log('View comments')
                    toggleComments(post.id)

                }} className="flex  items-center text-blue-500 mr-4">
                   {post.comments.length} &nbsp; <FaRegComments />

                </button>
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
                        onClick={() => {handleAddComment(post.id, newComment);
                        setNewComment('');
                        }
                        }
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
    </div>
  );
};

export default Settings;
