
import React from 'react';
import { Link } from 'react-router-dom';
import GitHub from '../assets/github.svg'
import { FaRegNewspaper, FaRegBell, FaSearch } from "react-icons/fa";
const Navigation: React.FC = () => {
    return(
        <div>
        <div className=' bg-white my-7 dark:bg-gray-800 rounded-lg shadow-lg py-3  '>
        <div className='flex justify-between m-3 items-center '>
          <Link
            to='/'
            className='text-lg font-medium text-gray-900 dark:text-gray-100 px-16  '
          >
            <FaRegNewspaper/>
          </Link>
          <Link
            to='/notifications'
            className='text-lg font-medium text-gray-900 dark:text-gray-100 px-16 '
          >
            <FaRegBell />
          </Link>
          <Link
            to='/search'
            className='text-lg font-medium text-gray-900 dark:text-gray-100 px-16  '
          >
            <FaSearch />
          </Link>
        </div>
        
        </div>
        <div className='absolute top-7 right-10'>
            <div className="profile">
                <Link to='/settings'>
                <img src={GitHub} alt="" className='w-12'/>
                </Link>
            </div>

        </div>
        </div>
    );
    }
    export default Navigation;