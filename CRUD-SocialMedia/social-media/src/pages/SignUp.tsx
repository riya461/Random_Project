
// logo for github and google
import GitHubLogo from '../assets/github.svg';
import GoogleLogo from '../assets/google.svg';

import {Link} from 'react-router-dom';

const SignUp: React.FC = () => {
  
  return (
    <div  className='flex  flex-col lg:flex-row   items-center justify-center '>
      
      <div>
        <div className="content items-center lg:mx-10 p-8 bg-[url('https://source.unsplash.com/1600x900/?nature')] from-blue-500 to-indigo-500 dark:from-gray-700 dark:to-gray-900 text-center rounded-lg shadow-lg">
        <div className="bg-opacity-75 p-8 rounded-md bg-white dark:bg-gray-800">
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4'>Share, Collaborate and Change</h1>
          <p className='text-2xl text-gray-900 dark:text-gray-100 mb-6'>Join the community of developers</p>
          <button className='bg-black dark:bg-gray-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 dark:hover:bg-gray-600 transition duration-300'>
            <Link to='/signin'>Log In</Link>

            
          </button>
        </div>
      </div>
      </div>
      <div className="bg-white my-7 dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm ">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-black dark:focus:ring-gray-500 focus:border-black dark:focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-black dark:focus:ring-gray-500 focus:border-black dark:focus:border-gray-500 sm:text-sm"
            />
            
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Re-enter Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-black dark:focus:ring-gray-500 focus:border-black dark:focus:border-gray-500 sm:text-sm"
            />
            
          </div>
          <div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-500"
            >
              
            <Link to='/'>Sign Up</Link>
            </button>
          </div>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <div className="w-1/3 border-b border-gray-300 dark:border-gray-600"></div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Or authenticate </div>
          <div className="w-1/3 border-b border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="w-1/2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-500"
          >
            <img src={GitHubLogo} alt="GitHub Logo" className="w-4 h-4 mr-2" />
            GitHub
          </button>
          <button
            className="w-1/2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-gray-500"
          >
            <img src={GoogleLogo} alt="Google Logo" className="w-4 h-4 mr-2" />
            Google
          </button>
        </div>
        <p className='mt-10 text-sm text-gray-500 hover:underline hover:cursor-pointer'><Link to='/signin'>Already have an account?</Link></p>
      </div>

      
    </div>
  );
};

export default SignUp;
