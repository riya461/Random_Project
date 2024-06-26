import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NavigationSide from '../components/NavigationSide';
import { CiHeart } from 'react-icons/ci'; // Import icon for reactions
import { FaRegComments } from 'react-icons/fa'; // Import icon for comments
import { IoMdAdd } from 'react-icons/io'; // Import icon for adding comments

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
  liked: boolean;
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

const Profile: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: 'John Doe',
    bio: 'Lorem ipsum dolor sit amet.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverUrl: 'https://imgs.search.brave.com/iEJtWdSmir23egH8nbIxThPSCCPS9bsHhWgzHZfFuCM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kb3Rl/c3BvcnRzLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/NS9CYWxkdXJzLUdh/dGUtMy1maXJzdC1y/b29tLmpwZz93PTEy/MDA',
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
      liked: false,
      commentsVisible: false
    },
    {
      id: 2,
      user: 'John Doe',
      time: '1 day ago',
      content: 'Pellentesque ac arcu ut turpis lacinia fermentum sit amet eu nulla.',
      likes: 15,
      liked: false,
      comments: [
        { user: 'Bob Brown', comment: 'Interesting!' },
      ],
      commentsVisible: false
    },
  ]);
  const [newComment, setNewComment] = useState('');

  const handleLike = (index: number) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];
    post.liked = !post.liked;

    if (post.liked) {
      post.likes += 1;
    } else {
      post.likes -= 1;
    }

    setPosts(updatedPosts);
  };

  const handleCommentVisibility = (index: number) => {
    const updatedPosts = [...posts];
    updatedPosts[index].commentsVisible = !updatedPosts[index].commentsVisible;
    setPosts(updatedPosts);
  };

  const handleAddComment = (postId: number, newComment: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId
        ? {
            ...post,
            comments: [
              ...post.comments,
              { user: user.username, comment: newComment }
            ]
          }
        : post
    );
    setPosts(updatedPosts);
    setNewComment('');
  };

  const toggleFollow = () => {


    const followButton = document.getElementById('follow');
    const isFollowing = followButton?.innerHTML === 'Following';
    if (!isFollowing) {
      fetch(`http://localhost:3000/${userId}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          follower_id: 1,  // Replace with actual follower's user ID
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Followed:', data);
        // Update UI as needed
      })
      .catch(error => console.error('Error following user:', error));
    } else {
      fetch(`http://localhost:3000/${userId}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          follower_id: 1,  // Replace with actual follower's user ID
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Unfollowed:', data);
        // Update UI as needed
      })
      .catch(error => console.error('Error unfollowing user:', error));
    }
    setUser(prevUser => ({
      ...prevUser,
      followers: isFollowing ? (parseInt(prevUser.followers) - 1).toString() : (parseInt(prevUser.followers) + 1).toString()
    }));

    followButton!.innerHTML = isFollowing ? 'Follow' : 'Following';


  };

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
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 mb-6 w-full">
          <img src={user.coverUrl} alt="Cover" className="w-full rounded-lg mb-4" />
          <div className="flex flex-row items-center justify-between mb-4 w-full">
            <div className="flex flex-col w-1/2">
              <div>
                <div className='flex flex-row '>
                  <img src={user.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full mr-4" />
                  <h1 className="text-2xl font-bold dark:text-white mt-5">{user.username}</h1>
                </div>

                <div className="flex mt-5 text-gray-600 dark:text-gray-400">
                  <span className="mr-4">{user.followers} Followers</span>
                  <span>{user.following} Following</span>
                </div>
              </div>
              <button
                id='follow'
                onClick={toggleFollow}
                className='hover:text-white dark:text-white hover:dark:text-black hover:bg-blue-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg dark:bg-gray-700 dark:hover:bg-gray-600'
              >
                Follow
              </button>
            </div>
            <p className='w-1/2 py-3'>{user.bio}</p>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-3xl font-bold dark:text-white mb-4">Posts</h2>
          {posts.map((post, index) => (
            <div key={post.id} className="bg-white my-7 dark:bg-gray-800 p-8 rounded-lg shadow-lg flex w-full">
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <Link to='/profile'>
                      <img src={user.avatarUrl} alt="profile" className="w-10 h-10 rounded-full" />
                    </Link>
                    <div className="ml-3">
                      <h1 className="dark:text-white">{post.user}</h1>
                      <p className="dark:text-white">{post.time}</p>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <p className="dark:text-white">{post.content}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <button
                      className={`flex dark:text-white like mr-3 ${post.liked ? 'text-red-500' : ''}`}
                      onClick={() => handleLike(index)}
                    >
                      {post.likes} &nbsp; <CiHeart />
                    </button>

                    <button
                      className={`dark:text-white ${post.commentsVisible ? 'text-blue-500' : ''}`}
                      onClick={() => handleCommentVisibility(index)}
                    >
                      <FaRegComments />
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
                        onClick={() => handleAddComment(post.id, newComment)}
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

export default Profile;
